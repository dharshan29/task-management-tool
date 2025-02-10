"use client"

import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import Task from '@/assets/icons/task.svg'
import TaskImage from '@/assets/images/Task_list_view.svg'
import Image from 'next/image'
import { urbanist } from "@/theme/typography";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/providers/Firebase";
import { google } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/zustand/user'

const Login = () => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setUser } = useAuthStore();
 
  const { mutate: googleLogin } = useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: (token: string) => google({ token }),
    onSuccess: (response) => {
      setUser({
        userName: response.user.userName,
        email: response.user.email,
        photoUrl: response.user.photoUrl,
        userId: response.user.userId,
      });

      localStorage.setItem('token', response.token);

      router.push('/');

    },
    onError: (error) => {
      console.error("Google login failed:", error);
      queryClient.setQueryData(['auth'], {
        user: null,
        isAuthenticated: false
      });
    }
  });

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL, uid } = result.user;
      const accessToken = await result.user.getIdToken();
      googleLogin(accessToken)
      // console.log({result})
      // console.log(accessToken) 
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  }
  return (
    <>
      <Box sx={{ background: theme => theme.palette.background.soft, height: '100vh'}} >
        <Stack flexDirection="row" height="100%">
          <Stack sx={{ maxWidth: {md: '366px', xs: '296px',margin: 'auto', marginRight: '83px', marginLeft: '66px', gap: '31.5px'}}}>
            <Stack sx={{maxWidth: '300px'}}>
              <Stack flexDirection="row" alignItems="center" >
                <Image 
                  src={Task}
                  alt="Task icon"
                />
                <Typography variant="h2" sx={{color: theme.palette.secondary.main, fontFamily: urbanist.style.fontFamily}}>
                  TaskBuddy
                </Typography>
              </Stack>
              <Typography variant="caption" pl="5px" 
                sx={{
                  color: theme.palette.black[100], 
                  width: '294px', 
                  fontSize: '11.6px', 
                  fontWeight: 500,
                  fontFamily: urbanist.style.fontFamily
                }}>
                Streamline your workflow and track progress effortlessly with our all-in-one task management app.
              </Typography>
            </Stack>
              <Button variant="contained" 
                onClick={signInWithGoogle}
              >
                  Continue with Google
              </Button>
            </Stack>

          <Stack sx={{flex: 1, position: 'relative'}}>
              <Image 
                  src={TaskImage}
                  alt="Task Image"
                  style={{position: 'absolute', top: '95px', right: 0}}
              />
          </Stack>
        </Stack>
      </Box>
    </>
  )
}

export default Login;


