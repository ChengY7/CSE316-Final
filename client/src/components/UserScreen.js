import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import List from '@mui/material/List';
import Toolbar from './Toolbar'

const UserScreen = () => {
    const { store } = useContext(GlobalStoreContext)

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    return (
        <div>
            <Toolbar />
            <div>User</div>
        </div>
    )

}
export default UserScreen;