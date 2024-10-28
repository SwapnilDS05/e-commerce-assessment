import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
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
  LinkStyled,
} from "../../../components/formElements/FormStyledComponents";
import { useAuth } from "../../../hooks/AuthProvider";
import { postRequest } from "../../../services/api";
import { ENDPOINTS } from "../../../services/endpoints";

const ForgotPassword = ({ onSubmit }) => {
  const { isLoading, setIsLoading } = useAuth();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Email is invalid")
      .required("Email is a required field"),
  });
  const defaultValues = {
    email: "",
  };
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (data) => {
    if (onSubmit) {
      onSubmit(data);
    } else {
      if (isValid) {
        try {
          setIsLoading(true);
          const response = await postRequest(ENDPOINTS.FORGET_PASSWORD, data);
          if (response.status === "Success") {
            window.localStorage.setItem("forgotEmail", data?.email);
            toast.success("Request submitted successfully!");
            setTimeout(() => {              
              window.location.href = `/reset-password?resetToken=${response?.data?.reset_token}`;
            }, 1000);
          } else {
            toast.error(`${response.message}`);
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
        <h2>Forgot Password?</h2>
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
              <FormHelperText>{errors.email.message}</FormHelperText>
            )}
          </FormControl>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
          <div>
            <p>
              <LinkStyled href="/">Back To Login</LinkStyled>
            </p>
          </div>
        </Form>
      </Container>
    </DefaultLayout>
  );
};

export default ForgotPassword;
