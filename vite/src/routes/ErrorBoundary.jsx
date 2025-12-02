import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

// material-ui
import Alert from '@mui/material/Alert';

// ==============================|| ELEMENT ERROR - COMMON ||============================== //

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <Alert severity="error">Error 404 - This page doesn't exist!</Alert>;
    }

    if (error.status === 401) {
      return <Alert severity="error">Error 401 - You aren't authorized to see this</Alert>;
    }

    if (error.status === 503) {
      return <Alert severity="error">Error 503 - Looks like our API is down</Alert>;
    }

    if (error.status === 418) {
      return <Alert severity="error">Error 418 - Contact administrator</Alert>;
    }
  }

  return <Alert severity="error">Under Maintenance</Alert>;
}
