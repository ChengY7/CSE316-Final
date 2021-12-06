import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import DeleteModal from './DeleteModal';
import Toolbar from './Toolbar'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);
    function handleCreateNewList() {
        store.createNewList();
    }
    
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: '#c4c4c4'}}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            <DeleteModal />
            </List>;
    }
    return (
        <div id="top5-list-selector">
            <Toolbar />
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
        </div>)
}

export default HomeScreen;