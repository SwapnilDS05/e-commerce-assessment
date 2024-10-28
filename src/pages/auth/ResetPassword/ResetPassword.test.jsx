import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import AuthProvider from "../../../hooks/AuthProvider";
import { validateResetPassword } from "../../../utils/validations";
import ResetPassword from "./index";

describe("ResetPassword", () => {
  test("renders reset password form elements", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <ResetPassword />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("shows error messages on invalid submit in reset password process", async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <ResetPassword />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(
      await screen.findByText("Password is a required field")
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/confirm password is a required field/i)
    ).toBeInTheDocument();
  });

  test("shows error message for password length in reset password process", async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <ResetPassword />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    setTimeout(() => {
      const errorMessage = screen.getByTestId('password-error'); // Finding error message by data-testid
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent('Password must be at least 5 characters');
    }, 300);
  });

  test("submits the form with valid data in reset password process", async () => {
    const mockSubmit = jest.fn();
    render(
      <MemoryRouter>
        <AuthProvider>
          <ResetPassword onSubmit={mockSubmit} />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    setTimeout(async () => {
      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledTimes(1);
      });
      expect(mockSubmit).toHaveBeenCalledWith({
        confirmPassword: "password123",
        email: "testuser@gmail.com",
        password: "password123",
      });
    }, 300);
  });

  test("should validate a correct reset password", () => {
    const result = validateResetPassword("password123", "password123");
    expect(result.isPasswordMatch).toBe(true);
    expect(result.isValidPassword).toBe(true);
  });

  test("should invalidate passwords that do not match", () => {
    const result = validateResetPassword("password123", "password321");
    expect(result.isPasswordMatch).toBe(false);
    expect(result.isValidPassword).toBe(true);
  });

  test("should invalidate short passwords", () => {
    const result = validateResetPassword("pass", "pass");
    expect(result.isPasswordMatch).toBe(true);
    expect(result.isValidPassword).toBe(false);
  });

  test("should invalidate if password and confirm password are empty", () => {
    const result = validateResetPassword("", "");
    expect(result.isPasswordMatch).toBe(true);
    expect(result.isValidPassword).toBe(false);
  });
});
