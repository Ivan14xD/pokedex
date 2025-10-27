import { isRouteErrorResponse, useRouteError } from "react-router-dom";

type DataWithResponseInit<T = unknown> = {
    type: "DataWoithResponseInit";
    data: T;
    init: ResponseInit
}

function isDataWithResponseInit<T>(err: unknown): err is DataWithResponseInit<T> {
return (
        typeof err === "object" &&
        err !== null &&
        (err as any).type === "DataWithResponseInit"
    )
}

export default function Error() {

  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        return <div>Página no encontrada</div>;
      case 500:
        return <div>Error del servidor</div>;
      default:
        return (
          <div>
            <h1>Error {error.status}</h1>
            <p>{error.statusText}</p>
          </div>
        );
    }
  }

    if (isDataWithResponseInit<{message:string}>(error)) {
      return <h1>{error.init.status} - {error.data.message}</h1>
      }

  return (
    <div>
      <h1>Algo salió mal</h1>
    </div>
  )
}
