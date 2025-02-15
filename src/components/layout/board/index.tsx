import { DndContext, useSensor, useSensors, PointerSensor, DragOverlay } from '@dnd-kit/core';
import { useLayoutStore } from '@/lib/zustand/layout';
import { TaskType } from '@/services/types';
import { useTaskStore } from '@/lib/zustand/tasks';
import BoardContainer from './board';
import { update_Task, updateTaskStatus } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Card from './card';

const BoardLayout = ({ todoTasks, inProgressTasks, completedTasks }: { todoTasks: TaskType[], inProgressTasks: TaskType[], completedTasks: TaskType[] }) => {
  const [activeCard, setActiveCard] = useState<TaskType | null>(null);
  const { isDisabled, setDisabled } = useLayoutStore();
  const sensors = useSensors(useSensor(PointerSensor));
  const { taskStatusUpdate } = useTaskStore();

  const { mutate: mutateUpdateTaskStatus } = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: (data) => {
      taskStatusUpdate(data.ids, data.status);
    },
  });

  const handleDragStart = (event: any) => {
    setActiveCard(event.active.data.current?.item || null);
    setDisabled(true)
  };
  
  const handleDragEnd = (event: any) => {
    setActiveCard(null);
    setDisabled(false);
    
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id; // The board container ID

    if (!["TO-DO", "IN-PROGRESS", "COMPLETED"].includes(newStatus)) return;

    // Update task status
    mutateUpdateTaskStatus({ ids: [taskId], status: newStatus });
  };

  return (
    <Stack flexDirection="row" gap="24px">
      <DndContext onDragEnd={handleDragEnd} >
        <BoardContainer items={todoTasks} title="TO-DO" status="TO-DO" />
        <BoardContainer items={inProgressTasks} title="IN-PROGRESS" status="IN-PROGRESS" />
        <BoardContainer items={completedTasks} title="COMPLETED" status="COMPLETED" />
        {/* {createPortal(
          <DragOverlay>
              {activeCard ? <Card item={activeCard} /> : null}
          </DragOverlay>,
          document.body
      )} */}
    </DndContext>
    </Stack>
  );
};

export default BoardLayout;
