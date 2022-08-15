import { render } from "react-dom";
import { MemoryRouter } from "react-router-dom";

import AppRouter from "../../../navigation/AppRouter";

describe("App Router Test", () => {
  test("Should show login view page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRouter />
      </MemoryRouter>
    );

    const userNameLabelElem = screen.getByText("User Name");

    expect(userNameLabelElem).toBeInTheDocument();

    const passwordLabelElem = screen.getByText("Password");

    expect(passwordLabelElem).toBeInTheDocument();

    const buttonLoginLabelElem = screen.getByText("Login");

    expect(buttonLoginLabelElem).toBeInTheDocument();
  });

  test("Should show not found view page when path is unknown", () => {
    render(
      <MemoryRouter initialEntries={["/dummy"]}>
        <AppRouter />
      </MemoryRouter>
    );

    const errorLabelElem = screen.getByText(/Ooops/);

    expect(errorLabelElem).toBeInTheDocument();
  });

  test("Should show product view page", () => {
    render(
      <Provider
        store={setUpStore({
          userInfoReducer: { name: "dummy" },
        })}
      >
        <MemoryRouter initialEntries={["/main/product"]}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );

    const productLabelElem = screen.getByText("Product");

    expect(productLabelElem).toBeInTheDocument();
  });
});
