import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import List from '@mui/material/List';
import Toolbar from './Toolbar'

const AllListScreen = () => {
    const { store } = useContext(GlobalStoreContext)

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);
    let listCard = "";
    if (store && store.tempidNamePairs!==null) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: '#c4c4c4'}}>
            {
                store.tempidNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
                }
            </List>;
    }
    else if (store) {
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
        </div>
    )

}
export default AllListScreen;