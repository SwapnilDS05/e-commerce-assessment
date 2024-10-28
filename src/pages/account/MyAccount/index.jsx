/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import DefaultLayout from "../../../components/Layout/default";
import TopMenu from "../../../components/elements/TopMenu";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormHelperText,
  Input,
} from "../../../components/formElements/FormStyledComponents";
import { useAuth } from "../../../hooks/AuthProvider";
import { getRequest, putRequest } from "../../../services/api";
import { ENDPOINTS } from "../../../services/endpoints";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is a required field")
    .email("Email is invalid"),
  password: yup
    .string()
    .required("Password is a required field")
    .min(5, "Password must be at least 5 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm password is a required field.")
    .oneOf([yup.ref("password")], "Your passwords do not match."),
});

const defaultValues = {
  password: "",
  email: "",
  confirmPassword: "",
};

const MyAccount = ({ onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useAuth();
  let abortController = useRef(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const controller = new AbortController();

    const getUser = async () => {
      try {
        setIsLoading(true);
        const response = await getRequest(ENDPOINTS.MY_ACCOUNT);
        if (response.status === "Success") {
          setUser(response.data);
          setValue("email", response.data?.email || "");
          setIsLoading(false);
        } else {
          toast.error(`${response.message}`);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    getUser();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    abortController.current = new AbortController();

    return () => {
      abortController.current?.abort();
    };
  }, []);

  const handleFormSubmit = async (data) => {
    if (onSubmit) {
      onSubmit(data);
    } else {
      if (isValid) {
        try {
          setIsLoading(true);
          const response = await putRequest(
            ENDPOINTS.UPDATE_ACCOUNT,
            data,
            abortController.current.signal
          );
          if (response.status === "Success") {
            toast.success("Profile updated successfully!");
            setUser(response?.data);
            setIsLoading(false);
          } else {
            toast.error(`${response.message}`);
            setIsLoading(false);
          }
        } catch (error) {
          setIsLoading(false);
          toast.error(
            error.message ? `${error.message}` : "Something went wrong..."
          );
        }
      }
    }
  };

  return (
    <DefaultLayout>
      <TopMenu />
      <Container>
        <h2>My Account</h2>
        <h4>Welcome, {user?.email}</h4>
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <FormControl>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input type="text" placeholder="Email" {...field} />
              )}
            />
            {errors.email && (
              <FormHelperText data-testid="email-error">{errors.email.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input type="password" placeholder="Password" {...field} />
              )}
            />
            {errors.password && (
              <FormHelperText data-testid="password-error">{errors.password.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...field}
                />
              )}
            />
            {errors.confirmPassword && (
              <FormHelperText data-testid="confirm-password-error">
                {errors.confirmPassword.message}
              </FormHelperText>
            )}
          </FormControl>

          <Button type="submit" data-testid="my-account-submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </Form>
      </Container>
    </DefaultLayout>
  );
};

export default MyAccount;
