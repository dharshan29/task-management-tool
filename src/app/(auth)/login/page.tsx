"use client"

import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Task from '@/assets/icons/task.svg'
import TaskImage from '@/assets/images/Task_list_view.svg'
import GoogleIcon from '@/assets/icons/google.svg'
import Image from 'next/image'
import { urbanist } from "../../../theme/typography";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/providers/Firebase";
import { google } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/zustand/user'
import useStyles from "./index.style";
import toast from "react-hot-toast";
import { useEffect } from "react";

const Login = () => {
  const theme = useTheme();
  const styles = useStyles(theme); 
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
      toast.success('Logged In');
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      router.push('/');
    }
  }, [])

  const isLaptop = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <>
      <Box sx={{ background: theme => theme.palette.background.soft, height: '100vh'}} >
        <Stack flexDirection="row" height="100%">
          <Stack sx={styles.container}>
            <Stack sx={{maxWidth: '300px', alignItems: {xs: 'center', sm : 'flex-start'}}}>
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
                  mt: '6px',
                  color: theme.palette.black[100], 
                  width: '294px', 
                  fontSize: '11.3px', 
                  fontWeight: 500,
                  fontFamily: urbanist.style.fontFamily,
                  textAlign: {xs: 'center', sm : 'justify'}
                }}>
                Streamline your workflow and track progress effortlessly with our all-in-one task management app.
              </Typography>
            </Stack>
              <Button variant="contained" 
                sx={{
                  display: 'flex',
                  gap: '12px',
                  flexDirection: 'row',
                  height: '60px',
                  minHeight: '60px',
                  width: { xs: '260px', sm: '364px' },
                  borderRadius: '19px',
                  bgcolor: theme.palette.black[500],
                  textTransform: 'none'
                }}
                onClick={signInWithGoogle}
              >
                <Image src={GoogleIcon} alt="google"/>
                <Typography variant="h3" sx={{fontFamily: urbanist.style.fontFamily, fontSize: {xs : '16px' , sm: '22px'}, color: '#ffffff'}}>
                  Continue with Google
                </Typography>
              </Button>
            </Stack>

            {isLaptop && (
              <Stack sx={{ flex: 1, position: 'relative', display: { xs: 'none', sm: 'flex' } }}>
                <Image
                  src={TaskImage}
                  alt="Task Image"
                  style={{ position: 'absolute', top: '95px', right: 0 }}
                />
              </Stack>
            )}
        </Stack>
      </Box>
    </>
  )
}

export default Login;


