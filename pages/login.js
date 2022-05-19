import styled  from 'styled-components'
import Head from 'next/head'
import { Button } from '@mui/material'
import { auth, googleAuthProvider } from '../firebase'
import { signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import Image from 'next/image'
const Login = () => {
    const signIn=()=>{
        signInWithPopup(auth, googleAuthProvider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    }
  return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
                <Image
                height={120}
                width={200}
                src='https://logos-world.net/wp-content/uploads/2020/05/WhatsApp-Logo-700x394.png'
                />
                <Button style={{marginTop:20}} onClick={signIn} variant='outlined'>Sign in with google</Button>
            </LoginContainer>
        </Container>
    )
}

export default Login
const Container =styled.div`
display: grid;
place-items: center;
height: 100vh;
`
const LoginContainer =styled.div`
display: flex;
flex-direction: column;
align-items: center;
background-color: #fff;
border-radius: 5px;
box-shadow: 0px 4px 14px -3px rgba(0,0,0,0.7);
padding: 50px;
`
 