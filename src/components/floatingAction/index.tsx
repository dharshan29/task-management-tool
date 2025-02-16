import React, { useState } from 'react'
import { Box, Button, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { useLayoutStore } from '../../lib/zustand/layout';
import { Close } from '@mui/icons-material';
import Image from 'next/image';
import TasksIcon from '@/assets/icons/tasks.svg'
import { removeTasks, updateTaskStatus } from '../../services';
import { useMutation } from '@tanstack/react-query';
import { useTaskStore } from '../../lib/zustand/tasks';
import toast from 'react-hot-toast';


const buttonStyle = {
    height: '27px',
    width: '63px', 
    borderRadius: '12px',
    border: '0.2px solid #FFFFFF',
    background: '#8D8A8A24',
    minHeight: '27px', 
    maxHeight: '27px', 
}

const FloatingAction = () => {
  const { selectedIds, clearSelectedIds } = useLayoutStore();
  const [isVisible, setIsVisible] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  const { deleteTasks, taskStatusUpdate, updateTask } = useTaskStore()
    const { mutate: mutateDeleteTasks, isError } = useMutation({
      mutationFn: removeTasks,
      onSuccess: (data) => {
        deleteTasks(data.deletedIds);
        clearSelectedIds();
        toast.success(data.message)
      },
    });

    const { mutate: mutateUpdateTaskStatus } = useMutation({
      mutationFn: updateTaskStatus,
      onSuccess: (data) => {
        taskStatusUpdate(data.ids, data.status);
        clearSelectedIds();
        toast.success(data.message)
      },
      onError: (error: any) => {
        toast.error(error.response.data.error || error.response.data.message || 'Something went wrong');
      }
    });
  
    const handleDelete = () => {
        mutateDeleteTasks({ids: selectedIds});
    };
    const handleStatusChange = (status: string) => {
        mutateUpdateTaskStatus({ids: selectedIds, status: status});
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(!open);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

  React.useEffect(() => {
    if (selectedIds.length > 0) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [selectedIds])

  return (
      (isVisible && 
        <Box sx={{
            position: 'absolute',
            bottom: '10px',
            width: '365px',
            height: '52px',
            borderRadius: '12px',
            backgroundColor: '#1A1C20',
            transition: 'transform 0.5s ease-in-out',
            left: '50%',
            transform: 'translateX(-50%)'
        }}>
            <Stack flexDirection="row" sx={{justifyContent: 'space-between', px: '10px', height: '100%',}}>
                <Stack flexDirection="row" sx={{ alignItems: 'center', gap: '8px'}}>
                    <Stack flexDirection="row" justifyContent="center" alignItems="center" sx={{height: '27px', width: '139px', borderRadius: '12px', border: `0.2px solid #ffffff`}}>
                        <Typography variant='caption' sx={{fontWeight: 600, color: 'background.default'}}>
                            {selectedIds.length} Tasks Selected
                        </Typography>
                        <IconButton onClick={clearSelectedIds}>
                            <Close  sx={{color: 'background.default', height: '15px', width: '15px'}}/>
                        </IconButton>
                    </Stack>
                    <Image src={TasksIcon} alt='tasks'/>
                </Stack>
                <Stack flexDirection="row" gap="8px" alignItems="center">
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                        PaperProps={{
                          style: {
                            transform: 'translateY(-43%)',
                            backgroundColor: 'background.soft',
                            borderRadius: "12px",
                            border: "1px solid #7B198426",
                            background: "#1A1C20",
                            color: '#ffffff',
                            width: '111px'
                          },
                        }}
                    >
                        <MenuItem onClick={() => handleStatusChange('TO-DO')}>
                            <Typography variant='caption' sx={{fontWeight: 600,fontSize: '12px'}}>
                                TO-DO
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={() => handleStatusChange('IN-PROGRESS')}>
                            <Typography variant='caption' sx={{fontWeight: 600,fontSize: '12px'}}>
                                IN-PROGRESS
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={() => handleStatusChange('COMPLETED')}>
                            <Typography variant='caption' sx={{fontWeight: 600,fontSize: '12px'}}>
                                COMPLETED
                            </Typography>
                        </MenuItem>
                    </Menu>
                    <Button sx={{...buttonStyle}} onClick={handleClick}>
                        <Typography variant='caption' sx={{fontWeight: 600, color: 'background.default', textTransform: 'none'}}>
                            Status
                        </Typography>
                    </Button>
                    <Button onClick={handleDelete} sx={{...buttonStyle, background: '#FF353524', border: '0.2px solid #E13838'}}>
                        <Typography variant='caption' sx={{fontWeight: 600, color: 'error.dark', textTransform: 'none'}}>
                            Delete
                        </Typography>
                    </Button>
                </Stack>
            </Stack>
        </Box>
    )
  )
}

export default FloatingAction