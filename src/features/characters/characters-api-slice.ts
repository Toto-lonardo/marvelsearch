import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as apiInterfaces from "../../utils/interface";

const apiurl = import.meta.env.VITE_MARVEL_API;

const apikey = import.meta.env.VITE_MARVEL_API_KEY;

type args = {
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
      fetchCharacters: builder.query<apiInterfaces.ApiResponse, number | void>({
        query(offset = 0) {
          return `characters?&limit=20&offset=${offset}&apikey=${apikey}`;
        },
      }),
      fetchCharactersBySearch: builder.query<apiInterfaces.ApiResponse, args>({
        query(args) {
          const { searchChar = "", offset = 0 }: args = args;
          return `characters?nameStartsWith=${searchChar}&limit=20&offset=${offset}&apikey=${apikey}`;
        },
      }),
    };
  },
});

export const { useFetchCharactersQuery, useFetchCharactersBySearchQuery } =
  apiSlice;
