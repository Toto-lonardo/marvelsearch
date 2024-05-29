import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// @ts-ignore
import Root from "./routes/root.jsx";
import ErrorPage from "./error-page.tsx";
import App from "./App";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CharacterDetailPage from "./features/character-list/containers/CharacterDetailPage.tsx";
import ComicPage from "./features/character-list/containers/ComicPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [],
  },

  {
    path: "character/:id",
    element: <CharacterDetailPage />,
  },

  {
    path: "comic/:id",
    element: <ComicPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
