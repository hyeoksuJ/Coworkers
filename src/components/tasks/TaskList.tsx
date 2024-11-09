import Link from 'next/link';
import { useEffect, useCallback, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useTaskListStore } from '@/src/stores/taskListStore';
import getResponsiveValue from '@utils/getResponsiveValue';
import TextButtonMotion from '@components/@shared/animation/TextButtonMotion';
import TaskCard from './TaskCard';
import NoTaskCard from './UI/NoTaskCard';
import ListPagination from './UI/ListPagination';

export default function TaskList() {
  const router = useRouter();
  const { query } = router;
  const { teamid, taskListId } = query;
  const { setSelectedTaskListName, taskLists, setTaskListId, tasks, setTasks } =
    useTaskListStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const ulRef = useRef<HTMLUListElement | null>(null);

  // 선택된 taskList의 tasks[]를 가져오는 함수
  const fetchTasks = useCallback(
    (queryTaskListId: number | undefined) => {
      const selectedList = taskLists.find(
        (taskList) => taskList.id === queryTaskListId
      );
      setTasks(selectedList ? selectedList.tasks : []);
      setSelectedTaskListName(selectedList ? selectedList.name : '');
    },
    [taskLists, setTasks, setSelectedTaskListName]
  );

  const getInitPage = (queryTaskListId: number | undefined) => {
    if (queryTaskListId !== undefined && itemsPerPage > 0) {
      const selectedIndex = taskLists.findIndex(
        (taskList) => taskList.id === queryTaskListId
      );

      if (selectedIndex !== -1) {
        const newPage = Math.floor(selectedIndex / itemsPerPage) + 1;
        setCurrentPage(newPage);
      }
    }
  };

  useEffect(() => {
    let id: number | undefined;

    if (taskListId) {
      id = Number(taskListId);
      setTaskListId(id);
      fetchTasks(id);
    } else if (teamid) {
      id = Number(teamid);
      setTaskListId(id);
      fetchTasks(id);
      getInitPage(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskListId, teamid, setTaskListId, fetchTasks]);

  // 페이지당 항목 수 계산
  const updateItemsPerPage = useCallback(() => {
    if (ulRef.current) {
      const containerWidth = ulRef.current.getBoundingClientRect().width;
      const itemWidth = getResponsiveValue(150, 200, 250);
      const newItemsPerPage = Math.floor(containerWidth / itemWidth);
      setItemsPerPage(newItemsPerPage);
      setCurrentPage((prevPage) =>
        Math.min(prevPage, Math.ceil(taskLists.length / newItemsPerPage))
      );
    }
  }, [taskLists.length]);

  // ResizeObserver를 사용하여 넓이 측정
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      updateItemsPerPage();
    });

    const currentUlRef = ulRef.current;
    if (currentUlRef) {
      observer.observe(currentUlRef);
    }

    return () => {
      if (currentUlRef) {
        observer.unobserve(currentUlRef);
      }
    };
  }, [updateItemsPerPage]);

  // 페이지 변경 시 재계산
  useEffect(() => {
    updateItemsPerPage();
  }, [currentPage, updateItemsPerPage]);

  const totalPages = Math.ceil(taskLists.length / itemsPerPage);

  // 남은 배열 슬라이스
  const sliceTaskLists = taskLists.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <ul ref={ulRef} className="flex w-full justify-around gap-3">
        {sliceTaskLists.map((taskList) => (
          <li
            key={taskList.id}
            className={`max-w-[250px] overflow-hidden pt-1 text-center ${
              Number(taskListId) === taskList.id ||
              (taskListId === undefined && Number(teamid) === taskList.id)
                ? 'rounded-full border-b-[6px] border-b-amber-950  bg-brand-secondary bg-opacity-30 px-2  text-white'
                : 'text-text-default'
            }`}
          >
            <Link
              href={{
                pathname: `/${teamid}/tasks`,
                query: { taskListId: taskList.id },
              }}
            >
              <TextButtonMotion>
                <button
                  type="button"
                  className="block max-w-full overflow-hidden text-ellipsis whitespace-nowrap pb-1"
                >
                  {taskList.name}
                </button>
              </TextButtonMotion>
            </Link>
          </li>
        ))}
      </ul>
      <ListPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      />
      {tasks.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {tasks.length > 0 &&
            tasks.map((task, index) => (
              <TaskCard key={task.id} index={index} task={task} />
            ))}
        </ul>
      ) : (
        <NoTaskCard />
      )}
    </section>
  );
}
