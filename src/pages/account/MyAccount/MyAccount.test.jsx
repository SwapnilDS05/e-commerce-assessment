import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import AuthProvider from "../../../hooks/AuthProvider";
import { validateMyAccount } from "../../../utils/validations";
import MyAccount from "./index";

describe("Register", () => {
  test("renders my account form elements", () => {
    render(
      <AuthProvider>
        <MyAccount />
      </AuthProvider>
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /updat/i })).toBeInTheDocument();
  });

  test("shows error messages on invalid submit in my account process", async () => {
    render(
      <AuthProvider>
        <MyAccount />
      </AuthProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /updat/i }));
    await waitFor(() => {
      const errorMessage = screen.getByText((_, element) =>
        element.textContent.includes('Email is a required field')
      );
      expect(errorMessage).toBeInTheDocument();
    });
    expect(
      await screen.findByText("Password is a required field")
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/confirm password is a required field/i)
    ).toBeInTheDocument();
  });

  test("shows error message for password length in my account process", async () => {
    render(
      <AuthProvider>
        <MyAccount />
      </AuthProvider>
    );

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /updat/i }));

    expect(
      await screen.findByText("Password must be at least 5 characters")
    ).toBeInTheDocument();
  });

  test("submits the form with valid data in my account process", async () => {
    const mockSubmit = jest.fn();
    render(
      <AuthProvider>
        <MyAccount onSubmit={mockSubmit} />
      </AuthProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "testuser@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /updat/i }));
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });
    expect(mockSubmit).toHaveBeenCalledWith({
      email: "testuser@gmail.com",
      password: "password123",
      confirmPassword: "password123",
    });
  });

  test("should validate a correct my account", () => {
    const result = validateMyAccount(
      "test@example.com",
      "password123",
      "password123"
    );
    expect(result.isValidEmail).toBe(true);
    expect(result.isPasswordMatch).toBe(true);
    expect(result.isValidPassword).toBe(true);
  });

  test("should invalidate an incorrect email format", () => {
    const result = validateMyAccount(
      "invalid-email",
      "password123",
      "password123"
    );
    expect(result.isValidEmail).toBe(false);
    expect(result.isPasswordMatch).toBe(true);
    expect(result.isValidPassword).toBe(true);
  });

  test("should invalidate passwords that do not match", () => {
    const result = validateMyAccount(
      "test@example.com",
      "password123",
      "password321"
    );
    expect(result.isValidEmail).toBe(true);
    expect(result.isPasswordMatch).toBe(false);
    expect(result.isValidPassword).toBe(true);
  });

  test("should invalidate short passwords", () => {
    const result = validateMyAccount("test@example.com", "pass", "pass");
    expect(result.isValidEmail).toBe(true);
    expect(result.isPasswordMatch).toBe(true);
    expect(result.isValidPassword).toBe(false);
  });

  test("should invalidate if password and confirm password are empty", () => {
    const result = validateMyAccount("test@example.com", "", "");
    expect(result.isValidEmail).toBe(true);
    expect(result.isPasswordMatch).toBe(true);
    expect(result.isValidPassword).toBe(false);
  });
});
