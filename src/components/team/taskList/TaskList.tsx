import { useModal } from '@hooks/useModal';
import { useTeamStore } from '@/src/stores/useTeamStore';
import { Option } from '@components/@shared/Dropdown';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  TouchSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchTaskListOrder } from '@/src/api/tasks/taskListAPI';
import styles from '@styles/scroll.module.css';
import Image from 'next/image';
import TaskBar from './TaskBar';
import AddTaskListModal from './AddTaskListModal';
import EditDropdown from '../EditDropdown';
import EditTaskListModal from './EditTaskListModal';
import DeleteTaskListModal from './DeleteTaskListModal';
import { moreIcon } from '../MoreIcon';

export default function TaskList() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollableRef = useRef<HTMLDivElement | null>(null);

  const {
    isOpen: addListIsOpen,
    onOpen: addListOpenModal,
    onClose: addListCloseModal,
  } = useModal();
  const queryClient = useQueryClient();

  const { taskLists, id } = useTeamStore();

  // 초기값을 taskLists로 설정
  const [displayedTaskList, setDisplayedTaskList] = useState(() =>
    Array.from(taskLists)
  );

  const [isDragging, setIsDragging] = useState(false);
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);
  const thresholdTime = 200; // 클릭과 드래그를 구분할 시간 기준

  // 모달 상태를 개별적으로 관리
  const [selectedTaskListId, setSelectedTaskListId] = useState<number | null>(
    null
  );
  const [modalType, setModalType] = useState<'edit' | 'delete' | null>(null);

  // 선택된 옵션에 따라 모달 열기
  const handleSelect = (option: Option, taskListId: number) => {
    setSelectedTaskListId(taskListId);
    setModalType(option.label === 'edit' ? 'edit' : 'delete');
  };

  // 모달 닫기
  const handleModalClose = () => {
    setSelectedTaskListId(null);
    setModalType(null);
  };

  const listCount = displayedTaskList.length;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  interface PatchOrderVariables {
    groupId: number;
    taskListId: number;
    displayIndex: number;
  }

  // 리액트 쿼리 mutation 설정
  const patchOrderMutation = useMutation({
    mutationFn: ({ groupId, taskListId, displayIndex }: PatchOrderVariables) =>
      patchTaskListOrder(
        { groupId, id: taskListId }, // TaskListUrlParams 객체
        { displayIndex } // TaskListRequestBody['patchOrder'] 객체
      ),
    onSuccess: () => {
      // 필요한 경우 쿼리 무효화 또는 상태 업데이트 로직
      queryClient.invalidateQueries({ queryKey: ['group', id] });
    },
  });

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (isDragging) {
        const touch = e.touches[0];
        const scrollableElement = scrollableRef.current;

        if (scrollableElement) {
          const scrollbarWidth =
            scrollableElement.offsetWidth - scrollableElement.clientWidth;

          // 터치 위치가 스크롤바가 있는 영역이 아닐 경우 스크롤을 막습니다.
          if (
            touch.clientX < scrollableElement.clientWidth ||
            touch.clientX > scrollableElement.clientWidth + scrollbarWidth
          ) {
            e.preventDefault(); // 스크롤 막기
          }
        }
      }
    },
    [isDragging]
  ); // isDragging 의존성 배열에 추가

  const handleDragStart = () => {
    // 일정 시간 후 드래그로 간주
    const timer = setTimeout(() => setIsDragging(true), thresholdTime);
    setClickTimeout(timer);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (clickTimeout !== null) {
      clearTimeout(clickTimeout);
    }

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
            taskListId: Number(active.id),
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
  };

  useEffect(() => {
    // taskLists가 업데이트될 때 displayedTaskList도 업데이트
    if (taskLists) {
      setDisplayedTaskList(Array.from(taskLists));
    }
  }, [taskLists]);

  useEffect(() => {
    const scrollableElement = scrollableRef.current;

    if (scrollableElement) {
      scrollableElement.addEventListener('touchstart', handleTouchStart);
    }

    return () => {
      // 컴포넌트가 언마운트되거나, 타이머가 실행되기 전에 리스너를 제거
      if (scrollableElement) {
        scrollableElement.removeEventListener('touchstart', handleTouchStart);
      }
    };
  }, [handleTouchStart]);

  const handleVisibleClick = () => {
    if (isVisible === false) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  return (
    <section>
      <div className="relative my-[20px] ">
        <div className="flex items-center justify-between">
          <div className="flex gap-[10px]">
            <p className="text-lg-medium">할 일 목록</p>
            <p className="text-lg-regular text-text-default">({listCount}개)</p>
            <Image
              src="/icons/question.svg"
              alt="물음표 아이콘"
              width={17}
              height={17}
              quality={100}
              onClick={handleVisibleClick}
              className="cursor-pointer rounded-[16px] object-contain hover:scale-110"
            />
            {isVisible && (
              <>
                <p className="hidden text-md-regular text-brand-primary md:block">
                  할 일 목록을 꾹 눌러 드래그해서 순서를 편집할 수 있어요!
                </p>
                <div className="absolute left-[120px] top-[30px] z-10 w-fit animate-fadeInDown rounded-[6px] bg-background-tertiary p-2 text-sm-semibold text-brand-primary md:hidden">
                  할 일 목록을 꾹 눌러 드래그해서 <br /> 순서를 편집할 수
                  있어요!
                </div>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={addListOpenModal}
            className="cursor-pointer rounded-lg p-1 text-md-regular text-brand-primary hover:bg-[#eeeeee12]"
          >
            +새로운 목록 추가하기
          </button>
          <AddTaskListModal
            isOpen={addListIsOpen}
            onClose={addListCloseModal}
            groupId={id}
          />
        </div>
      </div>
      {listCount === 0 && (
        <p className="my-[100px] text-center text-md-medium text-text-default">
          아직 할 일 목록이 없습니다.
        </p>
      )}
      {/* 드래그 가능한 영역 */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div
          ref={scrollableRef}
          className={`max-h-[320px] overflow-y-auto overflow-x-hidden ${styles.taskListScroll}`}
        >
          <SortableContext
            items={displayedTaskList.map((taskList) => taskList.id)}
            strategy={verticalListSortingStrategy}
          >
            <div
              className="flex flex-col gap-[10px]"
              onMouseDown={(e) => e.stopPropagation()}
            >
              {displayedTaskList.map((taskList, index) => (
                <div className="relative" key={taskList.id}>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className={`absolute right-0 top-[20%] m-auto mr-[5px] w-[20px] cursor-pointer rounded-full hover:bg-[#ffffff1c] ${isDragging ? 'hidden' : ''}`}
                  >
                    <EditDropdown
                      triggerIcon={moreIcon}
                      onSelect={(option) => handleSelect(option, taskList.id)}
                    />
                  </div>
                  <TaskBar
                    index={index}
                    key={taskList.id}
                    id={taskList.id} // SortableItem requires an `id` prop
                    name={taskList.name}
                    tasks={taskList.tasks}
                    isDragging={isDragging}
                  />
                  {/* Edit 모달 */}
                  {modalType === 'edit' &&
                    selectedTaskListId === taskList.id && (
                      <EditTaskListModal
                        isOpen
                        onClose={handleModalClose}
                        initialTaskListName={taskList.name}
                        taskListId={taskList.id}
                      />
                    )}

                  {/* Delete 모달 */}
                  {modalType === 'delete' &&
                    selectedTaskListId === taskList.id && (
                      <DeleteTaskListModal
                        isOpen
                        onClose={handleModalClose}
                        taskListId={taskList.id}
                        taskName={taskList.name}
                      />
                    )}
                </div>
              ))}
            </div>
          </SortableContext>
        </div>
      </DndContext>
    </section>
  );
}
