import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page.tsx";
import App from "./App";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CharacterDetailPage from "./features/character-list/containers/CharacterDetailPage.tsx";
import ComicPage from "./features/comic/ComicPage.tsx";

import { PersistGate } from "redux-persist/integration/react";

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
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
