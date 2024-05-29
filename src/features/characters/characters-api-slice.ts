import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as charApiInterfaces from "../../utils/charInterface";
import * as comicApiInterfaces from "../../utils/comicInterface";

const apiurl = import.meta.env.VITE_MARVEL_API;

const apikey = import.meta.env.VITE_MARVEL_API_KEY;

type searchCharArgs = {
  searchChar: string;
  offset: number;
};

type searchComicArgs = {
  comicId: number;
  offset: number;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: apiurl,
  }),
  endpoints(builder) {
    return {
      fetchCharacters: builder.query<
        charApiInterfaces.ApiResponse,
        number | void
      >({
        query(offset = 0) {
          return `characters?&limit=20&offset=${offset}&apikey=${apikey}`;
        },
      }),
      fetchCharactersBySearch: builder.query<
        charApiInterfaces.ApiResponse,
        searchCharArgs
      >({
        query(searchArgs) {
          const { searchChar = "", offset = 0 }: searchCharArgs = searchArgs;
          return `characters?nameStartsWith=${searchChar}&limit=20&offset=${offset}&apikey=${apikey}`;
        },
      }),
      fetchCharacterById: builder.query<
        charApiInterfaces.ApiResponse,
        number | void
      >({
        query(id) {
          return `characters/${id}?apikey=${apikey}`;
        },
      }),
      fetchComicById: builder.query<
        comicApiInterfaces.ApiResponse,
        number | void
      >({
        query(id) {
          return `comics/${id}?apikey=${apikey}`;
        },
      }),
      fetchComicsCharacterById: builder.query<
        comicApiInterfaces.ApiResponse,
        searchComicArgs
      >({
        query(searchComicArgs) {
          const { comicId = 0, offset = 0 }: searchComicArgs = searchComicArgs;
          return `characters/${comicId}/comics?limit=20&offset=${offset}&apikey=${apikey}`;
        },
      }),
    };
  },
});

export const {
  useFetchCharactersQuery,
  useFetchCharactersBySearchQuery,
  useFetchCharacterByIdQuery,
  useFetchComicsCharacterByIdQuery,
  useFetchComicByIdQuery,
} = apiSlice;
