import React, {useEffect, useRef, useState, useMemo, useCallback} from 'react';
import logo from './logo.svg';
import './Map.css';
import { typeSelectedShop } from '../types/TypeSelectedShop'
import SelectedShop from "./Resouces/SelectedShop.json"
import ShopGrops from "./Resouces/ShopGroups.json"
import SelectedGroupedShops from "./Resouces/SelectedGroupedShops.json"
import TopBar from './TopBar/TopBar'
import LocationPopper from './LocationsComponent/LocationPopper'
import { AccountMenu } from './TopBar/TopBarAccountMenu'
import SearchSpot from './MapComponents/SearchSpot'
import { MapContainer, TileLayer, Marker, Pane, Rectangle, Popup } from 'react-leaflet'
import Leaflet from 'leaflet'
import "leaflet/dist/leaflet.css";
import { borderRadius } from '@mui/system';
import { createTheme, useTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Grid, Paper, Box, IconButton, Popper, TextField } from '@mui/material';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { useLocation } from "react-router-dom";
import { BakeryData } from '../types/TypeBakeryData';
import { BakeryGetApi } from '../types/TypeBakeryGetApi';
import MapBakeriesTable from './LocationsComponent/BakeriesTable';
import { initDataBakeryGetApi } from '../data/initDataBakeryGetApi';

delete (Leaflet.Icon.Default.prototype as any)._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

/**CSS *******************************************/
// v5
const DrawerHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
})

const TableBakery = styled('table')({
  border: '1px solid #add8e6',
  borderCollapse: 'collapse',
  margin: '30px auto 30px 100px',
})

const ThBakery = styled('th')({
  border: '1px solid #add8e6',
  padding: '3px 30px',
  color: '#000',
  backgroundColor: '#4691db',
})

const TdBakery = styled('td')({
  border: '1px solid #add8e6',
  padding: '3px 30px',
  textAlign: 'left',
})

/*
// v4 makestyles (v5では廃止)
// https://zenn.dev/h_yoshikawa0724/articles/2021-09-26-material-ui-v5
const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    backgroundColor: '#0097a7'
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  textPosition: {
    textAlign: 'center'
  },
}));
const classes = useStyles();
*/
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#505050' : '#fff',  // ダークボードの場合は#505050, 通常時は#fff
  ...theme.typography.body2, // Typographyのデフォルトのフォント定義を使用する
  padding: theme.spacing(1),
  textAlign: 'center',
  marginLeft: '50px',
  // color: theme.palette.secondary.contrastText,
  color: '#000',
  borderRadius: '5px',
}));

/**CSS *******************************************/

/**データ(JSON)を読み込む */
// typeSelectedShop["selected"]とSelectedShopのcoordinationsの型が異なる([number, number]とnumber[])ため、代入できない。
  // → SelectedShopを文字列に戻してtypeSelectedShop["selected"]型を指定してparseする。
const selectedShop: typeSelectedShop["selected"] = JSON.parse(JSON.stringify(SelectedShop)) as typeSelectedShop["selected"];
const shopGroups: typeSelectedShop["groups"] = ShopGrops;
const selectedGroupedShops: typeSelectedShop["selectedGrouped"] = SelectedGroupedShops;

const Map = () => {
  const state = useLocation().state;
  const bakeryList: BakeryGetApi[] = state.bakeries;

  const mapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const mapCenterLocation: [number, number] = [35.6809591, 139.7673068];
  const currentLocation: [number, number] = [35.681, 139.767];

  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isBakeryInfoRightDrawerOpen, setBakeryInfoRightDrawerOpen] = useState<boolean>(false);
  const [bakeryInfoRightDrawer, setBakeryInfoRightDrawer] = useState<BakeryGetApi>(initDataBakeryGetApi);

  var props = {
    propAnchorEl: anchorEl,
  }
  // shopGroups系を全部渡したい
  var shops = {
    selectedShop: selectedShop,
    shopGroups: shopGroups,
    selectedGroupedShops: selectedGroupedShops
  }

  // const DetailClick = (e: React.MouseEvent<HTMLButtonElement>)=> {
  const detailClick = (e: React.MouseEvent<HTMLButtonElement>, bakeryId: string)=> {
    const bakeryInfoList: BakeryGetApi[] = { ...bakeryList };  // 値渡し
    for (let i = 0; i < bakeryInfoList.length; i++) {
      if (bakeryInfoList[i].id === bakeryId) {
        setBakeryInfoRightDrawer(bakeryInfoList[i]);
      }
    }

    // for (let bakeryInfo of bakeryInfoList) {
    //   if (bakeryInfo.id === bakeryId) {
    //     setBakeryInfoRightDrawer(bakeryInfo);
    //   }
    // }
    // bakeryInfoList.forEach(bakeryInfo => {
    //   if (bakeryInfo.id === bakeryId) {
    //     setBakeryInfoRightDrawer(bakeryInfo);
    //   }
    // })

    // console.log(e.currentTarget.value);
    alert(e.currentTarget.value);
    alert(bakeryId);
  }

  /** Props **************************/
  // To MapBakeriesTable
  var propsMapBakeriesTable = {
    bakeryList: bakeryList,
    detailClick: detailClick,
  }
  /** Props end***********************/

  type typeDefinedBakeryInfoKey = keyof typeof bakeryInfoRightDrawer;

  return (
    <Box className="MapApp">
      {/* <header>
        <TopBar />   
      </header> */}
      <body className="Main">
        <div className="pinpoint">
          <SearchSpot />
        </div>
        <div className='pinpoint-box'>
          <LocationPopper {...shops}/>
        </div>
        <div className="Map">
          <MapContainer className="MapContainer" center={mapCenterLocation} zoom={13} scrollWheelZoom={false}>
            <TileLayer url={mapUrl} />
            {bakeryList.map((b: BakeryGetApi, idx: number) => {
              const key = b.id + (idx + 1).toString()
              return(
                <Marker key={key} position={[Number(b.lat), Number(b.lng)]}>
                  <Popup>
                    {b.name}
                  </Popup>
                </Marker>
              )
            })}
            {/* TODO: change the marker color of the current location*/}
            <Marker position={currentLocation}>
              <Popup>Current Location</Popup>
            </Marker>
          </MapContainer>
        </div>
      </body>
      <MapBakeriesTable {...propsMapBakeriesTable} />
      {/* <div className="bakery-info-right-drawer">
        <table>
          <tr>
            <th>aaa</th>
          </tr>
          <tr>
            {Object.keys(bakeryInfoRightDrawer).map((bakeryInfoKey: string, idx: number) => {
              const typeDefinedBakeryInfoKey = bakeryInfoKey as typeDefinedBakeryInfoKey
              return (
                <div>{bakeryInfoRightDrawer[typeDefinedBakeryInfoKey]}</div>
              )
            })}
          </tr>
        </table>
      </div> */}
      {/* <div className="bakeries">{JSON.stringify(state.bakeries)}</div> */}
    </Box>
  );
}

export default Map;
