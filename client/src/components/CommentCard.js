import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import { AuthContext } from '../auth';
import ListItem from '@mui/material/ListItem';
import {Typography } from '@mui/material'

function CommentCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const {comment } = props;
    let firstIndex = comment.indexOf(" ")
    let userName = comment.substring(0, firstIndex)
    firstIndex++;
    let userComment = comment.substring(firstIndex)
    console.log(userName)
    console.log(userComment)
    let commentCard=
    <ListItem
        sx={{marginTop:"5px", backgroundColor:"#d3b036", display:"flex", border: "1.5px solid black", padding: "33px", borderRadius: "10px"}}
    >
        <Typography display="inline" style={{position: "absolute", left: "8px", top: "4px", color: "#1713e8", textDecoration: "underline"}} variant="h0" sx={{fontWeight: 600, fontSize: 11}}>{userName}</Typography>
        <Typography display="inline" style={{position: "absolute", left: "8px", top: "18px"}} variant="h0" sx={{fontSize: 14}}>{userComment}</Typography>
    </ListItem>

    return (
        commentCard
    );
}
export default CommentCard;