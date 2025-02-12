"use client"
import React, { useEffect, useRef } from 'react';
import { Box, Stack, TextField, Button, Autocomplete, MenuItem, InputAdornment, Select, useTheme } from '@mui/material';
import Image from 'next/image';
import searchIcon from '@/assets/icons/search.svg'
import { useLayoutStore } from '@/lib/zustand/layout';
import ListLayout from '@/components/layout/list';
import BoardLayout from '@/components/layout/board';
import DateRangePicker from '@/components/datePickers/dateRangePicker';

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
  const [category, setCategory] = React.useState<string | null>(null);
  const [dueDate, setDueDate] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState<string>('');
  const [dateRange, setDateRange] = React.useState<[Date | null, Date | null]>([null, null]);

  const { layout  } = useLayoutStore();
  const theme = useTheme();



  const handleCategoryChange = (event: any, value: string | null) => {
    setCategory(value);
  };

  const handleDueDateChange = (event: any, value: string | null) => {
    setDueDate(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };


  return (
    <Stack gap="34px">
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
            <Stack direction="column" spacing={2} alignItems="center">
                <Stack direction="row" spacing={2}>
                <Select
                    id="category"
                    value={category}
                    // onChange={handleCategoryChange}
                    displayEmpty
                    sx={{width: '90px'}}
                    renderValue={(selected) => selected ? selected : 'Category'}
                >
                    <MenuItem value="company">Company</MenuItem>
                    <MenuItem value="work">Work</MenuItem>
                </Select>
                <Select
                  id="date"
                  open={false} 
                  renderValue={(value) => "Due Date"} 
                  // onClick={() => setOpen(true)}
                  displayEmpty
                  sx={{width: '90px'}}
                >

                </Select>
   
                </Stack>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  id="search"
                  value={search}
                  variant='outlined'
                  placeholder='Search'
                  onChange={handleSearchChange}
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
                  >Add Task</Button>
            </Stack>
        </Stack>
        {layout === 'list'  && <ListLayout />}
        {layout === 'board' && <BoardLayout />}
    </Stack>
  );
};

export default Page;

