import { useEffect, useRef } from 'react';

// ==============================|| ELEMENT REFERENCE HOOKS ||============================== //

export default function useScriptRef() {
  const scripted = useRef(true);

  useEffect(() => {
    scripted.current = false;
  }, []);

  return scripted;
}
