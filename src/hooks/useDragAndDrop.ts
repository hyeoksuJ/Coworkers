import { useState } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { QueryClient, UseMutationResult } from '@tanstack/react-query';
import { TaskListProps, useTeamStore } from '../stores/teamStore';
import { TaskListUrlParams } from '../api/tasks/taskListAPI';

export default function useDragAndDrop(
  taskLists: TaskListProps[],
  queryClient: QueryClient,
  patchOrderMutation: UseMutationResult<any, unknown, TaskListUrlParams>
) {
  const [isDragging, setIsDragging] = useState(false);
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);
  const thresholdTime = 200;
  // 초기값을 taskLists로 설정
  const [displayedTaskList, setDisplayedTaskList] = useState(() =>
    Array.from(taskLists)
  );

  const { id } = useTeamStore();

  const handleDragStart = () => {
    const timer = setTimeout(() => setIsDragging(true), thresholdTime);
    setClickTimeout(timer);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (clickTimeout !== null) clearTimeout(clickTimeout);

    if (isDragging) {
      const { active, over } = event;
      setIsDragging(false);
      setClickTimeout(null); // 타이머 초기화

      if (over) {
        const newIndex = displayedTaskList.findIndex(
          (item) => item.id === over.id
        );
        const oldIndex = displayedTaskList.findIndex(
          (item) => item.id === active.id
        );

        if (oldIndex !== -1 && newIndex !== -1 && active.id !== over.id) {
          // 드래그 후 순서 변경
          const updatedItems = arrayMove(
            [...displayedTaskList],
            oldIndex,
            newIndex
          ); // 새 배열 생성

          // UI 즉시 업데이트
          setDisplayedTaskList(updatedItems);

          // 서버 요청
          patchOrderMutation.mutate(
            {
              groupId: Number(id),
              id: Number(active.id),
              displayIndex: newIndex,
            },
            {
              onSuccess: () => {
                // 요청이 성공한 경우 쿼리 무효화
                queryClient.invalidateQueries({ queryKey: ['group', id] });
              },
              onError: () => {
                // 요청 실패 시 이전 상태로 복구
                setDisplayedTaskList(taskLists);
              },
            }
          );
        }
      }
    }
  };

  return { isDragging, handleDragStart, handleDragEnd };
}
