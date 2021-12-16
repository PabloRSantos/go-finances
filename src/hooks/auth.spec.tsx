import { useAuth, AuthProvider } from "./auth";
import { renderHook } from "@testing-library/react-hooks";
import fetchMock from "jest-fetch-mock";
import { waitFor } from "@testing-library/react-native";

fetchMock.enableMocks();

const userTest = {
  id: "any_id",
  email: "john.doe@email.com",
  name: "John Doe",
  photo: "any_photo.png",
};

const mockedStartAsync = jest.fn();
jest.mock("expo-auth-session", () => ({
  startAsync: () => mockedStartAsync(),
}));

describe("Auth Hook", () => {
  beforeEach(() => {
    fetchMock.mockResponseOnce(JSON.stringify(userTest));
  });

  it("should be able to sign in with Google account", async () => {
    mockedStartAsync.mockResolvedValueOnce({
      type: "success",
      params: {
        access_token: "any_token",
      },
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signInWithGoogle();

    await waitFor(() => {
      expect(result.current.user.email).toBe(userTest.email);
    });
  });

  it("should not connect if cancel authentication with Google", async () => {
    mockedStartAsync.mockResolvedValueOnce({
      type: "cancel",
      params: {
        access_token: "any_token",
      },
    });
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signInWithGoogle();

    await waitFor(() => {
      expect(result.current.user).not.toHaveProperty("id");
    });
  });
});
