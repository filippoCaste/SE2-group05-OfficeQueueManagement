import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LoginForm } from "../../../components/AuthComponents";
import userEvent from "@testing-library/user-event";

describe("LoginForm", () => {
  test("renders the component correctly", () => {
    render(
      <MemoryRouter>
        <LoginForm login={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
  });
});
