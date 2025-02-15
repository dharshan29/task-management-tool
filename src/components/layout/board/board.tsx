import { Stack, Typography, useTheme } from '@mui/material'
import React, { useMemo } from 'react'
import Card from './card';
import { TaskType } from '@/services/types';
import { useDroppable } from '@dnd-kit/core';


const headColor: Record<string, string> = {
    'TO-DO': "#FAC3FF",
    'IN-PROGRESS':'#85D9F1',
    'COMPLETED': '#CEFFCC'
  }

const BoardContainer = ({ items, title, status }: { items: TaskType[], title: string, status: string }) => {
    const theme = useTheme();
    const { setNodeRef } = useDroppable({ id: status });
  
    return (
      <Stack ref={setNodeRef} sx={{ width: '336px', height: '556px', borderRadius: '12px', backgroundColor: theme.palette.background.paper, padding: '12px' }} gap="20px">
        <Stack sx={{ padding: '4px 10px', bgcolor: headColor[title], width: "fit-content", borderRadius: '4px' }}>
          <Typography variant='body2' sx={{ fontWeight: 500 }}>{title}</Typography>
        </Stack>
        <Stack gap="8px">
            {items.map((item) => (
              <Card key={item.taskName} item={item} />
            ))}
        </Stack>
      </Stack>
    );
  };

export default BoardContainer