import React, {useState, useMemo} from 'react';
import '../../css/Map.css';
//import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
//import Leaflet from 'leaflet'
import "leaflet/dist/leaflet.css";
import Box from '@mui/material/Box'
//import { borderRadius } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import { Toolbar } from '@mui/material';
//import { useTheme, ThemeProvider } from "@material-ui/styles";
import { alpha, createTheme, useTheme, ThemeProvider, styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
//import Menu from '@mui/material/Menu';
//import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AccountMenu } from './TopBarAccountMenu'
import { LeftMenuDrawer } from './TopBarLeftMenuDrawer'

/**CSS *******************************************/
/*
const DrawerHeader = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  })
*/
/*  
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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {backgroundColor: alpha(theme.palette.common.white, 0.25),},
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {marginLeft: theme.spacing(3), width: 'auto',},
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute', 
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '200%',
    [theme.breakpoints.up('md')]: { width: '20ch', },
  },
}))

/**CSS *******************************************/
  
/**type *******************************************/
// Appからのprops
/*
type AccountMenuAnchorElProps = {
  propAnchorEl: null | HTMLElement;
}
*/
type Anchor = "top" | "left" | "bottom" | "right";
/**type *******************************************/

//const TopBar = (props: AccountMenuAnchorElProps) => {
const TopBar = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [drawerAnchor, setDrawerAnchor] = useState({
      top: false,
      left: false,
      bottom: false,
      right: false
    });    


    const isOpen = Boolean(anchorEl).toString();

    //const position = [35.681, 139.767];

    const handleProfileMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(e.currentTarget);
    };
    const handleProfileMenuClose = () => {
      setAnchorEl(null)
    };
    // Drawerのopen/closeがいっぺんにできる関数
    const toggleDrawer = (anchor: Anchor, open: boolean) => (
      e: React.KeyboardEvent | React.MouseEvent) => {
      // Tab, Shiftキーボードを使う場合は何もしない（Drawerを閉じない）
      if (e.type === "keydown" && ((e as React.KeyboardEvent).key === "Tab" || (e as React.KeyboardEvent).key === "Shift")) {
          return 
      }
      setDrawerAnchor({ ...drawerAnchor, [anchor]: open })
    }

    /*********************************/
    /**Props btw Parent and Children */
    // To AccountMenu
    var propsAccountMenu = {
      propsAnchorEl: anchorEl,
      handleProfileMenuClose: handleProfileMenuClose,
    }
    var propsLeftMenu = {
      isLeftOpen: drawerAnchor.left,
      toggleDrawer: toggleDrawer,
    }
    /*********************************/

    return (
        <Box className="TopBar">
            <AppBar position='fixed'>
                <Toolbar className='toolbar' style={{height: '60px'}}>
                  <IconButton 
                    area-label='menu' 
                    size='large' 
                    edge='start' 
                    color='default'
                    onClick={toggleDrawer('left', true)}
                  >
                    <MenuIcon/>
                  </IconButton>
                  <LeftMenuDrawer {...propsLeftMenu}/>
                  <Typography>MUI</Typography>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon/>
                    </SearchIconWrapper>
                    <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }}/>
                  </Search>
                  <Box sx={{flexGrow: 1}}/>
                  <Box sx={{display: {xs:'none', md: 'flex'}}}>
                    <IconButton aria-label="new notifications" size="large">
                      <Badge badgeContent={4} color="error">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                    <IconButton 
                      aria-label="account" 
                      size="large" 
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                    >
                      <AccountCircle />
                    </IconButton>
                    <AccountMenu {...propsAccountMenu}/>
                    <IconButton aria-label="moreVert" size="large" aria-haspopup="true">
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default TopBar;
