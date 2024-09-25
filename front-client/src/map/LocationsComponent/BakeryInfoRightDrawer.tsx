import React, {useState, useMemo, useEffect} from 'react';
import '../../css/Map.css';
import '../../css/map/LocationsComponent/StyleBakeryInfoRightDrawer.css';
import { PropsTypeBakeryInfoRightDrawer } from '../../types/PropsTypeBakeryInfoRightDrawer';
import { useTransition, useSpring, animated } from '@react-spring/web'
import { useNodeRefContext } from '../../context';

type Anchor = "left";
type LeftMenuProps = {
    isLeftOpen: boolean;
    toggleDrawer: (anchor: "left", open: boolean) => (
        e: React.KeyboardEvent | React.MouseEvent) => void;
}

const BakeryInfoRightDrawer = (propsBakeryInfoRightDrawer: PropsTypeBakeryInfoRightDrawer) => {
    // Props
    const { bakeryInfoRightDrawer, isOpenRightDrawer } = propsBakeryInfoRightDrawer;
    const nodeRef = useNodeRefContext();

    type typeDefinedBakeryInfoKey = keyof typeof bakeryInfoRightDrawer;

    // return transitionStyle((style, item) => (
    return (
        <div className="bakery-info-right-drawer" ref={nodeRef} >
        {/* <animated.div className="bakery-info-right-drawer" style={style}> */}
            <table>
                <thead>
                </thead>
                <tbody>
                    {Object.keys(bakeryInfoRightDrawer).map((bakeryInfoKey: string, idx: number) => {
                        const key = bakeryInfoKey + idx.toString();
                        const thTitle = bakeryInfoKey.replace("_", " ");
                        const typeDefinedBakeryInfoKey = bakeryInfoKey as typeDefinedBakeryInfoKey
                        return (
                            <tr key={key}>
                                <th>{thTitle}</th>
                                <td>{bakeryInfoRightDrawer[typeDefinedBakeryInfoKey]}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div id="idBkeryInfoRightDrawer">{JSON.stringify(bakeryInfoRightDrawer)}</div>
        {/* </animated.div>   */}
        </div>
    );
}

export default BakeryInfoRightDrawer;