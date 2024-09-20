import React, { useState } from 'react';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import { Grid, Paper, Fade, Box, Button, IconButton, Popper, Collapse } from '@mui/material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { typeSelectedShop } from '../../types/TypeSelectedShop';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";


// TopBarからのProps
type ShopProps = {
    selectedShop: typeSelectedShop["selected"];
    shopGroups: typeSelectedShop["groups"];
    selectedGroupedShops: typeSelectedShop["selectedGrouped"];
}

// The Toggle Box at the bottom left
const LocationPopper = (props: ShopProps) => {
    //const [shopGroups, setShopGroups] = useState(props);
    const { selectedShop, shopGroups, selectedGroupedShops } = props;
    
    // const [shopGroupsDict, setShopGroupsDict] = useState<{[key: string]: {[key: string]: string|boolean|string[]}}>(shopGroups.shopGroups);
    const [shopGroupsDict, setShopGroupsDict] = useState<typeSelectedShop["groups"]["shopGroups"]>(shopGroups.shopGroups);
    // const shopGroupsList =  [shopGroups.shopGroups.fav, shopGroups.shopGroups.tg];    
    const [e, setE] = useState<HTMLDivElement | MouseEvent>();
    const [open, setOpen] = useState<boolean>(false);
    const [openExpandFav, setOpenExpandFav] = useState<boolean>(false);
    const [openExpandTag, setOpenExpandTag] = useState<boolean>(false);
    const [openExpand, setOpenExpand] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorEla, setAnchorEla] = useState<null | HTMLElement>(null);

    const handleLocationPopperClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        // setOpen(!open);  // 現ステータスと逆の設定に切り替え：-> openの更新にラグがある場合、更新前の値を参照してしまう事があるのでprevStateを使う方が良い。
        setOpen(prevState => !prevState);  // 現ステータスと逆の設定に切り替え
    }
    const handleOpenExpand = () => {
        //setAnchorEla(event.currentTarget);
        // setOpenExpand(!openExpand);  // 現ステータスと逆の設定に切り替え：-> openExpandの更新にラグがある場合、更新前の値を参照してしまう事があるのでprevStateを使う方が良い。
        setOpenExpand(prevState => !prevState);  // 現ステータスと逆の設定に切り替え
    }
    const handleOpenExpandFav = () => {
        //setAnchorEla(event.currentTarget);
        // setOpenExpand(!openExpand);  // 現ステータスと逆の設定に切り替え：-> openExpandの更新にラグがある場合、更新前の値を参照してしまう事があるのでprevStateを使う方が良い。
        setOpenExpandFav(prevState => !prevState);  // 現ステータスと逆の設定に切り替え
    }
    const handleOpenExpandTag = () => {
        //setAnchorEla(event.currentTarget);
        // setOpenExpand(!openExpand);  // 現ステータスと逆の設定に切り替え：-> openExpandの更新にラグがある場合、更新前の値を参照してしまう事があるのでprevStateを使う方が良い。
        setOpenExpandTag(prevState => !prevState);  // 現ステータスと逆の設定に切り替え
    }
    const handlePopperElmClick = (shopGroupsKey: string) => {
    // const handlePopperElmClick = (openFlg: boolean) => {
    // const handlePopperElmClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // const handlePopperElmClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        
        // 値渡し
        const shopGroupsforUpdate = {...shopGroups.shopGroups};
        // var key: string = val.title.toString();
        switch (shopGroupsKey) {
            // イベントでhandleOpenExpandとhandlePopperElmClickは両方呼ばれている
            // イベントの呼び出し関数を全て完了しないと、各関数の処理が完全に反映されない。
            // -> handleOpenExpandのopenExpand更新処理はこの時点では完了していないため、前のopenExpandを参照してしまう。
            // -> !openExpandで対処
            case "fav":
                shopGroupsforUpdate.fav.openFlg = !openExpandFav;
                break;
            case "tag":
                shopGroupsforUpdate.tag.openFlg = !openExpandTag;
                break;
        }
        setShopGroupsDict(shopGroupsforUpdate);
    }
    const [op, setOp] = useState({});
    const handleClick = (val: string) => {
        setOp(op => ({ ...op, val: 'AAA'}));
    };

    type typeOfKeyOfShopGroupsDict = keyof typeof shopGroupsDict;
    
    return (
        <Box sx={{ width: 64, height: 47 }}>
            <Popper className='point-location-popper' open={open} anchorEl={anchorEl} placement='top-start' transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper elevation={3}>
                            {Object.keys(shopGroupsDict).map((shopGroupsKey: string, idx: number) => {
                                // shopGroupsKeyの型がstringだと、shopGroupsDict[shopGroupsKey]した際にstringはindexにできないとエラーになる
                                // -> × .map((shopGroupsKey: keyof typeof shopGroupsDict・・・) は、Object.keys(***).mapが第一引数でstring以外指定できなさそうなのでダメ
                                // -> ○ shopGroupsDictのキーの型を定義し、shopGroupsKeyを使用する際に明示する。
                                const typeDefinedShopGroupsKey = shopGroupsKey as typeOfKeyOfShopGroupsDict;
                                return (    
                                    <List key={shopGroupsKey} className="paperList">
                                        <ListItemButton onClick={() => {shopGroupsKey === 'fav' ? handleOpenExpandFav() : handleOpenExpandTag();handlePopperElmClick(shopGroupsKey)}}>
                                        {/* <ListItemButton onClick={() => handlePopperElmClick(val.openFlg)}> */}
                                            <ListItemText primary={shopGroupsDict[typeDefinedShopGroupsKey].title} />
                                            {/*openExpand ? <ExpandMore /> : <ExpandLess />*/}
                                            {shopGroupsDict[typeDefinedShopGroupsKey].openFlg ? <ExpandMore /> : <ExpandLess />}
                                        </ListItemButton>
                                        {/*<Collapse in={openExpand} timeout="auto">*/}
                                        <Collapse in={Boolean(shopGroupsDict[typeDefinedShopGroupsKey].openFlg)} timeout="auto">
                                            <List component="div">
                                                {(shopGroupsDict[typeDefinedShopGroupsKey].list).map((val: string, listIdx: number) => {
                                                    const shopListKey = `${shopGroupsKey}_${val}-${listIdx.toString()}`;
                                                    return (
                                                        <ListItemButton sx={{ pl: 4 }} key={shopListKey} className="listShow">
                                                            <ListItemText primary={`item:${val}`} />
                                                        </ListItemButton>
                                                    )
                                                })};
                                            </List>
                                        </Collapse>
                                    </List>
                                );
                            })};
                        </Paper>
                    </Fade>
                )}
            </Popper>
            <Grid container className='point-location-icon' justify-content='center'>
                <Grid item xs={12}>
                    <Paper elevation={3} className='point-location-paper'>
                        <Button onClick={handleLocationPopperClick}>
                            <AddLocationAltIcon color='primary' fontSize="large"/>
                        </Button>
                    </Paper>
                </Grid>

            </Grid>
        </Box>
    );
};

export default LocationPopper;