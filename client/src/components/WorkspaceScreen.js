import { useContext } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import Toolbar from './Toolbar.js';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    let listName="Null";
    // let url = window.location.href
    // if (url.length>10) {
    //     var id = url.substring(url.lastIndexOf('/') + 1);
    //     store.refresh(id);
    // }
    let editItems = "";
    if (store.currentList) {
        listName=store.currentList.name;
        editItems = 
            <List id="edit-items" sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    store.currentList.items.map((item, index) => (
                        <Top5Item 
                            key={'top5-item-' + (index+1)}
                            text={item}
                            index={index} 
                        />
                    ))
                }
            </List>;
    }
    return (
        <div id="top5-workspace">
            <Toolbar />
            <div id="workspace-edit">
                <div style={{cursor: "pointer", backgroundColor:"white", width:"480px", position:"absolute", top:"6px", height:"24px", left: "24px", fontSize:"20px", fontWeight: "bold", borderRadius: "2px"}}>{listName}</div>
                <button style={{position:"absolute", bottom:"12px", right:"190px", padding: "4px", width:"150px", fontSize:"30px", fontWeight: "bold"}}>
                    Save
                </button>
                <button style={{position:"absolute", bottom:"12px", right:"24px", padding: "4px", width:"150px", fontSize:"30px", fontWeight: "bold"}}>
                    Publish
                </button>
                <div id="dark-purple">
                    <div id="edit-numbering">
                        <div className="item-number" style={{backgroundColor: "#d3b036", borderRadius: "10px", marginTop: '10px'}}><Typography variant="h3">1.</Typography></div>
                        <div className="item-number" style={{backgroundColor: "#d3b036", borderRadius: "10px", marginTop: '10px'}}><Typography variant="h3">2.</Typography></div>
                        <div className="item-number" style={{backgroundColor: "#d3b036", borderRadius: "10px", marginTop: '10px'}}><Typography variant="h3">3.</Typography></div>
                        <div className="item-number" style={{backgroundColor: "#d3b036", borderRadius: "10px", marginTop: '10px'}}><Typography variant="h3">4.</Typography></div>
                        <div className="item-number" style={{backgroundColor: "#d3b036", borderRadius: "10px", marginTop: '10px'}}><Typography variant="h3">5.</Typography></div>
                    </div>
                </div>
                {editItems}
            </div>
        </div>
    )
}

export default WorkspaceScreen;