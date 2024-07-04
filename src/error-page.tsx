import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  let errorMessage: string;

  console.error(error);

  if (isRouteErrorResponse(error)) {
    //error is type `Error Response`
    errorMessage = error.data || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <div
      id="error-page"
      className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-cwhite"
    >
      <h1 className="mb-4">Error 404: Page not found</h1>
      <p className="fw-bold">Looks like Thanos snapped his fingers again!</p>
      <p>
        The page you're looking for has vanished into the Marvel Multiverse.
      </p>
      <p>
        <i className="">{errorMessage}</i>
      </p>
    </div>
  );
}
