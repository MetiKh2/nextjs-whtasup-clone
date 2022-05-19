import { collection, doc, getDoc, getDocs, orderBy, refEqual, where } from "firebase/firestore";
import Head from "next/head";
import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { auth, db } from "../../firebase";
import {useAuthState} from 'react-firebase-hooks/auth'
import getRecipientEmail from "../../utils/getRecipientEmail";
const Chat = ({chat,messages}) => {
  const [user]=useAuthState(auth)
  console.log(chat,messages);
  return (
    <Container>
        <Head>
            <title>Chat / {getRecipientEmail(chat.users,user)}</title>
        </Head>
        {/* <div style={{flex:0.5}}><Sidebar/></div> */}
        <Sidebar/>
        <ChatContainer>
            <ChatScreen chat={chat} messages={messages}/>
        </ChatContainer>
    </Container>
  )
}
export async function getServerSideProps(context) {
    const docRef = doc(db, "chats", context.query.id);
    const messagesRes = await getDocs(collection(db,'messages'),where('chatId','==',context?.query?.id));
    const messages=messagesRes?.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
    })).map(messages=>({
        ...messages,
        timeStamp:messages?.timeStamp?.toDate().getTime()
    }))

    const chatRes=await getDoc(docRef)
    const chat ={
        id:chatRes.id,
        ...chatRes.data()
    }
    return {
        props:{
            chatMessages:JSON.stringify(messages),
            chat
        }
    }
} 
export default Chat
const Container=styled.div`
display: flex;
`;
const ChatContainer=styled.div`
flex: 1;
overflow: scroll;
height: 100vh;
::-webkit-scrollbar{
    display: none;
}
-ms-overflow-style: none;
scrollbar-width: none;
`;