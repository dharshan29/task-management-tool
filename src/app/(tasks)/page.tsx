"use client"
import React, { useEffect, useRef } from 'react';
import { Box, Stack, TextField, Button, Autocomplete, MenuItem, InputAdornment, Select, useTheme, Typography, IconButton, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import searchIcon from '@/assets/icons/search.svg'
import { useLayoutStore } from '@/lib/zustand/layout';
import ListLayout from '../../components/layout/list';
import BoardLayout from '../../components/layout/board';
import DateRangePicker from '../../components/datePickers/dateRangePicker';
import AddUpdateTaskModal from '../../components/addTaskModal';
import { useMutation, useQuery } from '@tanstack/react-query';
import {  add_task, getTasks } from '../../services';
import { useTaskStore } from '../../lib/zustand/tasks';
import { TaskType } from '../../services/types';
import FloatingAction from '../../components/floatingAction';
import { ArrowDropDown, Cancel, CancelOutlined, Close, KeyboardArrowDownOutlined } from '@mui/icons-material';
import toast from 'react-hot-toast';
import NotFound from './not-found';

interface CategoryOption {
  label: string;
  value: string;
}

const categoryOptions: CategoryOption[] = [
  { label: 'Category 1', value: 'category-1' },
  { label: 'Category 2', value: 'category-2' },
  // Add more options as needed
];

interface DueDateOption {
  label: string;
  value: string;
}

const dueDateOptions: DueDateOption[] = [
  { label: 'Today', value: 'today' },
  { label: 'Tomorrow', value: 'tomorrow' },
  { label: 'This Week', value: 'this-week' },
  // Add more options as needed
];

const Page = () => {
  const [task, setTask] = React.useState({
    taskName: '',
    description: '',
    dueOn: null as Date | null,
    status: '',
    category: ''
  });
  const [category, setCategory] = React.useState<string>('');
  // const [dueDate, setDueDate] = React.useState<string | null>(null);

  const [search, setSearch] = React.useState<string>('');
  const [dateRange, setDateRange] = React.useState<[Date | null, Date | null]>([null, null]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const { layout, setLayout , selectedIds } = useLayoutStore();
  const { setTasks, tasks } = useTaskStore()
  const theme = useTheme();
  const { mutate: fetchTasks, isError } = useMutation({
    mutationFn: getTasks,
    onSuccess: (data) => {
      setTasks(data.tasks);
    },
  });

  const { addTask } = useTaskStore()
  const { mutate: createTask, isPending } = useMutation({
    mutationFn: add_task,
    onSuccess: (data) => {
      addTask(data.task);
      handleClose();
      toast.success(data.message);
    },
    onError: (error: any) => {
      console.log(error)
      toast.error(error.response.data.error || error.response.data.message || 'Something went wrong');
    }
  });

  const handleCreate = (payload: TaskType) => {
    createTask(payload)
  }

  
  useEffect(() => {
    fetchTasks({
      search,
      category,
      dueOnStart: dateRange[0]?.toISOString(),
      dueOnEnd: dateRange[1]?.toISOString(),
      sort: 'asc',
    });
  }, [search, category, dateRange]);
  
  console.log({tasks})

  const isLaptop = useMediaQuery(theme.breakpoints.up('sm'))
  useEffect(() => {
    if(!isLaptop && layout === "board"){
      setLayout("list")
    }
  }, [isLaptop])

  const todoTasks = tasks.filter(task => task.status === 'TO-DO');
  const inProgressTasks = tasks.filter(task => task.status === 'IN-PROGRESS');
  const completedTasks = tasks.filter(task => task.status === 'COMPLETED');


  return (
    <Stack gap="34px">
        <Stack spacing={2} sx={{ justifyContent: 'space-between', flexDirection: {xs: 'column', sm: 'row'} }}>
            <Stack sx={{display: {xs: 'flex', sm: 'none', alignItems: 'flex-end'}}}>
              <Button variant="contained" 
                  sx={{ 
                        height: '48px', 
                        width: '86px',
                        borderRadius: '41px', 
                        bgcolor: theme.palette.secondary.main,
                        transition: 'transform 300ms ease-in-out',
                        transform: 'translateX(0)',
                        fontSize: '10px'
                      }} 
                      onClick={handleOpen}
                >
                  Add Task
                </Button>
                <AddUpdateTaskModal
                      open={open} 
                      loading={isPending}
                      handleClose={handleClose} 
                      handleAction={handleCreate}
                      data={null}
                      mode="add"
                  />
            </Stack>
            <Stack direction="row" alignItems="center">
                <Stack  gap="10px" sx={{flexDirection: {xs: "column" , sm: "row"}, alignItems:{xs: "flex-start" , sm: "center"}, }}>
                  <Typography variant='caption' sx={{flex: 1,fontWeight: 600, color: theme.palette.black[100_60]}}>
                      Filter by:
                  </Typography>
                  <Stack flexDirection="row" gap="10px" >
                    <Select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    displayEmpty
                    IconComponent={(props) =>
                     category === "" && <KeyboardArrowDownOutlined sx={{top: '7px !important', height: '15px', width: '15px'}} {...props} />
                    }
                    endAdornment={
                      category && (
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevents the dropdown from opening
                            setCategory("");
                          }}
                          sx={{ padding: "0px" }}
                        >
                          <Close fontSize="small" sx={{height: '15px', width: '15px'}}/>
                        </IconButton>
                      )
                    }
                    sx={{
                      fontSize: '12px', 
                      width: '90px', 
                      '& .MuiSelect-select': {
                        fontSize: '12px', 
                        padding: '8px', // Adjust padding if needed
                      },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          width: '90px',
                          bgcolor: 'background.soft',
                          borderRadius: "12px",
                          border: "1px solid #7B198426",
                          fontSize: '12px',
                          '& .MuiMenuItem-root': {
                            fontSize: '12px',
                            '&:hover': { bgcolor: '#F1F1F1' },
                            '&.Mui-selected': { bgcolor: '#7B1984', color: 'white' },
                          },
                        },
                      },
                    }}
                    renderValue={(selected) => selected ? selected : 'Category'}
                  >
                    <MenuItem value="work">Work</MenuItem>
                    <MenuItem value="personal">Personal</MenuItem>
                  </Select>
                  <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
                  </Stack>
                </Stack>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                  id="search"
                  value={search}
                  variant="outlined"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  sx={{ height: '36px', width:{xs:'100%', sm: '204px' }}}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ margin: 0 }}>
                        <Image src={searchIcon} alt="search" />
                      </InputAdornment>
                    ),
                    endAdornment: search && (
                      <InputAdornment position="end">
                        <IconButton
                          sx={{p:0, px: '4px'}}
                          onClick={() => setSearch('')}
                          edge="end"
                        >
                          <CancelOutlined sx={{height: "20px", width: '20px'}} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button variant="contained" 
                    sx={{ 
                      display: {xs: 'none', sm: 'block'},
                      height: '48px', 
                      width: '152px',
                      borderRadius: '41px', 
                      bgcolor: theme.palette.secondary.main,
                      transition: 'transform 300ms ease-in-out',
                      transform: 'translateX(0)'
                    }} 
                    onClick={handleOpen}
                    >Add Task
                  </Button>
                  <AddUpdateTaskModal
                    open={open} 
                    loading={isPending}
                    handleClose={handleClose} 
                    handleAction={handleCreate}
                    data={null}
                    mode="add"
                  />
            </Stack>
        </Stack>
        {tasks.length === 0 ? 
        <NotFound /> :
        <>
          {layout === 'list'  && <ListLayout  todoTasks={todoTasks}  inProgressTasks={inProgressTasks} completedTasks={completedTasks} />}
          {layout === 'board' && <BoardLayout todoTasks={todoTasks} inProgressTasks={inProgressTasks} completedTasks={completedTasks} />}
        </>
        }
        {selectedIds.length > 0 && <FloatingAction />}
    </Stack>
  );
};

export default Page;

