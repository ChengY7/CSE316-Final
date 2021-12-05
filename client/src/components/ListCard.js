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
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import List from '@mui/material/List';
import CommentCard from './CommentCard'
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
     const { auth } = useContext(AuthContext);
     const [expandListActive, setExpandListActive] = useState(false);
    const { idNamePair } = props;
    let dateArray;
    if (idNamePair.publishedDate!==null) {
        dateArray = idNamePair.publishedDate.split("-");
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let date = dateArray[2].substring(0,2)
        date = date.replace("0", " ")
        let month = parseInt(dateArray[1])
        dateArray[2]=date;
        dateArray[1]=months[month-1]
    }

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }
    function toggleExpand() {
        let newExpandActive = !expandListActive;
        if (newExpandActive) {
            store.setIsExpandListActive();
        }
        setExpandListActive(newExpandActive);
    }
    function handleKeyPress(event) {
        if (event.code === "Enter") {
            store.addComment(event.target.id, event.target.value)
            event.currentTarget.value="";
        }
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }
    let commentElement;
    let cardElement =
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
                <Typography onClick={(event) => {handleLoadList(event, idNamePair._id)}} display="inline" style={{cursor:'pointer', position: "absolute", left: "14px", bottom: "10px", color: "#ff3331", textDecoration: "underline"}} variant="h0" sx={{fontWeight: 600, fontSize: 14}}>Edit</Typography>
                <Box sx={{ p: 1 }} style={{position: "absolute", right: "0px", top: "0"}} >
                    <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <DeleteOutlinedIcon style={{fontSize:'28pt'}} />
                    </IconButton>
                </Box>
                <Box sx={{ p: 0 }} style={{position: "absolute", right: "7px", bottom: "0"}} >
                    <IconButton  onClick={toggleExpand} aria-label='expand'>
                        <ExpandMoreIcon style={{fontSize:'28pt'}} />
                    </IconButton>
                </Box>
        </ListItem>
    if (expandListActive && idNamePair.publishedDate) {
        commentElement=
            <List sx={{ width: '90%', left: '5%'}}>
            {
                idNamePair.comments.map((comment) => (
                    <CommentCard 
                        comment={comment}
                    />
                ))
            }
            </List>;

        cardElement=
        <ListItem
        id={idNamePair._id}
        key={idNamePair._id}
        sx={{ marginTop: '15px', display: 'flex', p: 5, backgroundColor: "#d4d4f5", border: "1.5px solid black", padding: "175px", borderRadius: "10px", paddingRight: "1052px", position: "auto", right: "50px"}}
        style={{
            fontSize: '16pt',
            width: '100%',
            fontWeight: "bold",
        }}
    >
            <Box style={{position: "absolute", top: "0px", left: "5px"}} sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
            <Typography display="inline" style={{position: "absolute", left: "14px", top: "40px"}} variant="h0" sx={{fontWeight: 600, fontSize: 14}}>By:</Typography>
            <Typography display="inline" style={{position: "absolute", left: "40px", top: "40px", color: "#2f2efc", textDecoration: "underline"}} variant="h0" sx={{fontWeight: 600, fontSize: 14}}>{idNamePair.ownerUserName}</Typography>
            <Box style={{position: "absolute", top: "60px", left: "10px"}} sx={{backgroundColor:"#2c2f70", padding: "130px", borderRadius: "10px", paddingRight: "450px"}}>
                <Typography display="inline" style={{color: "#d3b036", position: "absolute", left: "14px", top: "20px"}} variant="h0" sx={{fontWeight: 600, fontSize: 24}}>1.</Typography>
                <Typography display="inline" style={{color: "#d3b036", position: "absolute", left: "50px", top: "20px"}} variant="h0" sx={{fontWeight: 600, fontSize: 24}}>{idNamePair.items[0]}</Typography>
                <Typography display="inline" style={{color: "#d3b036", position: "absolute", left: "14px", top: "70px"}} variant="h0" sx={{fontWeight: 600, fontSize: 24}}>2.</Typography>
                <Typography display="inline" style={{color: "#d3b036", position: "absolute", left: "50px", top: "70px"}} variant="h0" sx={{fontWeight: 600, fontSize: 24}}>{idNamePair.items[1]}</Typography>
                <Typography display="inline" style={{color: "#d3b036", position: "absolute", left: "14px", top: "120px"}} variant="h0" sx={{fontWeight: 600, fontSize: 24}}>3.</Typography>
                <Typography display="inline" style={{color: "#d3b036", position: "absolute", left: "50px", top: "120px"}} variant="h0" sx={{fontWeight: 600, fontSize: 24}}>{idNamePair.items[2]}</Typography>
                <Typography display="inline" style={{color: "#d3b036", position: "absolute", left: "14px", top: "170px"}} variant="h0" sx={{fontWeight: 600, fontSize: 24}}>4.</Typography>
                <Typography display="inline" style={{color: "#d3b036", position: "absolute", left: "50px", top: "170px"}} variant="h0" sx={{fontWeight: 600, fontSize: 24}}>{idNamePair.items[3]}</Typography>
                <Typography display="inline" style={{color: "#d3b036", position: "absolute", left: "14px", top: "220px"}} variant="h0" sx={{fontWeight: 600, fontSize: 24}}>5.</Typography>
                <Typography display="inline" style={{color: "#d3b036", position: "absolute", left: "50px", top: "220px"}} variant="h0" sx={{fontWeight: 600, fontSize: 24}}>{idNamePair.items[4]}</Typography>
            </Box>
            <Box style={{position: "absolute", top: "48px", left: "565px"}} sx={{ padding: "130px", borderRadius: "10px", paddingRight: "450px"}}>
                <div id="comment-list">
                {
                    commentElement
                }
                </div>
                <input id={idNamePair._id} onKeyPress={handleKeyPress} type="text" placeholder="Add Comment" style={{position: "absolute", left:"31px", top: "232.5px", width: "562px", fontSize: "16px", borderRadius: "10px", border: "none", padding:"10px"}}>
                </input>
            </Box>
            <Typography display="inline" style={{position: "absolute", left: "14px", bottom: "10px", color: "black"}} variant="h0" sx={{fontWeight: 600, fontSize: 14}}>published:</Typography>
            <Typography display="inline" style={{position: "absolute", left: "80px", bottom: "10px", color: "#69b15e"}} variant="h0" sx={{fontWeight: 600, fontSize: 14}}>{dateArray[1]+" "+dateArray[2]+", "+dateArray[0]}</Typography>
            <Typography display="inline" style={{position: "absolute", right: "234px", bottom:"10px" }} variant="h0" sx={{fontWeight: 600, fontSize: 14}}>Views:</Typography>
                <Typography display="inline" style={{position: "absolute", right: "210px", bottom:"10px", color:"#be413c" }} variant="h0" sx={{fontWeight: 600, fontSize: 14}}>{idNamePair.views}</Typography>
            <Typography display="inline" style={{position: "absolute", top: "25px", right: "205px"}} variant="h2" sx={{fontWeight: 600, fontSize: 20}}>{idNamePair.likes.length}</Typography>
                <Box sx={{ p: 1 }} style={{position: "absolute", right: "220px", top: "0"}}>
                    <IconButton aria-label='like'>
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
                <IconButton onClick={toggleExpand} aria-label='expand'>
                    <ExpandLessIcon style={{fontSize:'28pt'}} />
                </IconButton>
            </Box>
    </ListItem>
        
    }
    else if (expandListActive && !idNamePair.published) {
        cardElement=
        <ListItem
        id={idNamePair._id}
        key={idNamePair._id}
        sx={{ marginTop: '15px', display: 'flex', p: 5, backgroundColor: "#fffff1", border: "1.5px solid black", padding: "175px", borderRadius: "10px", paddingRight: "1052px", position: "auto", right: "50px"}}
        style={{
            fontSize: '16pt',
            width: '100%',
            fontWeight: "bold",
        }}
    >
            <Box style={{position: "absolute", top: "0px", left: "5px"}} sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
            <Typography display="inline" style={{position: "absolute", left: "14px", top: "40px"}} variant="h0" sx={{fontWeight: 600, fontSize: 14}}>By:</Typography>
            <Typography display="inline" style={{position: "absolute", left: "40px", top: "40px", color: "#2f2efc", textDecoration: "underline"}} variant="h0" sx={{fontWeight: 600, fontSize: 14}}>{idNamePair.ownerUserName}</Typography>
            <Typography onClick={(event) => {handleLoadList(event, idNamePair._id)}} display="inline" style={{cursor:'pointer', position: "absolute", left: "14px", bottom: "10px", color: "#ff3331", textDecoration: "underline"}} variant="h0" sx={{fontWeight: 600, fontSize: 14}}>Edit</Typography>
            <Box style={{position: "absolute", top: "60px", left: "10px"}} sx={{backgroundColor:"#2c2f70", padding: "130px", borderRadius: "10px", paddingRight: "450px"}}>
                <Typography display="inline" style={{color: "#d3b036", position: "absolute", left: "14px", top: "20px"}} variant="h0" sx={{fontWeight: 600, fontSize: 24}}>1.</Typography>
                <Typography display="inline" style={{color: "#d3b036", position: "absolute", left: "50px", top: "20px"}} variant="h0" sx={{fontWeight: 600, fontSize: 24}}>{idNamePair.items[0]}</Typography>
                <Typography display="inline" style={{color: "#d3b036", position: "absolute", left: "14px", top: "70px"}} variant="h0" sx={{fontWeight: 600, fontSize: 24}}>2.</Typography>
                <Typography display="inline" style={{color: "#d3b036", position: "absolute", left: "50px", top: "70px"}} variant="h0" sx={{fontWeight: 600, fontSize: 24}}>{idNamePair.items[1]}</Typography>
                <Typography display="inline" style={{color: "#d3b036", position: "absolute", left: "14px", top: "120px"}} variant="h0" sx={{fontWeight: 600, fontSize: 24}}>3.</Typography>
                <Typography display="inline" style={{color: "#d3b036", position: "absolute", left: "50px", top: "120px"}} variant="h0" sx={{fontWeight: 600, fontSize: 24}}>{idNamePair.items[2]}</Typography>
                <Typography display="inline" style={{color: "#d3b036", position: "absolute", left: "14px", top: "170px"}} variant="h0" sx={{fontWeight: 600, fontSize: 24}}>4.</Typography>
                <Typography display="inline" style={{color: "#d3b036", position: "absolute", left: "50px", top: "170px"}} variant="h0" sx={{fontWeight: 600, fontSize: 24}}>{idNamePair.items[3]}</Typography>
                <Typography display="inline" style={{color: "#d3b036", position: "absolute", left: "14px", top: "220px"}} variant="h0" sx={{fontWeight: 600, fontSize: 24}}>5.</Typography>
                <Typography display="inline" style={{color: "#d3b036", position: "absolute", left: "50px", top: "220px"}} variant="h0" sx={{fontWeight: 600, fontSize: 24}}>{idNamePair.items[4]}</Typography>
            </Box>
            <Box sx={{ p: 1 }} style={{position: "absolute", right: "0px", top: "0"}} >
                <IconButton onClick={(event) => {
                    handleDeleteList(event, idNamePair._id)
                }} aria-label='delete'>
                    <DeleteOutlinedIcon style={{fontSize:'28pt'}} />
                </IconButton>
            </Box>
            <Box sx={{ p: 0 }} style={{position: "absolute", right: "7px", bottom: "0"}} >
                <IconButton onClick={toggleExpand} aria-label='expand'>
                    <ExpandLessIcon style={{fontSize:'28pt'}} />
                </IconButton>
            </Box>
    </ListItem>

    }
    else if (idNamePair.published) {
        cardElement=
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
                <Typography display="inline" style={{position: "absolute", left: "14px", bottom: "10px", color: "black"}} variant="h0" sx={{fontWeight: 600, fontSize: 14}}>published:</Typography>
                <Typography display="inline" style={{position: "absolute", left: "80px", bottom: "10px", color: "#69b15e"}} variant="h0" sx={{fontWeight: 600, fontSize: 14}}>{dateArray[1]+" "+dateArray[2]+", "+dateArray[0]}</Typography>
                <Typography display="inline" style={{position: "absolute", right: "234px", bottom:"10px" }} variant="h0" sx={{fontWeight: 600, fontSize: 14}}>Views:</Typography>
                <Typography display="inline" style={{position: "absolute", right: "210px", bottom:"10px", color:"#be413c" }} variant="h0" sx={{fontWeight: 600, fontSize: 14}}>{idNamePair.views}</Typography>
                <Typography display="inline" style={{position: "absolute", top: "25px", right: "205px"}} variant="h2" sx={{fontWeight: 600, fontSize: 20}}>{idNamePair.likes.length}</Typography>
                <Box sx={{ p: 1 }} style={{position: "absolute", right: "220px", top: "0"}}>
                    <IconButton aria-label='like'>
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
                    <IconButton onClick={toggleExpand} aria-label='expand'>
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