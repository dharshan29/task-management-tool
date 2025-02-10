"use client"
import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Stack, Avatar, useTheme, Tabs, Tab } from '@mui/material';
import { useAuthStore } from '../../lib/zustand/user';
import { useLayoutStore } from '../../lib/zustand/layout';
import listIcon from '@/assets/icons/list.svg';
import boardIcon from '@/assets/icons/board.svg';
import logoutIcon from '@/assets/icons/logout.svg';
import Image from 'next/image';
import Task from '@/assets/icons/task.svg'

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { layout ,setLayout } = useLayoutStore();
  const theme = useTheme();
  console.log({layout})

  return (
    <AppBar position="static" sx={{ px: "32px", pt: "58px" }}>
      <Toolbar sx={{ justifyContent: 'space-between',p: '0px !important' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Stack flexDirection="row" alignItems="center">
            <Image src={Task} alt='task-img' />
            <Typography variant="h2"  sx={{fontWeight: 600}}>
              TaskBuddy
            </Typography>
          </Stack>
          <Tabs value={layout} onChange={(event, value) => setLayout(value)}>
            <Tab sx={{flexDirection: 'row', alignItems: 'center'}} icon={<Image src={listIcon} alt="List" width={16} height={16} />} label="List" value="list" />
            <Tab sx={{flexDirection: 'row'}} icon={<Image src={boardIcon} alt="Board" width={16} height={16} />} label="Board" value="board" />
          </Tabs>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <Stack flexDirection="row" alignItems="center" gap={1} >
              <Image src={user?.photoUrl || ''} alt={user?.userName || ''}  height="36" width="36" style={{borderRadius: "50%"}} />
            <Typography variant="h6" sx={{color: theme.palette.black[100_60]}}>
              {user?.userName}
            </Typography>
          </Stack>
          <Button variant='outlined' onClick={logout} startIcon={<Image src={logoutIcon} alt="logout" width={15} height={15} />}
            sx={{
              bgcolor: theme.palette.background.soft, 
              border: `1px solid #7B198426`,
              textTransform: 'none', 
              borderRadius: '12px',
              fontWeight: 600, width: '108px'
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

