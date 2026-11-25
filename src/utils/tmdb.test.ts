import axios from "axios";
import { fetchPopularMovies, MissingApiKeyError, searchMovies } from "./tmdb";

// axios is replaced so the tests never call TMDB.
jest.mock("axios", () => ({ __esModule: true, default: { get: jest.fn() } }));
const get = axios.get as jest.Mock;

const ORIGINAL = process.env.REACT_APP_TMDB_API_KEY;
afterEach(() => {
  process.env.REACT_APP_TMDB_API_KEY = ORIGINAL;
  get.mockReset();
});

test("refuses to call TMDB when no API key is configured", async () => {
  delete process.env.REACT_APP_TMDB_API_KEY;
  await expect(fetchPopularMovies()).rejects.toBeInstanceOf(MissingApiKeyError);
  expect(get).not.toHaveBeenCalled();
});

test("searches with the configured key and maps the results", async () => {
  process.env.REACT_APP_TMDB_API_KEY = "test-key-not-real";
  get.mockResolvedValue({
    data: {
      results: [
        { id: 1, title: "Arrival", release_date: "2016-11-11", poster_path: "/a.jpg" },
        { id: 2, title: "Untitled", release_date: undefined, poster_path: null },
      ],
    },
  });

  const movies = await searchMovies("arrival");

  expect(get).toHaveBeenCalledWith("https://api.themoviedb.org/3/search/movie", {
    params: { api_key: "test-key-not-real", query: "arrival" },
  });
  expect(movies).toEqual([
    { id: 1, title: "Arrival", year: "2016", poster: "https://image.tmdb.org/t/p/w200/a.jpg" },
    { id: 2, title: "Untitled", year: "N/A", poster: "" },
  ]);
});
