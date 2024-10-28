import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import AuthProvider from "../../../hooks/AuthProvider";
import { validateLogin } from "../../../utils/validations";
import Login from "./index";

describe("Login", () => {
  test("renders login form elements", () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("shows error messages on invalid submit", async () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByText(/email is a required field/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/password is a required field/i)
    ).toBeInTheDocument();
  });

  test("shows error message for password length", async () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByText("Password must be at least 5 characters")
    ).toBeInTheDocument();
  });

  test("submits the form with valid data", async () => {
    const mockSubmit = jest.fn();
    render(
      <AuthProvider>
        <Login onSubmit={mockSubmit} />
      </AuthProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "testuser@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });
    expect(mockSubmit).toHaveBeenCalledWith({
      email: "testuser@gmail.com",
      password: "password123",
    });
  });

  test("should invalidate an incorrect email format", () => {
    const result = validateLogin("invalid-email", "password123");
    expect(result.isValidEmail).toBe(false);
    expect(result.isValidPassword).toBe(true);
  });

  test("should invalidate short passwords", () => {
    const result = validateLogin("test@example.com", "pass");
    expect(result.isValidEmail).toBe(true);
    expect(result.isValidPassword).toBe(false);
  });
});
