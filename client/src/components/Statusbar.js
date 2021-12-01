import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    function handleCreateNewList() {
        store.createNewList();
    }
    let text ="";
    if (store.currentList)
        text = store.currentList.name;
    return (
        <div id="top5-statusbar">
            <div onClick={handleCreateNewList} style={{cursor:'pointer'}}>
                <AddIcon sx={{ fontSize: 75 }}/>
            </div>
                <Typography variant="h2" sx={{fontWeight: 400, fontSize: 50}}>Your Lists</Typography>
        </div>
    );
}

export default Statusbar;