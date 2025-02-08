"use client"

import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import Task from '@/assets/icons/task.svg'
import TaskImage from '@/assets/images/Task_list_view.svg'
import Image from 'next/image'
import { urbanist } from "@/theme/typography";

const Login = () => {
  const theme = useTheme();
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
                <Typography variant="h2" sx={{color: theme.palette.primary.main, fontFamily: urbanist.style.fontFamily}}>
                  TaskBuddy
                </Typography>
              </Stack>
              <Typography variant="caption" pl="6px" 
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
            <Button variant="contained">
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