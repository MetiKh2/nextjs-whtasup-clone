import { Avatar } from '@mui/material';
import styled from 'styled-components'
import getRecipientEmail from '../utils/getRecipientEmail';
import {auth, db} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
function Chat({id,users}) {
    const router=useRouter()
    const [recipient, setRecipient] = useState({})
  const [user]=useAuthState(auth)
  const recipientEmail=getRecipientEmail(users,user)
  useEffect(()=>{
    const getRecipient=async()=>{
        const q = query(collection(db,'users'),where("email","==",recipientEmail));
        const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  //console.log(doc.id, " => ", doc.data());
  setRecipient({id:doc.id,...doc.data()})
});
    }
    getRecipient()
  },[])
 const enterChat=()=>{
     router.push(`/chat/${id}`)
 }
  return (
    <Container onClick={enterChat}>
        {
            recipient?(
                <UserAvatar src={recipient?.photoUrl}/>
            ):(
                <UserAvatar>{recipientEmail[0]}</UserAvatar>
            )
        }
        <p>{recipientEmail}</p>  
    </Container>
    )
}

export default Chat
const Container=styled.div`
display: flex;
align-items: center;
cursor: pointer;
padding: 15px;
word-break: break-word;
:hover{
    background-color: #e9eaeb;
}
`;
const UserAvatar=styled(Avatar)`
margin: 5px;
margin-right: 15px;
`;