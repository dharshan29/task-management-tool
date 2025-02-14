import { Button, Divider, IconButton, Stack, TextField, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import plusIcon from '@/assets/icons/plus.svg'
import addIcon from '@/assets/icons/add.svg'
import enterIcon from '@/assets/icons/enter.svg'
import SingleDatePicker from '@/components/datePickers/singleDatePicker'
import AddPopper from '@/components/customPopper/addPopper'
import { useTaskStore } from '@/lib/zustand/tasks'
import { useMutation } from '@tanstack/react-query'
import { add_task } from '@/services'


// const statusOptions = ['TO-DO', 'IN-PROGRESS', 'COMPLETED'];
// const categoryOptions = ['Work', 'Personal'];

const values = {
    statusOptions: ['TO-DO', 'IN-PROGRESS', 'COMPLETED'],
    categoryOptions: ['work', 'personal']
}
const AddTaskComponent = () => {
    const theme = useTheme();
    const [showTask, setShowTask] = useState(false);
    const [optionKey, setOptionKey] = useState<string>('');
    const [options, setOptions] = useState<string[] | undefined>(undefined);
    // input states
    const [text, setText] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    // options popper
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [open, setOpen] = useState(false);

    const { addTask } = useTaskStore()
    const { mutate: createTask, isError } = useMutation({
      mutationFn: add_task,
      onSuccess: (data) => {
        addTask(data.task);
        reset();
      },
    });
  
    const handleCreate = () => {
      createTask({taskName: text, dueOn: selectedDate ?? new Date(), category, status })
    }

    const onClose = () => {
        setOpen(false);
    }

    const handleClose = () => {
        reset();
        setShowTask(false)
    }
    const reset = () => {
        setText("");
        setSelectedDate(null);
        setStatus('')
        setCategory('')
    }

    const onSelect = (option: string) => {
        console.log(option);
        if(optionKey === 'statusOptions'){
            setStatus(option);
        }else if(optionKey === 'categoryOptions'){
            setCategory(option)
        }
        setOpen(false);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>, option: keyof typeof values) => {
        setOptionKey(option);
        setOptions(values[option])
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    return (
        <Stack>
            <Stack>
                <Stack flexDirection="row" gap="4px" 
                    sx={{
                        height: '44px', 
                        alignItems: 'center', 
                        width: 'fit-content', 
                        ml: '55px', cursor: 'pointer'
                    }}
                    onClick={() => setShowTask(true)}
                >
                    <Image src={plusIcon} alt='plus'/>
                    <Typography variant='body2' sx={{
                        fontWeight: 700, 
                        textTransform: 'uppercase',
                        color: theme.palette.black[100_8]
                    }}>
                        Add task
                    </Typography>
                </Stack>
            </Stack>
            <Divider sx={{bgcolor: theme.palette.black[100_10]}}/>
            {showTask && 
                <Stack>
                    <Stack flexDirection="row" sx={{height: '114px', pt: '13px', pb: '25px'}}>
                        <Stack sx={{flex: 0.3}}>
                            <Stack sx={{pl: '77px', height: '100%', justifyContent: 'space-between'}}>
                                <TextField variant='standard' placeholder='Task Title' value={text} onChange={(e) => setText(e.target.value)}/>
                                <Stack flexDirection="row" gap="10px">
                                    <Button variant='contained'     
                                        onClick={handleCreate}
                                        sx={{height: '30px !important', width: '84px', bgcolor: theme.palette.secondary.main, borderRadius: '60px'}}
                                        endIcon={<Image src={enterIcon} alt="add"/>}
                                    >
                                        ADD
                                    </Button>
                                    <Button variant='text'
                                        onClick={handleClose}
                                         sx={{height: '30px !important', width: '90px', borderRadius: '60px'}}
                                    >
                                        CANCEL
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack sx={{flex: 0.2}}>
                            <SingleDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                        </Stack>
                        <Stack sx={{flex: 0.2}}>
                            <IconButton onClick={(e) => handleClick(e, 'statusOptions')} sx={{height: "30px", width: '30px', border: `1px solid ${theme.palette.black[100_20]}`}}>
                                <Image src={addIcon} alt='add' />
                            </IconButton>
                        </Stack>
                        <Stack sx={{flex: 0.3}}>
                            <IconButton onClick={(e) => handleClick(e, 'categoryOptions')}  sx={{height: "30px", width: '30px', border: `1px solid ${theme.palette.black[100_20]}`}}>
                                <Image src={addIcon} alt='add' />
                            </IconButton>
                        </Stack>
                        <AddPopper 
                            anchorEl={anchorEl} 
                            open={open} 
                            onClose={onClose} 
                            options={options || []} 
                            onSelect={onSelect} 
                            selected={optionKey === "statusOptions" ? status : category} 
                            placement='right-start'
                        />
                    </Stack>
                    <Divider sx={{bgcolor: theme.palette.black[100_10]}}/>
                </Stack>
            }
        </Stack>
    )
}

export default AddTaskComponent