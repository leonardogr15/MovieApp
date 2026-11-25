import { render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";
import { fetchPopularMovies, MissingApiKeyError } from "../utils/tmdb";

// The real tmdb module imports axios (ESM), which CRA's Jest does not transform.
jest.mock("axios", () => ({ __esModule: true, default: { get: jest.fn() } }));
jest.mock("../utils/tmdb", () => {
  const actual = jest.requireActual("../utils/tmdb");
  return { ...actual, fetchPopularMovies: jest.fn(), searchMovies: jest.fn() };
});
const popular = fetchPopularMovies as jest.Mock;

const saved = [{ id: 9, title: "Saved film", year: "2001", poster: "" }];

test("explains a missing API key and keeps the saved movies visible", async () => {
  popular.mockRejectedValue(new MissingApiKeyError());
  render(<SearchBar onAdd={() => {}} allMovies={saved} favIds={[]} />);

  expect(await screen.findByRole("alert")).toHaveTextContent("Falta configurar la clave de TMDB");
  expect(screen.getByText("Saved film (2001)")).toBeInTheDocument();
});

test("reports a TMDB failure without crashing", async () => {
  popular.mockRejectedValue(new Error("Network Error"));
  render(<SearchBar onAdd={() => {}} allMovies={[]} favIds={[]} />);

  expect(await screen.findByRole("alert")).toHaveTextContent("No se pudieron cargar películas de TMDB");
});
