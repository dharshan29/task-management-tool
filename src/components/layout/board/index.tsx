import { Box, Divider, useTheme, Typography, Stack } from '@mui/material';
import BoardContainer from './board';
import { DndContext } from '@dnd-kit/core';

const BoardLayout = () => {
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


  return (
    <Stack flexDirection="row" gap="24px">
      <DndContext>
        <BoardContainer items={todoData} title={"TO-DO"}/>
        <BoardContainer items={inProgressData} title={"IN-PROGRESS"}/>
        <BoardContainer items={completedData} title={"COMPLETED"}/>
      </DndContext>
    </Stack>
  );
};

export default BoardLayout;
