import { Suspense, ComponentType } from 'react';

// project imports
import Loader from './Loader';

export default function Loadable<P extends object>(Component: ComponentType<P>) {
  const WrappedComponent = (props: P) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

  return WrappedComponent;
}
