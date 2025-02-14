"use client"
import React, { useEffect, useRef } from 'react';
import { Box, Stack, TextField, Button, Autocomplete, MenuItem, InputAdornment, Select, useTheme } from '@mui/material';
import Image from 'next/image';
import searchIcon from '@/assets/icons/search.svg'
import { useLayoutStore } from '@/lib/zustand/layout';
import ListLayout from '@/components/layout/list';
import BoardLayout from '@/components/layout/board';
import DateRangePicker from '@/components/datePickers/dateRangePicker';
import TextEditor from '@/components/textEditor';
import AddUpdateTaskModal from '@/components/addTaskModal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getTasks } from '@/services';
import { useTaskStore } from '@/lib/zustand/tasks';

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

export interface TaskType {
  taskName: string;
  dueOn: Date;
  status: 'TO-DO' | 'IN-PROGRESS' | 'COMPLETED';
  category: 'work' | 'personal';
  description?: string; // Optional
  fileLinks?: string[]; // Optional
}

const dueDateOptions: DueDateOption[] = [
  { label: 'Today', value: 'today' },
  { label: 'Tomorrow', value: 'tomorrow' },
  { label: 'This Week', value: 'this-week' },
  // Add more options as needed
];

const Page = () => {
  
  const [category, setCategory] = React.useState<string>('');
  // const [dueDate, setDueDate] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState<string>('');
  const [dateRange, setDateRange] = React.useState<[Date | null, Date | null]>([null, null]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { layout  } = useLayoutStore();
  const { setTasks, tasks } = useTaskStore()
  const theme = useTheme();
  const { mutate: fetchTasks, isError } = useMutation({
    mutationFn: getTasks,
    onSuccess: (data) => {
      setTasks(data.tasks);
    },
  });
  
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


  return (
    <Stack gap="34px">
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
            <Stack direction="column" spacing={2} alignItems="center">
                <Stack direction="row" spacing={2}>
                <Select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    displayEmpty
                    sx={{width: '90px'}}
                    renderValue={(selected) => selected ? selected : 'Category'}
                >
                    <MenuItem value="company">Company</MenuItem>
                    <MenuItem value="work">Work</MenuItem>
                </Select>
                <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
                </Stack>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  id="search"
                  value={search}
                  variant='outlined'
                  placeholder='Search'
                  onChange={(e) => setSearch(e.target.value)}
                  sx={{height: '36px'}}
                  slotProps={{
                    input: {
                    startAdornment: <InputAdornment position="start" sx={{margin: 0}}>
                        <Image src={searchIcon} alt='search'/>
                    </InputAdornment>,
                    },
                }}
                />
                <Button variant="contained" 
                  sx={{ 
                    height: '48px', 
                    width: '152px',
                    borderRadius: '41px', 
                    bgcolor: theme.palette.secondary.main,
                    transition: 'transform 300ms ease-in-out',
                    transform: 'translateX(0)'
                  }} 
                  onClick={handleOpen}
                  >Add Task</Button>
                  <AddUpdateTaskModal open={open} handleClose={handleClose} />
            </Stack>
        </Stack>
        {layout === 'list'  && <ListLayout />}
        {layout === 'board' && <BoardLayout />}
    </Stack>
  );
};

export default Page;

