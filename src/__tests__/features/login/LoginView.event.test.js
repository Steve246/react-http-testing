import LoginView from "../../../features/Login/LoginView";

import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { APP_NAVIGATION } from "../../../shared/constants";
import { UnauthorizedError } from "../../../shared/errors/AppError";

const mockUseNavigate = jest.fn()

const mockOnLogin = jest.fn();
jest.mock("../../../features/Login/UseLogin", () => ({
  useAuth: () => mockOnLogin(),
}));

jest.mock( 'react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}))

describe("Login View Event", () => {
  test("Should show error when username or password is empty", () => {

    mockOnLogin.mockReturnValue({
      onLogin: jest.fn()
    })


    // render(
    //   <MemoryRouter>
    //     <LoginView />
    //   </MemoryRouter>
    // );

    render( <LoginView />)

    const loginButtonElem = screen.getByText("Login");

    fireEvent.click(loginButtonElem);

    const errorLabelElem = screen.getByText(/please input/i);

    // pake i di belakang untuk menandakan tidak case sensitive

    expect(errorLabelElem).toBeInTheDocument();
  });

  test("should show error  unauthorized when response onLogin is false", () => {
    mockOnLogin.mockReturnValue({
      onLogin: jest.fn().mockResolvedValue(false),
    });

    render(
      <MemoryRouter>
        <LoginView />
      </MemoryRouter>
    );

    const userNameElen = screen.getByLabelText(/User Name/);

    const passwordElen = screen.getByLabelText(/Password/);

    fireEvent.change(userNameElen, { target: { value: "dummy user" } });

    fireEvent.change(passwordElen, { target: { value: "dummy password" } });

    const loginButtomElem = screen.getByText("Login");

    fireEvent.click(loginButtomElem);

    await waitFor( () => {

      const errorLabelElem = screen.getByText("/unauthorized/i");

      expect(errorLabelElem).toBeInTheDocument();
      
    })

    
  });

  test("should show error  unauthorized when onLogin is throwin error", () => {
    mockOnLogin.mockReturnValue({
      onLogin: jest.fn().mockResolvedValue(new    UnauthorizedError()),
   
    });

    render(
      <MemoryRouter>
        <LoginView />
      </MemoryRouter>
    );

    const userNameElen = screen.getByLabelText(/User Name/);

    const passwordElen = screen.getByLabelText(/Password/);

    fireEvent.change(userNameElen, { target: { value: "dummy user" } });

    fireEvent.change(passwordElen, { target: { value: "dummy password" } });

    const loginButtomElem = screen.getByText("Login");

    fireEvent.click(loginButtomElem);

    await waitFor( () => {

      const errorLabelElem = screen.getByText("/unauthorized/i");

      expect(errorLabelElem).toBeInTheDocument();
      
    })
  });


  test("Should navigate when login is success", () => {
    mockOnLogin.mockReturnValue({
      onLogin: jest.fn().mockResolvedValue(false)
    })

    render(
      <MemoryRouter>
        <LoginView />
      </MemoryRouter>
    );

    const userNameElen = screen.getByLabelText(/User Name/);

    const passwordElen = screen.getByLabelText(/Password/);

    fireEvent.change(userNameElen, { target: { value: "dummy user" } });

    fireEvent.change(passwordElen, { target: { value: "dummy password" } });

    const loginButtomElem = screen.getByText("Login");

    fireEvent.click(loginButtomElem);

    await waitFor( () => {

      expect(mockUseNavigate).toHaveBeenCalledWidth(APP_NAVIGATION.MAIN, {replace: true})
      
    })


  })



});
