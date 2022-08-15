import { render, screen } from "@testing-library/react";
import LoginView from "../../../features/Login/LoginView";

const mockUseLogin = jest.fn();

jest.mock("../../../features/Login/UseLogin", () => () => mockUseLogin());

// perlu mock useLogin karena kita ada hooks didlm loginview

describe("Login View Test", () => {
  test("Should Render Successfully", () => {
    mockUseLogin.mockReturnValue({
      viewState: "",
      userCred: "",
      handleInputChange: jest.fn(),
      handleLogin: jest.fn(),
    });

    render(<LoginView />);

    const userNameLabelElem = screen.getByText("User Name");

    expect(userNameLabelElem).toBeInTheDocument();

    const passwordLabelElem = screen.getByText("Password");

    expect(passwordLabelElem).toBeInTheDocument();

    const buttonLoginLabelElem = screen.getByText("Login");

    expect(buttonLoginLabelElem).toBeInTheDocument();

    // expect ada Label-label yang perlu, kayak User name, Password, dan Login
  });

  test("Should Disabled Button When State Is Loading", () => {
    mockUseLogin.mockReturnValue({
      viewState: { isLoading: true, data: null, error: null },
      userCred: "",
      handleInputChange: jest.fn(),
      handleLogin: jest.fn(),
    });

    render(<LoginView />);

    const buttonLoginLabelElem = screen.getByText("Login");

    expect(buttonLoginLabelElem).toBeDisabled();
  });

  // yang atas cek button mati atau ngak dari viewState, nilai isinya kita musti tau dri code

  test("Should Show Error when Error State Exist", () => {
    mockUseLogin.mockReturnValue({
      viewState: { isLoading: false, data: null, error: "Error" },
      userCred: "",
      handleInputChange: jest.fn(),
      handleLogin: jest.fn(),
    });

    render(<LoginView />);

    const errorTextElem = screen.getByText("Error");

    expect(errorTextElem).toBeInTheDocument();
  });
});
