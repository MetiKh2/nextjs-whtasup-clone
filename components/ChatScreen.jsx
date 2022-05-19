import styled from "styled-components";
import {useAuthState} from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router';
import { Avatar, Button, IconButton } from "@mui/material";
import getRecipientEmail from "../utils/getRecipientEmail";
import { AttachFile, InsertEmoticon } from "@mui/icons-material";
import { auth, db } from "../firebase";
import { addDoc, collection, doc,serverTimestamp, onSnapshot, orderBy, query, setDoc, where, getDocs } from "firebase/firestore";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";
import Moment from 'react-moment';

function ChatScreen({chat,chatMessages}) {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [user]=useAuthState(auth)
    const [recipient, setRecipient] = useState({})
    const router=useRouter()
    const recipientEmail= getRecipientEmail(chat?.users,user)
    const endOfMessageRef=useRef(null)
    useEffect(()=>{
        const getRecipient=async()=>{
            setRecipient({})
            const q = query(collection(db,'users'),where("email","==",recipientEmail));
            const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
      setRecipient({id:doc.id,...doc.data()})
    });
        }
        getRecipient()
      },[router?.query?.id])
    useEffect(()=>{
        const q = query(collection(db,'messages'),where('chatId','==',router?.query?.id));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const list=querySnapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            
         setMessages(list.sort((a,b)=>{return a?.timeStamp-b?.timeStamp}))
        });
          return unsubscribe;
      
      },[router?.query?.id])
      
      console.warn(user);
      const sendMessage=async (e)=>{
          e.preventDefault();
          const userRef = doc(db, 'users', user.uid);
     await setDoc(userRef,{
        lastSeen:serverTimestamp(),
      } , { merge: true });
     await addDoc(collection(db,'messages'),{
        timeStamp:serverTimestamp(),
        user:user.email,
        photoUrl:user?.photoURL,
        message:input,
        chatId:router?.query?.id
      })
      setInput('')
      scrollToBottom()
    }
      const scrollToBottom=()=>{
          endOfMessageRef.current.scrollIntoView({
              behavior:'smooth',
              block:'start'
          })
      }
    return (
    <Container>
        <Header>
        {
            recipient?(
                <Avatar src={recipient?.photoUrl}/>
            ):(
                <Avatar>{recipientEmail[0]}</Avatar>
            )
        }
            <HeaderInformation>
                <h3>{recipientEmail}</h3>
                <p>  {recipient?.lastSeen?(<p>Last active: <Moment  fromNow ago>{recipient?.lastSeen?.toDate()}</Moment></p> ):''}
                </p>
            </HeaderInformation>
            <HeaderIcons>
                <IconButton>
                    <AttachFile/>
                </IconButton>
            </HeaderIcons>
        </Header>
        <MessageContainer>
            {
               messages? messages.map(message=>{
                return <Message
                 key={message.id}
                 message={{
                     ...message,
                     timeStamp:message?.timeStamp?.toDate()?.getTime()}
                 }
                 />
             }):JSON.parse(chatMessages).map(message=>(
                 <Message key={message.id} message={message}/>
             ))
            }
            <EndOfMessage ref={endOfMessageRef}/>
        </MessageContainer>
        <InputContainer> 
            <InsertEmoticon/>
            <Input value={input} onChange={(e)=>setInput(e.target.value)}/>
            <button hidden disabled={!input} type='submit' onClick={sendMessage}>Send Message</button>
        </InputContainer>
    </Container>
  )
}

export default ChatScreen
const Container=styled.div`
background-color: #e5ede8;
`;
const Header=styled.div`
position: sticky;
background-color: #fff;
z-index: 100;
top: 0;
display: flex;
padding: 11px;
height: 88px;
align-items: center;
border-bottom: 1px solid whitesmoke;
`;
const HeaderIcons=styled.div`
margin-left: 15px;
flex:1;
>h3{
    margin-bottom: 3px;
}
>p{
    font-size: 14px;
    color: gray;
}
`;
const HeaderInformation=styled.div`

`;
const MessageContainer=styled.div`
padding: 30px;
background-color: #e5ede8;
min-height: 90vh;
`;
const EndOfMessage=styled.div`
margin-bottom: 50px;
`;
const InputContainer=styled.form`
display: flex;
align-items: center;
padding: 10px;
position: sticky;
bottom: 0;
background-color: #fff;
z-index: 100;
`;
const Input=styled.input`
flex: 1;
align-items: center;
border-radius: 10px;
position: sticky;
bottom: 0;
background-color: whitesmoke;
padding: 20px;
margin-left: 15px;
margin-right: 15px;
outline:0 ;
border:0 ;
`;