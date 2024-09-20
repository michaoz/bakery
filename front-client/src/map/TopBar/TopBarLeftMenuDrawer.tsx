import React, {useState, useMemo, useEffect} from 'react';
import '../Map.css';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { List, ListItem, ListItemText } from '@mui/material/';
import Divider from "@mui/material/Divider";

type Anchor = "left";
type LeftMenuProps = {
    isLeftOpen: boolean;
    toggleDrawer: (anchor: "left", open: boolean) => (
        e: React.KeyboardEvent | React.MouseEvent) => void;
}

const leftMenuListTop: string[] = ['Main Menu', 'Favourite', 'History']
const leftMenuListBottom: string[] = ['Category', 'Ranking', 'Help']

export const LeftMenuDrawer = (propsLeftMenu: LeftMenuProps) => {
    // Props
    const { isLeftOpen, toggleDrawer } = propsLeftMenu

    ////////////////////////////////////

    const menuContent = (anchor: Anchor) => {

        return (    
            <Box 
                sx={{width: 250}}
            >
                <List>
                    {leftMenuListTop.map((text: string, index: number) => (
                        <ListItem key={index}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {leftMenuListBottom.map((text, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Box>  
        );
    }
    
    return (
        <div>
            <Drawer
                anchor={"left"}
                open={isLeftOpen}
                onClose={toggleDrawer("left", false)}
            >
                {menuContent("left")}
            </Drawer>
        </div>
    );
}