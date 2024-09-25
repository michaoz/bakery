import { createContext, useContext } from "react";

/* nodeRef */
// Use when you need nodeRef from the CSSTransition component (ex in: FadeInOut.tsx, SlideInOut.tsx).
export const NodeRefContext = createContext<React.MutableRefObject<null> | undefined>(undefined);

export function useNodeRefContext() {
    const useNodeRef = useContext(NodeRefContext);

    if (useNodeRef === undefined) {
        throw new Error("Use 'useNodeRefContext' to use useContext.") 
    }

    return useNodeRef;
} 
/* nodeRef end */
