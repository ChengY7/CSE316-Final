import { useContext } from 'react'
import HomeScreen from './HomeScreen'
import AllListScreen from './AllListScreen'
import UserScreen from './UserScreen'
import CommunityScreen from './CommunityScreen'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
    
    if (auth.loggedIn) {
        if (store.mode==="home") {
        
            return <HomeScreen />
        }
        else if (store.mode==="all") {
            return <AllListScreen />
        }
        else if (store.mode==="user") {
            return <UserScreen />
        }
        else if (store.mode=="community") {
            return <CommunityScreen />
        }
    }
    else
        return <SplashScreen />
}