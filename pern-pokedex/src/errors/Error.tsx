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

  }

  return (
    <div>Error</div>
  )
}
