import { fireEvent, render, screen } from "@testing-library/react";

import FormButton from "../../../shared/components/FormButton/FormButton";

describe("Form Buttom", () => {
  test("Render Successfully", () => {
    render(<FormButton label="dummy label" />);

    const labelElem = screen.getByText("dummy label");
    expect(labelElem).toBeInTheDocument();
  });

  test("Button is disabled", () => {
    render(<FormButton label="dummy label" disabled />);

    const labelElem = screen.getByText("dummy label");
    expect(labelElem).toBeInTheDocument();
  });

  test("Button event click", () => {
    const mockEventClick = jest.fn();
    render(<FormButton label="dummy label" onClick={mockEventClick} />);

    const labelElem = screen.getByText("dummy label");
    fireEvent.click(labelElem);
    expect(mockEventClick).toHaveBeenCalled();
  });
});
