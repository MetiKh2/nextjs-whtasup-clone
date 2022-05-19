import styled from "styled-components";
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from "../firebase";
import Moment from "react-moment";

function Message({message}) {
    const [user]=useAuthState(auth)
    const TypeOfMessage=user.email==message.user?Sender:Reciever;
  return (
    <Container>
        <TypeOfMessage>
            
        {message?.timeStamp?<TimeStamp><Moment format="HH:mm">{message.timeStamp}</Moment></TimeStamp>:''} {message.message}
        </TypeOfMessage>
    </Container>
  )
}

export default Message
const Container=styled.div`
    
`;
const MessageElement=styled.p`
    width: fit-content;
    padding: 15px;
    border-radius: 8px;
    margin: 16px;
    min-width: 60px;
    padding-bottom: 26px;
    position: relative;
    text-align: right;
    font-weight: 600;
`;
const Sender=styled(MessageElement)`
background-color:#f8f3c6;
margin-left: auto;
`
const Reciever=styled(MessageElement)`
background-color:whitesmoke;
text-align: left;
`
const TimeStamp=styled.span`
color: gray;
padding: 10px;
font-size: 9px;
position: absolute;
bottom: 0;
text-align: right;
right: 0;
`
