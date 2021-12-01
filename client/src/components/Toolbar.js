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

    return (
        <div id="toolbar">
            <HomeOutlinedIcon style={{cursor:'pointer', padding: "10px"}} sx={{ fontSize: 50 }}/>
            <GroupsOutlinedIcon style={{cursor:'pointer', padding: "10px"}} sx={{ fontSize: 50 }}/>
            <PersonOutlineOutlinedIcon style={{cursor:'pointer', padding: "10px"}} sx={{ fontSize: 50 }}/>
            <FunctionsOutlinedIcon style={{cursor:'pointer', padding: "10px"}} sx={{ fontSize: 50 }}/>
            <input type="text" style={{position: "absolute", top: "17px", width: "500px"}}>
            </input>
            <Typography display="inline" style={{position: "absolute", right: "100px", top: "22px"}} variant="h2" sx={{fontWeight: 600, fontSize: 25}}>SORT BY</Typography>
            <SortIcon style={{position: "absolute", right: "10px", cursor:'pointer', padding: "10px"}} sx={{ fontSize: 50 }}/>
        </div>
    )
}

export default Toolbar;