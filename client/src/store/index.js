import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    UPDATE_TEMP_LIST_INFO: "UPDATE_TEMP_LIST_INFO",
    SET_EXPAND_LIST_ACTIVE: "SET_EXPAND_LIST_ACTIVE",
    CHANGE_MODE: "CHANGE_MODE",
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        listMarkedForDeletion: null,
        tempListInfo: [],
        isExpandListActive: false,
        mode: "home",
    });
    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.top5List,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    tempListInfo: store.tempListInfo,
                    isExpandListActive: store.isExpandListActive,
                    mode: store.mode,
                });
            }
            case GlobalStoreActionType.UPDATE_TEMP_LIST_INFO: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    tempListInfo: payload,
                    isExpandListActive: false,
                    mode: store.mode,
                })
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    tempListInfo:[],
                    isExpandListActive: false,
                    mode: store.mode,
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload.newList,
                    newListCounter: store.newListCounter + 1,
                    listMarkedForDeletion: null,
                    tempListInfo: payload.tempListInfo,
                    isExpandListActive: false,
                    mode: store.mode,
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    tempListInfo: [],
                    isExpandListActive: false,
                    mode: store.mode,
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: payload,
                    tempListInfo: [],
                    isExpandListActive: false,
                    mode: store.mode,
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    tempListInfo: [],
                    isExpandListActive: false,
                    mode: store.mode,
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload.top5List,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    tempListInfo: payload.tempListInfo,
                    isExpandListActive: false,
                    mode: store.mode,
                });
            }
            case GlobalStoreActionType.SET_EXPAND_LIST_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    tempListInfo: [],
                    isExpandListActive: true,
                    mode: store.mode,
                });
            }
            case GlobalStoreActionType.CHANGE_MODE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    tempListInfo: store.tempListInfo,
                    isExpandListActive: store.isExpandListActive,
                    mode: payload,
                })
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeMode = async function (mode) {
        storeReducer({
            type: GlobalStoreActionType.CHANGE_MODE,
            payload: mode
        });
    }
    store.setIsExpandListActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_EXPAND_LIST_ACTIVE,
            payload: null
        });
    }
    store.UpdateList = async function () {
        console.log(store.tempListInfo)
            for (let i=0; i<5; i++) {
                if(store.currentList.items[i]!==store.tempListInfo[i+1]) {
                    store.updateItem(i, store.tempListInfo[i+1]);
                }
            }
                if(store.currentList.name!==store.tempListInfo[0]) {
                    store.currentList.name=store.tempListInfo[0];
                }
                store.updateCurrentList();
                store.closeCurrentList();
    }
    store.PublishList = async function () {
        store.UpdateList().then(() => {
            store.currentList.published=true;
            store.currentList.publishedDate = new Date();
            store.currentList.comments = [];
            store.updateCurrentList();
        })
    }
    store.like = async function (id, username) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            let likes = top5List.likes;
            let dislikes = top5List.dislikes;
            for (let i=0; i<dislikes.length; i++) {
                if(dislikes[i]===username) {
                    dislikes.splice(i, 1);
                    break;
                }
            }
            for (let i=0; i<likes.length; i++) {
                if(likes[i]===username) {
                    return;
                }
            }
            likes.push(username);
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.sucess) {
                    async function getListPairs(top5List) {
                        const response = await api.getTop5ListPairs();
                        if (response.data.sucess) {
                            let pairsArray = response.data.idNamePairs;
                            storeReducer({
                                type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                payload: {
                                    idNamePairs: pairsArray,
                                    top5List: top5List
                                }
                            });
                        }
                    }
                    getListPairs(top5List);
                }
            }
            updateList(top5List);
        }
    }
    store.dislike = async function (id, username) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            let likes = top5List.likes;
            let dislikes = top5List.dislikes;
            for (let i=0; i<likes.length; i++) {
                if(likes[i]===username) {
                    likes.splice(i, 1);
                    break;
                }
            }
            for (let i=0; i<dislikes.length; i++) {
                if(dislikes[i]===username) {
                    return;
                }
            }
            dislikes.push(username);
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.sucess) {
                    async function getListPairs(top5List) {
                        const response = await api.getTop5ListPairs();
                        if (response.data.sucess) {
                            let pairsArray = response.data.idNamePairs;
                            storeReducer({
                                type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                payload: {
                                    idNamePairs: pairsArray,
                                    top5List: top5List
                                }
                            });
                        }
                    }
                    getListPairs(top5List);
                }
            }
            updateList(top5List);
        }
    }
    store.addComment = async function (id, comment) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.comments.push(comment);
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.sucess) {
                    async function getListPairs(top5List) {
                        const response = await api.getTop5ListPairs();
                        if (response.data.sucess) {
                            let pairsArray = response.data.idNamePairs;
                            storeReducer({
                                type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                payload: {
                                    idNamePairs: pairsArray,
                                    top5List: top5List
                                }
                            });
                        }
                    }
                    getListPairs(top5List);
                }
            }
            updateList(top5List);
        }
       
        
    }
    
    store.changeListName = async function (id, newName) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            if (top5List.ownerEmail !== auth.user.email) {
                return
            }
            top5List.name = newName;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    async function getListPairs(top5List) {
                        const response = await api.getTop5ListPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.idNamePairs;
                            let newPairsArray=[];
                            for (let i = 0; i<pairsArray.length; i++) {
                                if (pairsArray[i].ownerEmail===auth.user.email) {
                                newPairsArray.push(pairsArray[i]);
                                }
                            }
                            //store.loadIdNamePairs();
                            storeReducer({
                                type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                payload: {
                                    idNamePairs: newPairsArray,
                                    top5List: top5List
                                }
                            });
                        }
                    }
                    getListPairs(top5List);
                }
            }
            updateList(top5List);
        }
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = async function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        
        history.push("/");
        let button = document.getElementById("toolbar");
        button.style.opacity="100%";
        button.style.pointerEvents="auto";
        let button8 = document.getElementById("top5-statusbar");
        button8.style.opacity="100%";
        button8.style.pointerEvents="auto";
    }
    store.checkDuplicates = function (array) {
        for (let i=1; i<array.length; i++) {
            let temp = array[i];
            let tempArray = array.slice();
            tempArray=tempArray.map(name => name.toLowerCase())
            tempArray.splice(i, 1);
            if (tempArray.includes(temp.toLowerCase())) {
                return true;
            }
        }
        return false;
    }
    store.updateTempListInfo = async function (text, index) {
        let currentTempListInfo = store.tempListInfo;
        currentTempListInfo[index]=text;
        storeReducer({
            type: GlobalStoreActionType.UPDATE_TEMP_LIST_INFO,
            payload: currentTempListInfo
        })
        let publishable = true;
        for (let i=0; i<store.idNamePairs.length; i++) {
            if (store.idNamePairs[i]._id!==store.currentList._id && store.idNamePairs[i].published) {
                if (store.idNamePairs[i].name.toLowerCase()===store.tempListInfo[0].toLowerCase()) {
                    publishable = false;
                    break;
                }
            }
        }
        if (store.checkDuplicates(store.tempListInfo)) {
            publishable = false;
        }
        for (let j=0; j<6; j++) {
            if(store.tempListInfo[j]==="" || !store.tempListInfo[j].charAt(0).match(/^[0-9a-z]+$/i)) {
                publishable = false;
                break;
            }
        }
        if (publishable===false) {
            let button = document.getElementById("publish-button");
            button.style.opacity="20%";
            button.style.pointerEvents="none";
        }
        else {
            let button = document.getElementById("publish-button");
            button.style.opacity="100%";
            button.style.pointerEvents="auto";
        }
    }
    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        let payload = {
            name: newListName,
            items: ["?", "?", "?", "?", "?"],
            ownerEmail: auth.user.email,
            ownerUserName: auth.user.userName,
            likes: [],
            dislikes: [],
            views: "0",
            date: new Date(),
            published: false,
            publishedDate: null,
            comments: null,
        };
        const response = await api.createTop5List(payload);
        if (response.data.success) {
            let newList = response.data.top5List;
            let tempListInfo = [newListName, "?", "?", "?", "?", "?", newList._id];
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: {newList, tempListInfo}
            }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            history.push("/top5list/" + newList._id);
            let button = document.getElementById("publish-button");
            button.style.opacity="20%";
            button.style.pointerEvents="none";
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }
    store.search = async function (text) {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let pairsArray = response.data.idNamePairs;
            let newPairsArray=[];
            if (store.mode==="home") {
                for (let i = 0; i<pairsArray.length; i++) {
                    if (pairsArray[i].ownerEmail===auth.user.email) {
                        newPairsArray.push(pairsArray[i]);
                    }
                }
            }
            else if (store.mode==="all") {
                for (let i = 0; i<pairsArray.length; i++) {
                    if (pairsArray[i].published) {
                        newPairsArray.push(pairsArray[i]);
                    }
                }
            }
            let filteredPairsArray = []
            if (store.mode==="home" || store.mode==="all") {
                for (let i=0; i<newPairsArray.length; i++) {
                    if (newPairsArray[i].name.toLowerCase().startsWith(text.toLowerCase())) {
                        filteredPairsArray.push(newPairsArray[i])
                    }
                }
            }
            else if (store.mode==="user") {
                for (let i=0; i<pairsArray.length; i++) {
                    if (pairsArray[i].published && pairsArray[i].ownerUserName.toLowerCase()===text.toLowerCase()) {
                        filteredPairsArray.push(pairsArray[i])
                    }
                }
            }
            console.log(filteredPairsArray)
            storeReducer({ 
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: filteredPairsArray
            });
        }
    }
    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = async function () {
        //let button = document.getElementById("search-bar")
        //console.log(button.value)
        //if (button.value!=="") {
            //return
        //}
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            document.getElementById("top5-statusbar").style.visibility = "visible";
            let pairsArray = response.data.idNamePairs;
            let newPairsArray=[];
            if (store.mode==="home") {
                for (let i = 0; i<pairsArray.length; i++) {
                    if (pairsArray[i].ownerEmail===auth.user.email) {
                        newPairsArray.push(pairsArray[i]);
                    }
                }
            }
            else if (store.mode==="all") {
                for (let i = 0; i<pairsArray.length; i++) {
                    if (pairsArray[i].published) {
                        newPairsArray.push(pairsArray[i]);
                    }
                }
            }
            storeReducer({ 
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: newPairsArray
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = async function (id) {
        // GET THE LIST
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }

    store.deleteList = async function (listToDelete) {
        if (listToDelete.ownerEmail !== auth.user.email) {
            return
        }
        let response = await api.deleteTop5ListById(listToDelete._id);
        if (response.data.success) {
            store.loadIdNamePairs();
            history.push("/");
        }
    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    // store.refresh = async function (id) {
    //     tps.clearAllTransactions();
    //     let response = await api.getTop5ListById(id);
    //     if (response.data.success) {
    //         let top5List = response.data.top5List;
    //         storeReducer({
    //             type: GlobalStoreActionType.SET_CURRENT_LIST,
    //             payload: top5List
    //         });
    //         history.push("/top5list/" + top5List._id);
    //     }
    //     store.checkRedo();
    //     store.checkUndo();
    // }
    store.setCurrentList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            if (top5List.ownerEmail !== auth.user.email) {
                return
            }
            response = await api.updateTop5ListById(top5List._id, top5List);
            if (response.data.success) {
                let tempListInfo = [top5List.name, top5List.items[0], top5List.items[1], top5List.items[2], top5List.items[3], top5List.items[4], top5List._id]
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: {top5List, tempListInfo}
                });
                history.push("/top5list/" + top5List._id);
                let button = document.getElementById("toolbar");
                button.style.opacity="20%";
                button.style.pointerEvents="none";
                let button8 = document.getElementById("top5-statusbar");
                button8.style.opacity="20%";
                button8.style.pointerEvents="none";

                let publishable = true;
                for (let i=0; i<store.idNamePairs.length; i++) {
                    if (store.idNamePairs[i]._id!==tempListInfo[6] && store.idNamePairs[i].published) {
                        if (store.idNamePairs[i].name.toLowerCase()===tempListInfo[0].toLowerCase()) {
                            console.log("trueeeeee")
                            publishable = false;
                            break;
                        }
                    }
                }
                if (store.checkDuplicates(tempListInfo)) {
                    publishable = false;
                }
                for (let j=0; j<6; j++) {
                    if(tempListInfo[j]==="" || !tempListInfo[j].charAt(0).match(/^[0-9a-z]+$/i)) {
                     publishable = false;
                    break;
                    }
                 }
                if (publishable===false) {
                    let button = document.getElementById("publish-button");
                    button.style.opacity="20%";
                    button.style.pointerEvents="none";
                }
                else {
                    let button = document.getElementById("publish-button");
                    button.style.opacity="100%";
                    button.style.pointerEvents="auto";
                }
            }
        }
    }

    store.updateItem = function (index, newItem) {
        store.currentList.items[index] = newItem;
    }

    store.updateCurrentList = async function () {
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList);
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: store.currentList
            });
        }
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}


export default GlobalStoreContext;
export { GlobalStoreContextProvider };