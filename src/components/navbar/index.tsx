"use client"
import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Stack, Avatar, useTheme, Tabs, Tab, useMediaQuery } from '@mui/material';
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

  const isLaptop = useMediaQuery(theme.breakpoints.up("sm"));
  console.log({isLaptop})

  return (
    <AppBar position="static" sx={{ px:{xs:"16px", sm:"32px"}, pt: {xs: '18px',sm: "58px"}, pb: {xs: '14px',sm: "0px"}, bgcolor: {xs: '#FAEEFC', sm: 'transparent'}  }}>
      <Toolbar sx={{ justifyContent: 'space-between',p: '0px !important', minHeight: isLaptop ? "56px": "0"}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Stack flexDirection="row" alignItems="center">
            <Box sx={{display: {xs: 'none', sm : 'block'}}}>
              <Image src={Task} alt='task-img' />
            </Box>
            <Typography variant="h2"  sx={{fontWeight: 600, fontSize: {xs: '16px',sm: '24px'}}}>
              TaskBuddy
            </Typography>
          </Stack>
          <Tabs value={layout} onChange={(event, value) => setLayout(value)} sx={{display: {xs: 'none', sm: 'block'}}}>
            <Tab sx={{flexDirection: 'row', alignItems: 'center'}} icon={<Image src={listIcon} alt="List" width={16} height={16} />} label="List" value="list" />
            <Tab sx={{flexDirection: 'row'}} icon={<Image src={boardIcon} alt="Board" width={16} height={16} />} label="Board" value="board" />
          </Tabs>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <Stack flexDirection="row" alignItems="center" gap={1} >
              <Image src={user?.photoUrl || ''} alt={user?.userName || ''}  height={isLaptop ? "36": "25"} width={isLaptop ? "36": "25"} style={{borderRadius: "50%"}} />
            <Typography  variant="h6" sx={{display: {xs: 'none', sm: 'block'}, color: theme.palette.black[100_60]}}>
              {user?.userName}
            </Typography>
          </Stack>
          <Button variant='outlined' onClick={logout} startIcon={<Image src={logoutIcon} alt="logout" width={15} height={15} />}
            sx={{
              display: {xs: 'none', sm: 'flex'},
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

