import { Box, Button, Stack, TableCell, TableRow, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import React from 'react'
import selectIcon from '@/assets/icons/select.svg';
import dragIcon from '@/assets/icons/drag.svg';
import unCheckedIcon from '@/assets/icons/unchecked.svg';

interface RowProps {
  data: {
    taskName: string;
    dueOn: string;
    taskStatus: string;
    taskCategory: string;
  };
}

const RowComponent: React.FC<RowProps> = ({ data }) => {
  const theme = useTheme();
  return (
    <TableRow hover sx={{height: '48px'}}>
      <TableCell component="th" scope="row" sx={{width: '30%'}}>
        <Stack flexDirection="row" alignItems="center">
            <Image src={selectIcon} alt='select'/>
            <Image src={dragIcon} alt='drag'/>
            <Image src={unCheckedIcon} alt='uncheck'/>
            <Typography sx={{pl: '5px', fontWeight: 500, color: theme.palette.black[100]}} variant='body2'>
                {data.taskName}
            </Typography>
        </Stack>
      </TableCell>
      <TableCell component="th" scope="row" sx={{width: '20%', pl: 0}}>
        <Typography variant='body2' sx={{fontWeight: 500, color: theme.palette.black[100]}}>
              {data.dueOn}
          </Typography>
      </TableCell>
      <TableCell component="th" scope="row" sx={{width: '20%', pl: 0}}>
        <Button sx={{p:'4px 10px',height: '28px !important', background: theme.palette.border[300], borderRadius: '4px', width: 'fit-content'}}>
          <Typography variant='body2' sx={{fontWeight: 500, color: theme.palette.black[100]}}>
                {data.taskStatus}
            </Typography>
        </Button>
      </TableCell>
      <TableCell component="th" scope="row" sx={{width: '30%', pl: 0}}>
        <Typography variant='body2' sx={{fontWeight: 500, color: theme.palette.black[100]}}>
              {data.taskCategory}
          </Typography>
      </TableCell>
    </TableRow>
  )
}

export default RowComponent