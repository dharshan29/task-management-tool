import { Box, Divider, useTheme, Typography, Stack } from '@mui/material';
import BoardContainer from './board';
import { DndContext, useSensor, useSensors, PointerSensor  } from '@dnd-kit/core';
import { TaskType } from '@/services/types';
import { useLayoutStore } from '@/lib/zustand/layout';

const BoardLayout = ({todoTasks, inProgressTasks, completedTasks}: {todoTasks: TaskType[], inProgressTasks: TaskType[], completedTasks: TaskType[]}) => {
    const theme = useTheme();
  const { isDisabled, setDisabled } = useLayoutStore();

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = () => {
    setDisabled(true);
};
  const handleDragEnd = (event: any) => {
    setDisabled(false);
  }

  return (
    <Stack flexDirection="row" gap="24px">
      <DndContext 
          sensors={sensors} 
          onDragStart={handleDragStart} 
          onDragEnd={handleDragEnd}
          onDragCancel={() => setDisabled(false)}
      >
        <BoardContainer items={todoTasks} title={"TO-DO"}/>
        <BoardContainer items={inProgressTasks} title={"IN-PROGRESS"}/>
        <BoardContainer items={completedTasks} title={"COMPLETED"}/>
      </DndContext>
    </Stack>
  );
};

export default BoardLayout;
