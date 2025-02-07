import { Suspense } from 'react';

// project imports
import Loader from './Loader';

export default function Loadable(Component) {
  const WrappedComponent = (props) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

  return WrappedComponent;
}
