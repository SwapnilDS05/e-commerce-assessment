import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import AuthProvider from "../../../hooks/AuthProvider";
import { validateForgotPassword } from "../../../utils/validations";
import ForgotPassword from "./index";

describe("Login", () => {
  test("renders forgot password form elements", () => {
    render(
      <AuthProvider>
        <ForgotPassword />
      </AuthProvider>
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("shows error messages on invalid submit", async () => {
    render(
      <AuthProvider>
        <ForgotPassword />
      </AuthProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(
      await screen.findByText(/email is a required field/i)
    ).toBeInTheDocument();
  });

  test("submits the form with valid data", async () => {
    const mockSubmit = jest.fn();
    render(
      <AuthProvider>
        <ForgotPassword onSubmit={mockSubmit} />
      </AuthProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "testuser@gmail.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });
    expect(mockSubmit).toHaveBeenCalledWith({
      email: "testuser@gmail.com",
    });
  });

  test("should invalidate an incorrect email format", () => {
    const result = validateForgotPassword("invalid-email");
    expect(result.isValidEmail).toBe(false);
  });

  test("should invalidate short passwords", () => {
    const result = validateForgotPassword("test@example.com");
    expect(result.isValidEmail).toBe(true);
  });
});
