import React, { useState, useRef, useEffect } from 'react'
import './App.css'
import { BakeryGetApi } from './types/TypeBakeryGetApi'
import BakeryRow from './bakery/bakeryList/BakeryRow'
import { BakeryDescription } from './types/TypeBakeryDescription'
import { BakeryData } from './types/TypeBakeryData';
import { Form } from './types/TypeForm';
import BakerySearchDialog from './bakery/bakeryList/BakerySearchDialog'
import { addMonths, addDays } from 'date-fns'
import ReactModal from 'react-modal';
import { createTheme, useTheme, ThemeProvider, styled } from '@mui/material/styles';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom'
import Map from './map/Map'
import BakeryList from './bakery/BakeryList'
import TopBar from './map/TopBar/TopBar'

ReactModal.setAppElement("#root");

const BodyLinkList = styled('div')({
  backgroundColor: "#fff", 
  margin: "100px 0px",
  height: "50px",
  display: "flex",
})

const BodyApp = styled('body')({
  position: 'absolute',
  width: '100%',
  margin: '80px 0px',  
  display: 'flex',
  justifyContent: 'center',
})

const App = () => {
  return (  
    <div className="App">
      <header>
        <TopBar />   
      </header>
      <BodyApp>
        {/* <BodyLinkList>
          <Link to={"/bakeryList"} className="css-app-link-bakeryList">
            BakeryList
          </Link>
        </BodyLinkList> */}
        <Routes>
          <Route path="/bakeryList" element={<BakeryList />} />
          <Route path="/bakeryList/map" element={<Map />} />
        </Routes>
      </BodyApp>
    </div>
  )
}

export default App
