import React, {useState, useMemo, useEffect, useRef, PropsWithChildren} from 'react';
import '../css/Map.css';
import '../css/common/SlideInOut.css';
import { useTransition, useSpring, animated } from '@react-spring/web'
import styled from "styled-components"
import { CSSTransition, Transition } from 'react-transition-group';
import { BakeryGetApi } from '../types/TypeBakeryGetApi';
import BakeryInfoRightDrawer from '../map/LocationsComponent/BakeryInfoRightDrawer';
import { NodeRefContext } from '../context';
import { PropsTypeSlideInOut } from '../types/PropsTypeSlideInOut';

const SlideInOut = (propsSlideInOut: PropsWithChildren<PropsTypeSlideInOut>) => {
    // Props
    const { children, inProp, nodeRef, bakeryInfoRightDrawer } = propsSlideInOut;

    return (
        <CSSTransition 
            nodeRef={nodeRef} 
            in={inProp} 
            timeout={200}
            unmountOnExit 
            // stateがfalseの場合にunmountされる設定。表示/非表示の設定の場合は指定する
            // unmountOnExit を指定しないと、マウント時にはクラスが適応されない。
            classNames="slide-inout"  // ここで設定したクラス名をCSSで指定することになる
        >
            <NodeRefContext.Provider value={nodeRef}>
                {children}
            </NodeRefContext.Provider>
        </CSSTransition>
    )
}

export default SlideInOut;