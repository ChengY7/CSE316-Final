import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import { AuthContext } from '../auth';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Typography } from '@mui/material'
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
     const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair } = props;
    const dateArray = idNamePair.publishedDate.split("-");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let date = dateArray[2].substring(0,2)
    date = date.replace("0", " ")
    let month = parseInt(dateArray[1])
    dateArray[2]=date;
    dateArray[1]=months[month-1]

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 5, backgroundColor: "#d4d4f5", border: "1.5px solid black", padding: "48px", borderRadius: "10px", paddingRight: "1180px", position: "auto", right: "50px"}}
            style={{
                fontSize: '16pt',
                width: '100%',
                fontWeight: "bold",
            }}
        >
                <Box style={{position: "absolute", top: "0px", left: "5px"}} sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
                <Typography display="inline" style={{position: "absolute", left: "14px"}} variant="h0" sx={{fontWeight: 600, fontSize: 14}}>By:</Typography>
                <Typography display="inline" style={{position: "absolute", left: "40px", color: "#2f2efc", textDecoration: "underline"}} variant="h0" sx={{fontWeight: 600, fontSize: 14}}>{idNamePair.ownerUserName}</Typography>
                <Typography onClick={(event) => {handleLoadList(event, idNamePair._id)}} display="inline" style={{cursor:'pointer', position: "absolute", left: "14px", bottom: "10px", color: "#ff3331", textDecoration: "underline"}} variant="h0" sx={{fontWeight: 600, fontSize: 14}}>Edit</Typography>
                <Typography display="inline" style={{position: "absolute", right: "234px", bottom:"10px" }} variant="h0" sx={{fontWeight: 600, fontSize: 14}}>Views:</Typography>
                <Typography display="inline" style={{position: "absolute", right: "210px", bottom:"10px", color:"#be413c" }} variant="h0" sx={{fontWeight: 600, fontSize: 14}}>{idNamePair.views}</Typography>
                <Typography display="inline" style={{position: "absolute", top: "25px", right: "205px"}} variant="h2" sx={{fontWeight: 600, fontSize: 20}}>{idNamePair.likes.length}</Typography>
                <Box sx={{ p: 1 }} style={{position: "absolute", right: "220px", top: "0"}}>
                    <IconButton onClick={handleToggleEdit} aria-label='like'>
                        <ThumbUpOutlinedIcon style={{fontSize:'28pt'}} />
                    </IconButton>
                </Box>
                <Typography display="inline" style={{position: "absolute", top: "25px", right: "90px"}} variant="h2" sx={{fontWeight: 600, fontSize: 20}}>{idNamePair.dislikes.length}</Typography>
                <Box sx={{ p: 1 }} style={{position: "absolute", right: "105px", top: "0"}} >
                    <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='dislike'>
                        <ThumbDownOutlinedIcon style={{fontSize:'28pt'}} />
                    </IconButton>
                </Box>
                <Box sx={{ p: 1 }} style={{position: "absolute", right: "0px", top: "0"}} >
                    <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <DeleteOutlinedIcon style={{fontSize:'28pt'}} />
                    </IconButton>
                </Box>
                <Box sx={{ p: 0 }} style={{position: "absolute", right: "7px", bottom: "0"}} >
                    <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='expand'>
                        <ExpandMoreIcon style={{fontSize:'28pt'}} />
                    </IconButton>
                </Box>
        </ListItem>

    if (idNamePair.published) {
        cardElement=
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 5, backgroundColor: "#fffff1", border: "1.5px solid black", padding: "48px", borderRadius: "10px", paddingRight: "1180px", position: "auto", right: "50px"}}
            style={{
                fontSize: '16pt',
                width: '100%',
                fontWeight: "bold",
            }}
        >
                <Box style={{position: "absolute", top: "0px", left: "5px"}} sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
                <Typography display="inline" style={{position: "absolute", left: "14px"}} variant="h0" sx={{fontWeight: 600, fontSize: 14}}>By:</Typography>
                <Typography display="inline" style={{position: "absolute", left: "40px", color: "#2f2efc", textDecoration: "underline"}} variant="h0" sx={{fontWeight: 600, fontSize: 14}}>{idNamePair.ownerUserName}</Typography>
                <Typography display="inline" style={{position: "absolute", left: "14px", bottom: "10px", color: "black"}} variant="h0" sx={{fontWeight: 600, fontSize: 14}}>published:</Typography>
                <Typography display="inline" style={{position: "absolute", left: "80px", bottom: "10px", color: "#69b15e"}} variant="h0" sx={{fontWeight: 600, fontSize: 14}}>{dateArray[1]+" "+dateArray[2]+", "+dateArray[0]}</Typography>
                <Typography display="inline" style={{position: "absolute", right: "234px", bottom:"10px" }} variant="h0" sx={{fontWeight: 600, fontSize: 14}}>Views:</Typography>
                <Typography display="inline" style={{position: "absolute", right: "210px", bottom:"10px", color:"#be413c" }} variant="h0" sx={{fontWeight: 600, fontSize: 14}}>{idNamePair.views}</Typography>
                <Typography display="inline" style={{position: "absolute", top: "25px", right: "205px"}} variant="h2" sx={{fontWeight: 600, fontSize: 20}}>{idNamePair.likes.length}</Typography>
                <Box sx={{ p: 1 }} style={{position: "absolute", right: "220px", top: "0"}}>
                    <IconButton onClick={handleToggleEdit} aria-label='like'>
                        <ThumbUpOutlinedIcon style={{fontSize:'28pt'}} />
                    </IconButton>
                </Box>
                <Typography display="inline" style={{position: "absolute", top: "25px", right: "90px"}} variant="h2" sx={{fontWeight: 600, fontSize: 20}}>{idNamePair.dislikes.length}</Typography>
                <Box sx={{ p: 1 }} style={{position: "absolute", right: "105px", top: "0"}} >
                    <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='dislike'>
                        <ThumbDownOutlinedIcon style={{fontSize:'28pt'}} />
                    </IconButton>
                </Box>
                <Box sx={{ p: 1 }} style={{position: "absolute", right: "0px", top: "0"}} >
                    <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <DeleteOutlinedIcon style={{fontSize:'28pt'}} />
                    </IconButton>
                </Box>
                <Box sx={{ p: 0 }} style={{position: "absolute", right: "7px", bottom: "0"}} >
                    <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='expand'>
                        <ExpandMoreIcon style={{fontSize:'28pt'}} />
                    </IconButton>
                </Box>
        </ListItem>
    }

    return (
        cardElement
    );
}

export default ListCard;