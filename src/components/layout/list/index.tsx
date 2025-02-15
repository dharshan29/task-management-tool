import { Box, Divider, useTheme, Typography, Stack, useMediaQuery } from '@mui/material';
import Table from '../../table/table'
import AddTaskComponent from './addTasks';
import RowComponent from './row';
import { TaskType } from '@/services/types';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { useTaskStore } from '@/lib/zustand/tasks';
import { useMutation } from '@tanstack/react-query';
import { updateTaskStatus } from '@/services';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
import Image from 'next/image';


const ListLayout = ({ todoTasks, inProgressTasks, completedTasks}: {todoTasks: TaskType[], inProgressTasks: TaskType[], completedTasks: TaskType[]}) => {
    const theme = useTheme();

    const isLoading = false;
    const [activeCard, setActiveCard] = useState<TaskType | null>(null);

    const { taskStatusUpdate } = useTaskStore();

    const { mutate: mutateUpdateTaskStatus } = useMutation({
      mutationFn: updateTaskStatus,
      onSuccess: (data) => {
        taskStatusUpdate(data.ids, data.status);
        toast.success(data.message)
      },
      onError: (error: any) => {
        toast.error(error.response.data.error || error.response.data.message || 'Something went wrong');
      }
    });

    const handleDragStart = (event: any) => {
      setActiveCard(event.active.data.current?.item || null);
    };
    
    const handleDragEnd = (event: any) => {
      const { active, over } = event;
      if (!over) return;
  
      const taskId = active.id;
      const newStatus = over.id; // The board container ID
  
      if (!["TO-DO", "IN-PROGRESS", "COMPLETED"].includes(newStatus)) return;
  
      // Update task status
      mutateUpdateTaskStatus({ ids: [taskId], status: newStatus });
    };
  
    const isLaptop = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <Box>
     {isLaptop &&
     <>
        <Divider sx={{bgcolor: theme.palette.black[100_10]}}/>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
          <Typography variant="h6" sx={{ flex: 0.3, textAlign: 'start', fontSize: '14px', color: theme.palette.black[100_60] }}>Task Name</Typography>
          <Typography variant="h6" sx={{ flex: 0.2, textAlign: 'start', fontSize: '14px', color: theme.palette.black[100_60] }}>Due on</Typography>
          <Typography variant="h6" sx={{ flex: 0.2, textAlign: 'start', fontSize: '14px', color: theme.palette.black[100_60] }}>Task Status</Typography>
          <Typography variant="h6" sx={{ flex: 0.3, textAlign: 'start', fontSize: '14px', color: theme.palette.black[100_60] }}>Task Category</Typography>
        </Box>
     </>
      }

        <Stack gap="32px">
          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} >
            <Box
              style={{
                borderRadius: "12px",
                border: "1px solid #ddd",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Table
                  data={todoTasks}
                  header="TO-DO"
                  isLoading={isLoading}
                  row={RowComponent}
                  addTaskComponent={AddTaskComponent}
              />
            </Box>
            <Box
              style={{
                borderRadius: "12px",
                border: "1px solid #ddd",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
            <Table
                data={inProgressTasks}
                header="IN-PROGRESS"
                isLoading={isLoading}
                row={RowComponent}
            />
            </Box>
            <Box
              style={{
                borderRadius: "12px",
                border: "1px solid #ddd",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
            <Table
                data={completedTasks}
                header="COMPLETED"
                isLoading={isLoading}
                row={RowComponent}
            />
            </Box>
              {createPortal(
                  <DragOverlay style={{backgroundColor: '#F1F1F1', color: 'black'}}>
                      {activeCard ? 
                      <RowComponent data={activeCard} /> 
                      : null}
                  </DragOverlay>,
                  document.body
              )}
          </DndContext>
        </Stack>
    </Box>
  );
};

export default ListLayout;
