import { Stack, TableCell, TableRow, Typography } from '@mui/material';
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
  return (
    <TableRow hover sx={{height: '48px'}}>
      <TableCell component="th" scope="row" sx={{width: '30%'}}>
        <Stack flexDirection="row" alignItems="center">
            <Image src={selectIcon} alt='select'/>
            <Image src={dragIcon} alt='drag'/>
            <Image src={unCheckedIcon} alt='uncheck'/>
            <Typography sx={{pl: '5px'}}>
                {data.taskName}
            </Typography>
        </Stack>
      </TableCell>
      <TableCell component="th" scope="row" sx={{width: '20%', pl: 0}}>
      <Typography>
            {data.dueOn}
        </Typography>
      </TableCell>
      <TableCell component="th" scope="row" sx={{width: '20%', pl: 0}}>
      <Typography>
            {data.taskStatus}
        </Typography>
      </TableCell>
      <TableCell component="th" scope="row" sx={{width: '30%', pl: 0}}>
      <Typography>
            {data.taskCategory}
        </Typography>
      </TableCell>
    </TableRow>
  )
}

export default RowComponent