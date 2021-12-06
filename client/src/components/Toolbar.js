import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CloseIcon from '@mui/icons-material/HighlightOff';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';
import SortIcon from '@mui/icons-material/Sort';
import { Typography } from '@mui/material'

function Toolbar() {
    const { store } = useContext(GlobalStoreContext);
    function handleHome() {
        store.changeMode("home")
        let button = document.getElementById("search-bar");
        button.value="";
    }
    function handleGroup() {
        store.changeMode("all")
        let button = document.getElementById("search-bar");
        button.value="";
    }
    function handleUser() {
        store.changeMode("user")
        let button = document.getElementById("search-bar");
        button.value="";
    }
    function handleCommunity() {
        store.changeMode("community")
        let button = document.getElementById("search-bar");
        button.value="";
    }
    function handleSearch(event) {
        store.search(event.target.value);
    }
    return (
        <div id="toolbar">
            <HomeOutlinedIcon onClick={handleHome} id="home-button" style={{cursor:'pointer', padding: "10px"}} sx={{ fontSize: 50 }}/>
            <GroupsOutlinedIcon onClick={handleGroup} id="group-button" style={{cursor:'pointer', padding: "10px"}} sx={{ fontSize: 50 }}/>
            <PersonOutlineOutlinedIcon onClick={handleUser} id="person-button" style={{cursor:'pointer', padding: "10px"}} sx={{ fontSize: 50 }}/>
            <FunctionsOutlinedIcon onClick={handleCommunity} id="community-button" style={{cursor:'pointer', padding: "10px"}} sx={{ fontSize: 50 }}/>
            <input onChange={(event) => {handleSearch(event)}} id="search-bar" type="text" placeholder="Search" style={{position: "absolute", top: "17px", width: "500px", fontSize: "24px"}}>
            </input>
            <Typography id="sort-by" display="inline" style={{position: "absolute", right: "100px", top: "22px"}} variant="h2" sx={{fontWeight: 600, fontSize: 25}}>SORT BY</Typography>
            <SortIcon id="sort-button" style={{position: "absolute", right: "10px", cursor:'pointer', padding: "10px"}} sx={{ fontSize: 50 }}/>
        </div>
    )
}

export default Toolbar;