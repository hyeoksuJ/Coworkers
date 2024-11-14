import { useState, useEffect } from 'react';

interface StoredTaskList {
  name: string;
  color: string;
}

export default function useTaskListStorage(groupId: string) {
  const [taskLists, setTaskLists] = useState<StoredTaskList[]>([]);

  useEffect(() => {
    const taskListString = localStorage.getItem(`TaskLists_${groupId}`);
    if (taskListString) {
      try {
        const parsedData = JSON.parse(taskListString);
        setTaskLists(parsedData);
      } catch (error) {
        console.error(
          '로컬 스토리지에서 TaskLists를 파싱하는 중 오류 발생:',
          error
        );
      }
    }
  }, [groupId]);

  const updateTaskList = (newTaskList: StoredTaskList) => {
    setTaskLists((prev) => {
      const updatedList = [...prev];
      const index = updatedList.findIndex(
        (task) => task.name === newTaskList.name
      );
      if (index !== -1) {
        updatedList[index] = newTaskList;
      } else {
        updatedList.push(newTaskList);
      }
      localStorage.setItem(`TaskLists_${groupId}`, JSON.stringify(updatedList));
      return updatedList;
    });
  };

  // TaskList 삭제 함수
  const deleteStoredTaskList = (taskName: string) => {
    setTaskLists((prev) => {
      const updatedList = prev.filter((task) => task.name !== taskName);
      localStorage.setItem(`TaskLists_${groupId}`, JSON.stringify(updatedList));
      return updatedList;
    });
  };

  return { taskLists, updateTaskList, deleteStoredTaskList };
}
