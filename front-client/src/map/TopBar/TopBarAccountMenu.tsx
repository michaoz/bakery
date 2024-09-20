import React, {useState, useMemo, useEffect} from 'react';
import '../Map.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { PropsTypeAccountMenu } from '../../types/PropsTypeAccountMenu';

// TopBarからのProps
type AccountMenuProps = {
    propsAnchorEl: null | HTMLElement;
    handleProfileMenuClose: () => void; // switching menu-state to 'close'
}

export const AccountMenu = (propsAccountMenu: PropsTypeAccountMenu) => {
    // get params from Props
    const { propsAnchorEl, handleProfileMenuClose } = propsAccountMenu

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(propsAnchorEl);

    const isMenuOpen = Boolean(anchorEl);
    const accountMenuId = 'account-menu';

    useEffect(() => {
        setAnchorEl(propsAnchorEl)
    }, [propsAnchorEl])

    return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ // ポップアップの位置
                vertical: 'center',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleProfileMenuClose}
        >
            <MenuItem>Profile</MenuItem>
            <MenuItem>Account Info</MenuItem>
        </Menu>
    );
}