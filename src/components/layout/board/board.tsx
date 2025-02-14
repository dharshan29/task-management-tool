import { Stack, Typography, useTheme } from '@mui/material'
import React, { useMemo } from 'react'
import Card from './card';
import { SortableContext } from '@dnd-kit/sortable';
import { TaskType } from '@/services/types';


const headColor: Record<string, string> = {
    'TO-DO': "#FAC3FF",
    'IN-PROGRESS':'#85D9F1',
    'COMPLETED': '#CEFFCC'
  }

const BoardContainer = ({items, title}: {items: TaskType[], title: string}) => {
    const theme = useTheme();
    const tasksIds = useMemo(() => {
        return items.map(task => task.taskName)
    }, [items])
    return (
        <Stack sx={{
            width: '336px', 
            height: '556px', 
            borderRadius: '12px', 
            backgroundColor: theme.palette.background.paper, 
            border: `1px solid ${theme.palette.border[100_07]}`,
            padding: '12px'
            }}
            gap="20px"
        >
            <Stack sx={{padding: '4px 10px', bgcolor: headColor[title], width: "fit-content", borderRadius: '4px'}}>
            <Typography variant='body2' sx={{fontWeight: 500}}>{title}</Typography>
            </Stack>
            <Stack gap="8px">
                <SortableContext items={tasksIds}>
                    {items.map((item, index) => (
                        <Card key={index} item={item} />
                    ))}
                </SortableContext>
            </Stack>
        </Stack>
  )
}

export default BoardContainer