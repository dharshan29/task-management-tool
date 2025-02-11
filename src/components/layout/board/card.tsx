import { Stack, Typography, useTheme } from '@mui/material'
import Image from 'next/image';
import moreIcon from '@/assets/icons/more.svg'
import React from 'react'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Item {
    taskName: string;
    dueOn: string;
    taskStatus: string;
    taskCategory: string;
  }
  
const Card = ({item}: {item: Item}) => {
    const theme = useTheme();
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.taskName });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition
      };
    return (
        <Stack  
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            justifyContent="space-between"
            sx={{
                border: `0.5px solid ${theme.palette.border[100_28]}`,
                borderRadius: '12px', 
                height: '110px',
                bgcolor: theme.palette.background.default
            }}
        >
            <Stack 
                flexDirection="row" 
                alignItems="center" 
                justifyContent="space-between" 
                sx={{px: '16px', mt: '16.5px'}}
            >
                <Typography>{item.taskName}</Typography>
                <Image src={moreIcon} alt='more' />
            </Stack>
            <Stack 
                flexDirection="row" 
                alignItems="center" 
                justifyContent="space-between"  
                sx={{px: '16px', mb: '7px'}}
            >
                <Typography>{item.taskCategory}</Typography>
                <Typography>{item.dueOn}</Typography>
            </Stack>
        </Stack>
    )
}

export default Card