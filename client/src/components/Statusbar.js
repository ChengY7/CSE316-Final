import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import { BackdropRoot, Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    function handleCreateNewList() {
        store.createNewList();
    }
    let text ="";
    let bar = "";
    if (store.currentList)
        text = store.currentList.name;
    let button=document.getElementById("search-bar");
    let name;
    if (button!==null) {
        name = button.value+" ";
    }
    if (store.mode==="home") {
        bar=
        <div id="top5-statusbar">
            <div onClick={handleCreateNewList} style={{cursor:'pointer'}}>
                <AddIcon sx={{ fontSize: 75 }}/>
            </div>
                <Typography variant="h2" sx={{fontWeight: 400, fontSize: 50}}>Your Lists</Typography>
        </div>
    }
    else {
        bar=
        <div id="top5-statusbar">
                <Typography variant="h2" sx={{fontWeight: 400, fontSize: 50}}>{name}Lists</Typography>
        </div>
    }
    return (
        bar
    );
}

export default Statusbar;