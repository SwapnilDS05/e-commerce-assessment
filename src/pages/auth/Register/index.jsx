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

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email is invalid")
    .required("Email is a required field"),
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

const Register = ({ onSubmit }) => {
  const { isLoading, setIsLoading } = useAuth();
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
          const response = await postRequest(ENDPOINTS.REGISTER, data);
          if (response.status === 'Success') {
            toast.success('Account created successfully... Please login');
            setTimeout(() => {              
              window.location.href = '/';
            }, 1000);
            setIsLoading(false);
          } else {
            toast.error(`${response.message}`);
            setIsLoading(false);
          }
        } catch (error) {
          setIsLoading(false);
          console.error('Error during register:', error);
          toast.error(error.message ? `${error.message}` : 'Something went wrong...');
        }
      }
    }
  };

  return (
    <DefaultLayout>
      <TopMenu />
      <Container>
        <h2>Register</h2>
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

          <Button type="submit" disabled={isLoading}>{isLoading ? 'Registering...' : 'Register'}</Button>
          <div>
            <p>Already have an account?</p>
            <p>
              <LinkStyled href="/">Login</LinkStyled>
            </p>
          </div>
        </Form>
      </Container>
    </DefaultLayout>
  );
};

export default Register;
