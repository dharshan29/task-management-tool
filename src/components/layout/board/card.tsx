import { IconButton, Stack, Typography, useTheme } from '@mui/material'
import Image from 'next/image';
import moreIcon from '@/assets/icons/more.svg'
import React, { useState } from 'react'
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { TaskType } from '../../../services/types';
import ActionPopper from '../../customPopper/actionPopper';
import { useMutation } from '@tanstack/react-query';
import { useTaskStore } from '../../../lib/zustand/tasks';
import { removeTasks, update_Task } from '../../../services';
import { useLayoutStore } from '../../../lib/zustand/layout';
import AddUpdateTaskModal from '../../addTaskModal';
import toast from 'react-hot-toast';

const Card = ({item}: {item: TaskType}) => {
    const theme = useTheme();
    
    const [modalOpen, setModalOpen] = useState(false);
    const [openAction, setOpenAction] = useState(false);
    const [actionEl, setActionEl] = useState<HTMLElement | null>(null);
    const [selected, setSelected] = useState<TaskType>();

    const { isDisabled, setDisabled } = useLayoutStore();
    
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ 
        id: item._id || '', 
        disabled: isDisabled,
        data: { item } 
    });


    const style = transform ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
    } : undefined

    const { deleteTasks } = useTaskStore()
    const { mutate: mutateDeleteTasks } = useMutation({
      mutationFn: removeTasks,
      onSuccess: (data) => {
        deleteTasks(data.deletedIds);
        setDisabled(false)
        toast.success(data.message)
      },
      onError: (error: any) => {
        toast.error(error.response.data.error || error.response.data.message || 'Something went wrong');
      }
    });

    const { updateTask } = useTaskStore()
    const { mutate: mutateUpdateTask, isPending } = useMutation({
      mutationFn: update_Task,
      onSuccess: (data) => {
        updateTask(data.task);
        setModalOpen(false);
        setDisabled(false)
        toast.success(data.message)
      }, 
      onError: (error: any) => {
        toast.error(error.response.data.error || error.response.data.message || 'Something went wrong');
      }
    });
  
    const handleUpdate = (payload: TaskType) => {
      mutateUpdateTask({...payload, _id: selected?._id})
    }

    const onActionClose = () => {
        setDisabled(false)
        setOpenAction(false);
    }
    const onModalClose = () => {
        setModalOpen(false)
        setDisabled(false)
    };

    const onActionSelect = (option: string) => {
        if(option === 'delete'){
          mutateDeleteTasks({ids: [selected?._id]})
        } else {
            setModalOpen(true);
        }
        setOpenAction(false)
      }
  
    const handleAction = (event: React.MouseEvent<HTMLElement>, item: TaskType) => {
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
                bgcolor: theme.palette.background.default,
                cursor: isDisabled ? 'pointer' : 'grab'
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
                        setDisabled(true)
                        handleAction(e, item); 
                    }}
                    onPointerDown={(e) => {
                        e.stopPropagation(); 
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
            <AddUpdateTaskModal open={modalOpen} loading={isPending} handleClose={onModalClose} handleAction={handleUpdate} mode='update' data={selected || null}/>
        </Stack>
    )
}

export default Card
