import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Register } from ".";
import { ThemeProvider } from "styled-components/native";
import { theme } from "../../global/styles/theme";

jest.mock('@react-navigation/native', () => {
    return {
      useNavigation: jest.fn(),
    };
  });

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("Register Screen", () => {
  it("should be open category modal when user click on button", () => {
    const { getByTestId } = render(<Register />, { wrapper: Providers });

    const categoryModal = getByTestId('modal-category')
    expect(categoryModal.props.visible).toBeFalsy()
    fireEvent.press(getByTestId('button-category'))
    expect(categoryModal.props.visible).toBeTruthy()
  });
});
