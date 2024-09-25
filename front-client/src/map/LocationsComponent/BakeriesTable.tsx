import React, {useEffect, useRef, useState, useMemo, useCallback} from 'react';
import '../../css/Map.css';
import Leaflet from 'leaflet'
import "leaflet/dist/leaflet.css";
import { createTheme, useTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useLocation } from "react-router-dom";
import { BakeryGetApi } from '../../types/TypeBakeryGetApi';
import { PropsTypeMapBakeriesTable } from '../../types/PropsTypeMapBakeriesTable';

delete (Leaflet.Icon.Default.prototype as any)._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

/**CSS *******************************************/
// v5
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
/**CSS *******************************************/

const MapBakeriesTable = (propsMapBakeriesTable: PropsTypeMapBakeriesTable) => {
  // props
  const { bakeryList, detailClick } = propsMapBakeriesTable;
  
  const bakeryRows = bakeryList.map((b: BakeryGetApi, idx: number) => {
    return (
      <tr key={b.id}>
        <TdBakery>{idx + 1}</TdBakery>
        <TdBakery>{b.name}</TdBakery>
        <TdBakery>{b.address}</TdBakery>
        <TdBakery>
          <button 
            className={"map-bakery-detail-button-" + b.id} 
            role="button" 
            onClick={(e) => detailClick(e, b.id)}
          >
            See the Detail
          </button>
        </TdBakery>
      </tr>
    )
  });

  return (
    <TableBakery className="bakeriesTable">
      <tr>
        <ThBakery>No</ThBakery>
        <ThBakery>Name</ThBakery>
        <ThBakery>Address</ThBakery>
        <ThBakery>Detail</ThBakery>
      </tr>
      {bakeryRows}
    </TableBakery>
  );
}

export default MapBakeriesTable;
