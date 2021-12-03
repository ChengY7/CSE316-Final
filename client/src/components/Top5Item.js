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
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");

    function handleToggleEdit(event) {
        //console.log(auth.user.email)
        //console.log(store.currentList.ownerEmail)
        if (auth.user.email !== store.currentList.ownerEmail) {
            return
        }
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsItemEditActive();
        }
        setEditActive(newActive);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let index = event.target.id.substring("list-".length);
            let text = event.target.value;
            store.addUpdateItemTransaction(index-1, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    

    let { index } = props;

    let itemClass = "top5-item";

    let itemElement =
            <ListItem
                id={'item-' + (index+1)}
                key={props.key}
                className={itemClass}
                sx={{ display: 'flex', p: 1, backgroundColor: "#d3b036", borderRadius: "10px", marginTop: '10px', cursor: "pointer" }}
                style={{
                    fontSize: '38pt',
                    width: '100%'
                }}
            >
                <Box sx={{ p: 1, flexGrow: 1 }}>{props.text}</Box>
            </ListItem>
            if (editActive) {
                itemElement =
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id={"item-" + (index+1)}
                        label="Top 5 Item Name"
                        name="name"
                        autoComplete="Top 5 Item Name"
                        className='top5-item'
                        onKeyPress={handleKeyPress}
                        onChange={handleUpdateText}
                        defaultValue={props.text}
                        inputProps={{style: {fontSize: 48}}}
                        InputLabelProps={{style: {fontSize: 24}}}
                        autoFocus
                    />
            }
    return  (
        itemElement
    );
}

export default Top5Item;