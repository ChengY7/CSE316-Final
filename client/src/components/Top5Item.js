import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { AuthContext } from '../auth';
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(true);

    let { index } = props;

    let itemClass = "top5-item";
    function handleTempListInfo(event) {
        let id = event.target.id.substring("item-".length)
        console.log(event.target.value + ", "+ id)
        store.updateTempListInfo(event.target.value, id)
    }

    let itemElement =
        <TextField
            id={'item-' + (index+1)}
            key={props.key}
            className={itemClass}
            sx={{display: 'flex', marginTop:"10px", backgroundColor: "#d3b036", borderRadius: "10px"}}
            required
            onChange={(event) => {handleTempListInfo(event)}}
            fullWidth
            defaultValue={props.text}
            inputProps={{style: {fontSize: 26, fontWeight: "bold"}}}
            InputLabelProps={{style: {fontSize: 24}}}
            autoFocus
            />
            
    return  (
        itemElement
    );
}

export default Top5Item;