import { Box, Divider, useTheme, Typography, Stack } from '@mui/material';
import Table from '../../table/table'
import AddTaskComponent from './addTasks';
import RowComponent from './row';
import DateRangePicker from '../../datePickers/dateRangePicker';
import SingleDatePicker from '../../datePickers/singleDatePicker';
import { TaskType } from '@/services/types';


const ListLayout = ({ todoTasks, inProgressTasks, completedTasks}: {todoTasks: TaskType[], inProgressTasks: TaskType[], completedTasks: TaskType[]}) => {
    const theme = useTheme();

    const isLoading = false;
    

  return (
    <Box>
      <Divider sx={{bgcolor: theme.palette.black[100_10]}}/>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
        <Typography variant="h6" sx={{ flex: 0.3, textAlign: 'start', fontSize: '14px', color: theme.palette.black[100_60] }}>Task Name</Typography>
        <Typography variant="h6" sx={{ flex: 0.2, textAlign: 'start', fontSize: '14px', color: theme.palette.black[100_60] }}>Due on</Typography>
        <Typography variant="h6" sx={{ flex: 0.2, textAlign: 'start', fontSize: '14px', color: theme.palette.black[100_60] }}>Task Status</Typography>
        <Typography variant="h6" sx={{ flex: 0.3, textAlign: 'start', fontSize: '14px', color: theme.palette.black[100_60] }}>Task Category</Typography>
      </Box>

        <Stack gap="32px">
            <Table
                data={todoTasks}
                header="TO-DO"
                isLoading={isLoading}
                row={RowComponent}
                addTaskComponent={AddTaskComponent}
            />
            <Table
                data={inProgressTasks}
                header="IN-PROGRESS"
                isLoading={isLoading}
                row={RowComponent}
            />
            <Table
                data={completedTasks}
                header="COMPLETED"
                isLoading={isLoading}
                row={RowComponent}
            />
        </Stack>
    </Box>
  );
};

export default ListLayout;
