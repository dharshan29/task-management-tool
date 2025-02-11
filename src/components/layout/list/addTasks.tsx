import { Button, Divider, IconButton, Stack, TextField, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import plusIcon from '@/assets/icons/plus.svg'
import addIcon from '@/assets/icons/add.svg'

const AddTaskComponent = () => {
    const theme = useTheme();
    const [addTask, setAddTask] = useState(false);
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
                    onClick={() => setAddTask(true)}
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
            {addTask && 
                <Stack>
                    <Stack flexDirection="row" sx={{height: '114px', py: '13px'}}>
                        <Stack sx={{flex: 0.3}}>
                            <Stack sx={{pl: '77px'}}>
                                <TextField variant='standard' placeholder='Task Title'/>
                                <Stack flexDirection="row" gap="10px">
                                    <Button variant='contained'>
                                        ADD
                                    </Button>
                                    <Button variant='text'>
                                        CANCEL
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack sx={{flex: 0.2}}>

                        </Stack>
                        <Stack sx={{flex: 0.2}}>
                            <IconButton sx={{height: "30px", width: '30px', border: `1px solid ${theme.palette.black[100_20]}`}}>
                                <Image src={addIcon} alt='add' />
                            </IconButton>
                        </Stack>
                        <Stack sx={{flex: 0.3}}>
                            <IconButton sx={{height: "30px", width: '30px', border: `1px solid ${theme.palette.black[100_20]}`}}>
                                <Image src={addIcon} alt='add' />
                            </IconButton>
                        </Stack>
                    </Stack>
                    <Divider sx={{bgcolor: theme.palette.black[100_10]}}/>
                </Stack>
            }
        </Stack>
    )
}

export default AddTaskComponent