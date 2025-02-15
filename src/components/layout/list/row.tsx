import { Box, Button, IconButton, Stack, TableCell, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import selectIcon from '@/assets/icons/select.svg';
import dragIcon from '@/assets/icons/drag.svg';
import unCheckedIcon from '@/assets/icons/unchecked.svg';
import CheckedIcon from '@/assets/icons/checkmark-green.svg';
import CheckmarkIcon from '@/assets/icons/checkmark.svg';
import AddPopper from '@/components/customPopper/addPopper';
import moreIcon from '@/assets/icons/more.svg'
import { TaskType } from '@/services/types';
import ActionPopper from '@/components/customPopper/actionPopper';
import { useTaskStore } from '@/lib/zustand/tasks';
import { useMutation } from '@tanstack/react-query';
import { getTaskActivities, removeTasks, update_Task, updateTaskStatus } from '@/services';
import AddUpdateTaskModal from '@/components/addTaskModal';
import { useLayoutStore } from '@/lib/zustand/layout';
import { useDraggable } from '@dnd-kit/core';
import { useActivityStore } from '@/lib/zustand/activity';

interface RowProps {
  data: TaskType
}

const RowComponent: React.FC<RowProps> = ({ data }) => {
  const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [actionEl, setActionEl] = useState<HTMLElement | null>(null);
    const [open, setOpen] = useState(false);
    const [openAction, setOpenAction] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selected, setSelected] = useState("false");
    const [selectedStatusId, setSelectedtatusId] = useState("");
    const [selectedTask, setSelectedTask] = useState<TaskType>();

    const statusOptions = ['TO-DO', 'IN-PROGRESS', 'COMPLETED'];

    const { attributes, listeners, setNodeRef, transform } = useDraggable({ 
      id: data._id || '', 
      data: { data } 
  });

  const style = transform ? {
    transform: `translate(${transform.x}px, ${transform.y}px)`,
  } : undefined

    const { selectedIds, toggleSelectedId } = useLayoutStore();
    const { deleteTasks, taskStatusUpdate } = useTaskStore()
    const { setActivities } = useActivityStore();
    const { mutate: mutateDeleteTasks, isError } = useMutation({
      mutationFn: removeTasks,
      onSuccess: (data) => {
        deleteTasks(data.deletedIds);
      },
    });

    const { updateTask } = useTaskStore()
    const { mutate: mutateUpdateTask, isPending } = useMutation({
      mutationFn: update_Task,
      onSuccess: (data) => {
        updateTask(data.task);
        setModalOpen(false);
      },
    });

    const { mutate: mutateUpdateTaskStatus } = useMutation({
      mutationFn: updateTaskStatus,
      onSuccess: (data) => {
        taskStatusUpdate(data.ids, data.status);
        setModalOpen(false);
      },
    });
  
    const handleUpdate = (payload: TaskType) => {
      mutateUpdateTask({...payload, _id: selectedTask?._id})
    }

    const onClose = () => setOpen(false);
    const onActionClose = () => setOpenAction(false);
    const onModalClose = () => setModalOpen(false);
    
    const onSelect = (option: string) => {
        console.log(option);
        mutateUpdateTaskStatus({ids: [selectedStatusId], status: option})
        setOpen(false);
    };


    const onActionSelect = (option: string) => {
      if(option === 'delete'){
        mutateDeleteTasks({ids: [selectedTask?._id]})
      }else {
        setModalOpen(true);
        console.log(selectedTask)
      }
      setOpenAction(false)
    }

    const handleAction = (event: React.MouseEvent<HTMLElement>, item: TaskType) => {
      setSelectedTask(item)
      setActionEl(event.currentTarget);
      setOpenAction((previousOpen) => !previousOpen);
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>, item: TaskType) => {
        setSelectedtatusId(item?._id || "");
        setSelected(item?.status)
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const fetchActivities = async (taskId: any) => {
      try {
          const data = await getTaskActivities(taskId);
          setActivities(data?.activities)
          console.log({data})
      } catch (error) {
          console.log(error)
      }
    }

    useEffect(() => {
      if(selectedTask) {
        fetchActivities(selectedTask._id || "")
      }
    }, [selectedTask])

    const isLaptop = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <TableRow 
      ref={setNodeRef}
      style={style}
      hover sx={{height: '48px'}}>
      <TableCell component="th" scope="row" sx={{width: {xs: '100%', sm : '30%'}, backgroundColor: 'background.paper'}}>
        <Stack flexDirection="row" alignItems="center">
            <IconButton sx={{ p:0, pr: {xs: '4px', sm : 0} }} onClick={() => toggleSelectedId(data._id ?? '')}>
              {selectedIds.includes(data._id || '') ? <Image src={CheckmarkIcon} alt='unselect'/> : <Image src={selectIcon} alt='select'/>}
            </IconButton>
            <IconButton sx={{ p:0 , display: {xs: 'none', sm: 'block'}}} 
              {...attributes}
              {...listeners}
            >
              <Image src={dragIcon} alt='drag'/>
            </IconButton>
            <Image src={data.status === "COMPLETED" ? CheckedIcon : unCheckedIcon} alt='uncheck'/>
            <Typography sx={{pl: '5px', fontWeight: 500, color: theme.palette.black[100], textDecoration: data.status === "COMPLETED" ? 'line-through' : 'none'}} variant='body2'>
                {data.taskName}
            </Typography>
            <Stack flex={1} sx={{display: {xs: 'flex' , sm: 'none'}, alignItems: 'flex-end'}}>
              <IconButton sx={{width: 'fit-content'}}  onClick={(e) => handleAction(e, data)}>
                  <Image src={moreIcon} alt='more' />
              </IconButton>
            </Stack>
        </Stack>
      </TableCell>
      {isLaptop && <TableCell component="th" scope="row" sx={{width: '20%', pl: 0}}>
        <Typography variant='body2' sx={{fontWeight: 500, color: theme.palette.black[100]}}>
            {typeof data.dueOn === 'string' ? new Date(data.dueOn).toLocaleDateString() : data.dueOn.toLocaleDateString()}
          </Typography>
      </TableCell>
      }
      {isLaptop && <TableCell component="th" scope="row" sx={{width: '20%', pl: 0}}>
        <Button onClick={(e) => handleClick(e, data)} sx={{p:'4px 10px',height: '28px !important', background: theme.palette.border[300], borderRadius: '4px', width: 'fit-content'}}>
          <Typography variant='body2' sx={{fontWeight: 500, color: theme.palette.black[100]}}>
                {data.status}
            </Typography>
        </Button>
      </TableCell>
      }
      {isLaptop && 
        <TableCell component="th" scope="row" sx={{ pl: 0}}>
          <Stack sx={{width: '100%', flexDirection: 'row' , alignItems: "center", justifyContent: 'space-between'}}>
            <Typography variant='body2' sx={{fontWeight: 500, color: theme.palette.black[100]}}>
                  {data.category}
            </Typography>
            <IconButton onClick={(e) => handleAction(e, data)}>
                <Image src={moreIcon} alt='more' />
            </IconButton>
          </Stack>
        </TableCell>
      }
      <AddPopper anchorEl={anchorEl} open={open} onClose={onClose} options={statusOptions || []} onSelect={onSelect} selected={selected} placement='bottom'/>
      <ActionPopper anchorEl={actionEl} open={openAction} onClose={onActionClose}  onActionSelect={onActionSelect} placement='left-start'/>
      <AddUpdateTaskModal open={modalOpen} handleClose={onModalClose} loading={isPending} handleAction={handleUpdate} mode='update' data={selectedTask || null}/>
    </TableRow>
  )
}

export default RowComponent