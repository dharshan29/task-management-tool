import { Box, Divider, useTheme, Typography } from '@mui/material';
import Table from '../../table/table'

const ListLayout = () => {
    const theme = useTheme();
    const todoData = [
      { taskName: "Task 1", dueOn: "2023-01-01", taskStatus: "TO-DO", taskCategory: "Work" },
      { taskName: "Task 2", dueOn: "2023-01-02", taskStatus: "TO-DO", taskCategory: "Personal" },
      { taskName: "Task 3", dueOn: "2023-01-03", taskStatus: "TO-DO", taskCategory: "Work" },
    ];

    const inProgressData = [
      { taskName: "Task 4", dueOn: "2023-01-04", taskStatus: "IN-PROGRESS", taskCategory: "Work" },
      { taskName: "Task 5", dueOn: "2023-01-05", taskStatus: "IN-PROGRESS", taskCategory: "Personal" },
      { taskName: "Task 6", dueOn: "2023-01-06", taskStatus: "IN-PROGRESS", taskCategory: "Work" },
    ];

    const completedData = [
      { taskName: "Task 7", dueOn: "2023-01-07", taskStatus: "COMPLETED", taskCategory: "Work" },
      { taskName: "Task 8", dueOn: "2023-01-08", taskStatus: "COMPLETED", taskCategory: "Personal" },
      { taskName: "Task 9", dueOn: "2023-01-09", taskStatus: "COMPLETED", taskCategory: "Work" },
    ];

    const isLoading = false;
    const CouponCode = () => <div>Coupon Code Component</div>; // Assuming this is a placeholder for a component that will be used for each row

  return (
    <Box>
      <Divider sx={{bgcolor: theme.palette.black[100_10]}}/>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
        <Typography variant="h6" sx={{ flex: 0.3, textAlign: 'start' }}>Task Name</Typography>
        <Typography variant="h6" sx={{ flex: 0.2, textAlign: 'start' }}>Due On</Typography>
        <Typography variant="h6" sx={{ flex: 0.2, textAlign: 'start' }}>Task Status</Typography>
        <Typography variant="h6" sx={{ flex: 0.3, textAlign: 'start' }}>Task Category</Typography>
      </Box>

      <Table
        data={todoData}
        isLoading={isLoading}
        row={CouponCode}
      />
      <Table
        data={inProgressData}
        isLoading={isLoading}
        row={CouponCode}
      />
      <Table
        data={completedData}
        isLoading={isLoading}
        row={CouponCode}
      />
    </Box>
  );
};

export default ListLayout;
