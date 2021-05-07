import {useEffect, useRef} from 'react';

const useScriptRef = () => {
    const scripted = useRef(true);

    useEffect(
        () => () => {
            scripted.current = false;
        },
        []
    );

    return scripted;
};

export default useScriptRef;
