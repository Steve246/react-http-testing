import useViewState from "../../../shared/hook/UseViewState";

import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("View State Hook", () => {
  test("Set Loading", () => {
    const { result } = renderHook(() => useViewState());

    // console.log(result)

    // result.current.setLoading();

    act(() => {
      result.current.setLoading();
    });

    expect(result.current.viewState.isLoading).toBeTruthy();

    expect(result.current.viewState.data).toBeNull();

    expect(result.current.viewState.error).toBeNull();
  });

  test("Set Data", () => {
    const { result } = renderHook(() => useViewState());

    // console.log(result)

    // result.current.setLoading();

    act(() => {
      result.current.setData({ product: "123" });
    });

    expect(result.current.viewState.isLoading).toBeFalsy();

    expect(result.current.viewState.data.product).toBe("123");

    expect(result.current.viewState.error).toBeNull();
  });

  test("Set Error", () => {
    const { result } = renderHook(() => useViewState());

    // console.log(result)

    // result.current.setLoading();

    act(() => {
      result.current.setError("error");
    });

    expect(result.current.viewState.isLoading).toBeFalsy();

    expect(result.current.viewState.data).toBeNull();

    expect(result.current.viewState.error).toBe("error");
  });
});
