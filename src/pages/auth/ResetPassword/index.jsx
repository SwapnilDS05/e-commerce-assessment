import { yupResolver } from "@hookform/resolvers/yup";
import _ from 'lodash';
import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
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
import { postRequest } from "../../../services/api";
import { ENDPOINTS } from "../../../services/endpoints";

const schema = yup.object().shape({
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
  confirmPassword: "",
};

const ResetPassword = ({ onSubmit }) => {
  const { isLoading, setIsLoading } = useAuth();
  let abortController = useRef(null);
  let searchParams = useLocation();
  const urlParams = new URLSearchParams(searchParams.search);
  const resetToken = urlParams.get('resetToken');

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    abortController.current = new AbortController();

    return () => {
      abortController.current?.abort()
    }
  }, []);

  const handleFormSubmit = async (data) => {
    if (onSubmit) {
      onSubmit(data);
    } else {
      if (_.isEmpty(resetToken)) {
        toast.error('Invalid request.')
        return false;
      }
      if (isValid) {
        try {
          setIsLoading(true);
          const forgetEmail = window.localStorage.getItem('forgotEmail')
          const formData = {
            email: forgetEmail,
            password: data?.password,
            token: resetToken
          }
          const response = await postRequest(ENDPOINTS.RESET_PASSWORD, formData, abortController.current.signal);
          if (response.status === 'Success') {
            toast.success(`${response.message}`);
            setTimeout(() => {              
              window.localStorage.removeItem('forgotEmail')
              window.location.href = '/';
            }, 1000);
            setIsLoading(false);
          } else {
            toast.error(`${response.message}`);
            setIsLoading(false);
          }
        } catch (error) {
          setIsLoading(false);
          toast.error(error.message ? `${error.message}` : 'Something went wrong...');
        }
      }
    }
  };

  return (
    <DefaultLayout>
      <TopMenu />
      <Container>
        <h2>Reset Password</h2>
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <FormControl>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input type="password" placeholder="Password" {...field} />
              )}
            />
            {errors.password && (
              <FormHelperText id="">{errors.password.message}</FormHelperText>
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
              <FormHelperText id="">
                {errors.confirmPassword.message}
              </FormHelperText>
            )}
          </FormControl>

          <Button type="submit" disabled={isLoading}>{isLoading ? 'Submitting...' : 'Submit'}</Button>
        </Form>
      </Container>
    </DefaultLayout>
  );
};

export default ResetPassword;
