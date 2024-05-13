import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as charApiInterfaces from "../../utils/charInterface";
import * as comicApiInterfaces from "../../utils/comicInterface";
import { ReactNode } from "react";

const apiurl = import.meta.env.VITE_MARVEL_API;

const apikey = import.meta.env.VITE_MARVEL_API_KEY;

type searchArgs = {
  searchChar: string;
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
        searchArgs
      >({
        query(searchArgs) {
          const { searchChar = "", offset = 0 }: searchArgs = searchArgs;
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
      fetchComicsCharacterById: builder.query<
        comicApiInterfaces.ApiResponse,
        number | void
      >({
        query(id) {
          return `characters/${id}/comics?apikey=${apikey}`;
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
} = apiSlice;
