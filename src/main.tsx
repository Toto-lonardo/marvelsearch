import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// @ts-ignore
import Root from "./routes/root.jsx";
import ErrorPage from "./error-page.tsx";
import App from "./App";
import CharacterGrid from "./features/character-list/components/CharacterGrid.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
