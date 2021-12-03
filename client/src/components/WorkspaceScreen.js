import { useContext } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import Toolbar from './Toolbar.js';
import TextField from '@mui/material/TextField';
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
    function handleSaveList(event) {
        let id = event.target.id.substring("list-".length);
        store.UpdateList(id);
    }
    function handleTempListInfo(event) {
        store.updateTempListInfo(event.target.value, 0)
    }
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
                <input onChange={(event) => {handleTempListInfo(event)}} type="text" defaultValue={listName} style={{width:"480px", position:"absolute", top:"5px", height:"20px", left: "24px", fontSize:"20px", fontWeight: "bold"}}></input>
                <button onClick={(event) => {handleSaveList(event)}} style={{position:"absolute", bottom:"12px", right:"190px", padding: "4px", width:"150px", fontSize:"30px", fontWeight: "bold"}}>
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