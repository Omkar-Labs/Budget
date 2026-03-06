import React from 'react';


export const useIntersecting = (ref) =>{
    let isIntersecting = false;

    const observer = new IntersectionObserver(([entry]) => {
        isIntersecting = entry.isIntersecting;
    });

    React.useEffect(() => {
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            observer.disconnect();
        };
    }, [ref]);

    return isIntersecting;
};