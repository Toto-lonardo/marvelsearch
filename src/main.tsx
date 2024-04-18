import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// @ts-ignore
import Root from "./routes/root.jsx";
import "./index.css";
import ErrorPage from "./error-page.tsx";
import App from "./App.tsx";
import CharacterGrid from "./features/character-list/components/CharacterGrid.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
// import App from "./App.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [],
  },

  {
    path: "character/",
    element: <CharacterGrid />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>,
);
