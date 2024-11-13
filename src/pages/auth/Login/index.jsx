import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from 'react-toastify';
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
// import { encryptData } from "../../../utils/commonMethods";
import { useAuth } from "../../../hooks/AuthProvider";
import { postRequest } from "../../../services/api";
import { ENDPOINTS } from '../../../services/endpoints';
import { storeToken } from "../../../utils/commonMethods";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is a required field"),
  password: yup
    .string()
    .required("Password is a required field")
    .min(5, "Password must be at least 5 characters"),
});

const defaultValues = {
  password: "",
  email: "",
};

const Login = ({ onSubmit }) => {
  const { isLoading, setIsLoading } = useAuth();
  let abortController = useRef(null);

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
    }else{
      if (isValid) {
        try {
          setIsLoading(true);
          const response = await postRequest(ENDPOINTS.LOGIN, data, abortController.current.signal);
          if (response.status === 'Success') {
            toast.success('Logged in successfully!');
            if (response?.data) {
              storeToken(response.data);
              setTimeout(() => {                
                window.location.href = '/my-account';
              }, 1000);
            }
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
        <h1>Login</h1>
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

          <LinkStyled href="/forgot-password">Forgot Password?</LinkStyled>

          <Button type="submit" disabled={isLoading}>{isLoading ? 'Logging...' : 'Login'}</Button>
          <div>
            <p>New on our platform?</p>
            <p>
              <LinkStyled href="/register/">Create an account</LinkStyled>
            </p>
          </div>
        </Form>
      </Container>
    </DefaultLayout>
  );
};

export default Login;
