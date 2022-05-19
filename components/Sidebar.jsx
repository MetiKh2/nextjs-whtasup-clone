import  { useEffect, useState } from 'react'
import styled from 'styled-components'
import {Avatar, Button, IconButton} from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import  * as EmailValidator from 'email-validator'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth, db} from '../firebase'
import {useCollection} from 'react-firebase-hooks/firestore'
import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore';
import Chat from './Chat';
const Sidebar = () => {
  const [user]=useAuthState(auth)
  
    const [chats,setChats]=useState([])
    useEffect(()=>{
      const userChatRef=collection(db, "chats")
      const q = query(userChatRef,where("users","array-contains",user.email));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const list=querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        // setDocs(list.sort((a,b)=>{return b?.timeStamp-a?.timeStamp}))
        setChats(list)
        });
        return unsubscribe;
    },[])
   const startNewChat=async()=>{
    const input=prompt('Please enter an email address for the user you wish to chat with');
    if (!input) 
      return;
    if(EmailValidator.validate(input)&&!chatAlreadyExists(input)&&input!=user.email){
      try{
        await addDoc(collection(db, "chats"), {
          users:[user.email,input]
        });
    }
    catch(err){
        console.log(err);
    }
    }
    else{
      alert('Email is not valid!')
    }
  }
  const chatAlreadyExists=(recipientEmail)=>
    !!chats
    .find(chat=>chat.users.find(user=>user==recipientEmail)?.length>0
    ) 
     
  return (
    <Container>
        <Header>
            <UserAvatar src={user.photoURL} onClick={()=>auth.signOut()}/>
            <IconsContainer>
             <IconButton>
             <ChatIcon/>
             </IconButton>
            <IconButton>
            <MoreVertIcon/>
            </IconButton>
            </IconsContainer>
        </Header>
        <Search>
          <SearchIcon/>
          <SearchInput placeholder='Search in chats ...'/>
        </Search>
        <SidebarButton onClick={startNewChat}>Start a new chat</SidebarButton>
        {
          chats.map(chat=>
            <Chat key={chat.id} id={chat.id} users={chat.users} />)
        }
    </Container>
  )
}

export default Sidebar

const Container=styled.div`
flex: 0.45;
border-right: 1px solid whitesmoke;
height: 100vh;
min-width: 300px;
min-height: 350px;
overflow-y: scroll;
::-webkit-scrollbar{
    display: none;
}
-ms-overflow-style: none;
scrollbar-width: none;
`;
const Header=styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;
const UserAvatar=styled(Avatar)`
cursor: pointer;
:hover{
  opacity: 0.8;

}
`;
const IconsContainer=styled.div`
`;
const Search=styled.div`
display: flex;
align-items: center;
padding: 5px;
border-radius: 20px;
`;
const SearchInput=styled.input`
outline: 0;
border: 0;
flex: 1;
`;

const SidebarButton=styled(Button)`
  width: 100%;
  color: #000;
  &&&{
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
