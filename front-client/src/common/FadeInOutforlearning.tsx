import React, {useState, useMemo, useEffect, useRef} from 'react';
import '../css/Map.css';
import '../css/map/LocationsComponent/StyleBakeryInfoRightDrawer.css';
import { useTransition, useSpring, animated } from '@react-spring/web'
import styled from "styled-components"
import { CSSTransition, Transition } from 'react-transition-group';

const UNMOUNTED = "unmounted";
const EXITED = "exited";
const ENTERING = "entering";
const ENTERED = "entered";
const EXITING = "exiting";

const transitionStyles: { [id: string]: React.CSSProperties } = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 }
};

const duration = 2;
const defaultStyle = {
    transition: 'all ${duration}s 0.5s ease-in-out',
    opacity: '0',
}

type PropsTypeFadeInOut = {
    // children?: React.ReactNode,
    children: JSX.Element,
    // className: string,
    inProp: boolean,
}

const FadeInOut = (propsFadeInOut: PropsTypeFadeInOut) => {
    // Props
    const { children, inProp } = propsFadeInOut;
    // const { children, className, inProp } = propsFadeInOut;

    const [state, setState] = useState<string>(UNMOUNTED);
    const nodeRef = useRef(null);
        
    return (
        <Transition nodeRef={nodeRef} in={inProp} timeout={duration} >
            {state => (
                <div 
                    ref={nodeRef} 
                    style={{...defaultStyle, ...transitionStyles[state]}}
                >
                    {children}
                </div>
            )}
        </Transition>
    )
}

export default FadeInOut;