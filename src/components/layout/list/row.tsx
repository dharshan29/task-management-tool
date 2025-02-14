import { Box, Button, Stack, TableCell, TableRow, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react'
import selectIcon from '@/assets/icons/select.svg';
import dragIcon from '@/assets/icons/drag.svg';
import unCheckedIcon from '@/assets/icons/unchecked.svg';
import AddPopper from '@/components/customPopper/addPopper';

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

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("false");

    const statusOptions = ['TO-DO', 'IN-PROGRESS', 'COMPLETED'];

    const onClose = () => setOpen(false);
    const onSelect = (option: string) => {
        console.log(option);
        setOpen(false);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>, selected: string) => {
        setSelected(selected)
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
      };

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
        <Button onClick={(e) => handleClick(e, data.taskStatus)} sx={{p:'4px 10px',height: '28px !important', background: theme.palette.border[300], borderRadius: '4px', width: 'fit-content'}}>
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
      <AddPopper anchorEl={anchorEl} open={open} onClose={onClose} options={statusOptions || []} onSelect={onSelect} selected={selected} placement='bottom'/>
    </TableRow>
  )
}

export default RowComponent