"use client"
import { IconButton, Stack, Typography, useTheme } from '@mui/material'
import Image from 'next/image';
import moreIcon from '@/assets/icons/more.svg'
import React, { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskType } from '@/services/types';
import ActionPopper from '@/components/customPopper/actionPopper';
import { useMutation } from '@tanstack/react-query';
import { useTaskStore } from '@/lib/zustand/tasks';
import { removeTasks, update_Task } from '@/services';
import { useLayoutStore } from '@/lib/zustand/layout';
import AddUpdateTaskModal from '@/components/addTaskModal';

  
const Card = ({item}: {item: TaskType}) => {
    const theme = useTheme();
    
    const [modalOpen, setModalOpen] = useState(false);
    const [openAction, setOpenAction] = useState(false);
    const [actionEl, setActionEl] = useState<HTMLElement | null>(null);
    const [selected, setSelected] = useState<TaskType>();

    const { isDisabled } = useLayoutStore();
    
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.taskName, disabled: isDisabled });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    const { deleteTasks } = useTaskStore()
    const { mutate: mutateDeleteTasks, isError } = useMutation({
      mutationFn: removeTasks,
      onSuccess: (data) => {
        deleteTasks(data.deletedIds);
      },
    });

    const { updateTask } = useTaskStore()
    const { mutate: mutateUpdateTask } = useMutation({
      mutationFn: update_Task,
      onSuccess: (data) => {
        updateTask(data.task);
        setModalOpen(false);
      },
    });
  
    const handleUpdate = (payload: TaskType) => {
      mutateUpdateTask({...payload, _id: selected?._id})
    }

    const onActionClose = () => setOpenAction(false);
    const onModalClose = () => setModalOpen(false);

    const onActionSelect = (option: string) => {
        if(option === 'delete'){
          mutateDeleteTasks({ids: [selected?._id]})
        }else {
            setModalOpen(true);
        }
        setOpenAction(false)
      }
  
      const handleAction = (event: React.MouseEvent<HTMLElement>, item: TaskType) => {
        console.log("herrr")
        setSelected(item)
        setActionEl(event.currentTarget);
        setOpenAction((previousOpen) => !previousOpen);
      }
    
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
                <Typography variant='h6' sx={{color: theme.palette.black[100]}}>{item.taskName}</Typography>
                <IconButton
                    sx={{ p: 0 }}
                    onClick={(e) => {
                        e.stopPropagation(); 
                        handleAction(e, item); 
                    }}
                >
                    <Image src={moreIcon} alt='more' />
                </IconButton>
            </Stack>
            <Stack 
                flexDirection="row" 
                alignItems="center" 
                justifyContent="space-between"  
                sx={{px: '16px', mb: '7px', color: theme.palette.black[100_52]}}
            >
                <Typography variant='subtitle2'>{item?.category}</Typography>
                <Typography variant='subtitle2'>
                {typeof item.dueOn === 'string' ? new Date(item.dueOn).toLocaleDateString() : item.dueOn.toLocaleDateString()}
                </Typography>
            </Stack>
            <ActionPopper anchorEl={actionEl} open={openAction} onClose={onActionClose}  onActionSelect={onActionSelect} placement='left-start'/>
            <AddUpdateTaskModal open={modalOpen} handleClose={onModalClose} handleAction={handleUpdate} mode='update' data={selected || null}/>
        </Stack>
    )
}

export default Card