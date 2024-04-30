import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as apiInterfaces from "../../utils/interface";

const apiurl = import.meta.env.VITE_MARVEL_API;

const apikey = import.meta.env.VITE_MARVEL_API_KEY;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: apiurl,
  }),
  endpoints(builder) {
    return {
      fetchComics: builder.query<apiInterfaces.Post, number | void>({
        query(limit = 20, offset = 0) {
          return `characters?limit=${limit}&offset=${offset}&apikey=${apikey}`;
        },
      }),
    };
  },
});

export const { useFetchComicsQuery } = apiSlice;
