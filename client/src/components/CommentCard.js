import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import { AuthContext } from '../auth';
import ListItem from '@mui/material/ListItem';
import {Typography } from '@mui/material'

function CommentCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const {comment } = props;
    let commentCard=
    <ListItem
        sx={{marginTop:"5px", backgroundColor:"#d3b036", display:"flex", border: "1.5px solid black", padding: "33px", borderRadius: "10px"}}
    >
        <Typography display="inline" style={{position: "absolute", left: "14px"}} variant="h0" sx={{fontWeight: 600, fontSize: 14}}>{comment}</Typography>
    </ListItem>

    return (
        commentCard
    );
}
export default CommentCard;