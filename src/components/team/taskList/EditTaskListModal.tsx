import { patchTaskList } from '@/src/api/tasks/taskListAPI';
import { TeamStore, useTeamStore } from '@/src/stores/teamStore';
import Button from '@components/@shared/Button';
import { Input } from '@components/@shared/Input';
import { Modal } from '@components/@shared/Modal';
import { useValidation } from '@hooks/useValidation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { tagColors } from './tagColors';

interface EditTaskListModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTaskListName?: string;
  taskListId: number;
}

interface StoredTaskList {
  name: string;
  color: string;
}

export default function EditTaskListModal({
  isOpen,
  onClose,
  initialTaskListName = '',
  taskListId,
}: EditTaskListModalProps) {
  const [TaskListName, setTaskListName] = useState(initialTaskListName);
  const { id } = useTeamStore();
  const queryClient = useQueryClient();

  const {
    errors,
    setError,
    validateOnBlur,
    validateValueOnSubmit,
    clearError,
  } = useValidation();

  const teamData = queryClient.getQueryData<TeamStore>(['group', id]);

  // 바 색상 설정
  const [selectedColor, setSelectedColor] = useState('#A533FF');

  const handleColorClick = (color: string) => {
    setSelectedColor(color); // 선택한 색상 저장
  };

  // onBlur 시 이름이 비어 있는지 검사
  const handleBlurName = () => {
    validateOnBlur('taskListName', TaskListName);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= 30) {
      setTaskListName(value);
      clearError('taskListName');
    } else {
      setError('taskListName', true, '30자 이하로 입력해주세요.');
    }
  };

  useEffect(() => {
    const existingTaskListString = localStorage.getItem(`TaskLists_${id}`);
    if (existingTaskListString) {
      try {
        const existingTaskLists: StoredTaskList[] = JSON.parse(
          existingTaskListString
        );

        // TaskListName에 해당하는 색상을 찾아 selectedColor에 설정
        const existingTask = existingTaskLists.find(
          (task) => task.name === initialTaskListName
        );
        if (existingTask) {
          setSelectedColor(existingTask.color);
        }
      } catch (error) {
        console.error(
          '로컬 스토리지에서 TaskLists를 파싱하는 중 오류 발생:',
          error
        );
      }
    }
  }, [id, initialTaskListName]);

  // 할 일 목록 수정 Mutation
  const { mutate: editGroup } = useMutation({
    mutationFn: ({
      groupId,
      listId,
      name,
    }: {
      groupId: number;
      listId: string;
      name: string;
    }) => patchTaskList({ groupId, listId }, { name }),
    onSuccess: () => {
      onClose();
    },

    onSettled: () => {
      // 로컬 스토리지 업데이트
      localStorage.setItem('taskListUpdated', Date.now().toString());

      // CustomEvent 트리거
      window.dispatchEvent(new Event('taskListUpdate'));
      // 쿼리 무효화 및 리패치
      queryClient.invalidateQueries({ queryKey: ['group', id] });
    },
    onError: (error) => {
      console.error('그룹 생성 실패:', error);
    },
  });

  // 제출 시 중복된 이름 검사
  const taskListNames =
    teamData?.taskLists.map((taskList) => taskList.name) || [];

  const handlePatchClick = () => {
    if (
      validateValueOnSubmit(
        'taskListName',
        taskListNames,
        TaskListName,
        initialTaskListName
      )
    ) {
      editGroup({
        groupId: Number(id),
        listId: String(taskListId),
        name: TaskListName,
      });

      const taskListData = {
        name: TaskListName,
        color: selectedColor,
      };
      // 로컬 스토리지에서 기존 TaskLists 가져오기 (없으면 빈 배열)
      const existingTaskListsString = localStorage.getItem(`TaskLists_${id}`);

      let existingTaskLists = [];
      if (existingTaskListsString) {
        try {
          existingTaskLists = JSON.parse(existingTaskListsString);

          // JSON 파싱 후 배열인지 확인
          if (!Array.isArray(existingTaskLists)) {
            existingTaskLists = []; // 배열이 아닐 경우 빈 배열로 초기화
          }
        } catch (error) {
          console.error(
            '로컬 스토리지에서 TaskLists를 파싱하는 중 오류 발생:',
            error
          );
          existingTaskLists = []; // 파싱 오류 발생 시 빈 배열로 초기화
        }
      }

      // 기존과 동일한 name이 있는지 확인
      const existingTaskIndex = existingTaskLists.findIndex(
        (task) => task.name === TaskListName
      );

      // 동일한 name이 있으면 color만 업데이트, 없으면 새로 추가
      if (existingTaskIndex !== -1) {
        existingTaskLists[existingTaskIndex].color = selectedColor;
      } else {
        existingTaskLists.push(taskListData);
      }

      // 업데이트된 배열을 로컬 스토리지에 저장
      localStorage.setItem(
        `TaskLists_${id}`,
        JSON.stringify(existingTaskLists)
      );
    }
  };

  const handleClose = () => {
    setTaskListName('');
    clearError('taskListName');
    setSelectedColor('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      isXButton
      onClose={handleClose}
      array="column"
      padding="default"
      bgColor="primary"
    >
      <Modal.Header
        fontColor="primary"
        className="mb-[20px] flex flex-col items-center"
      >
        할 일 목록
      </Modal.Header>
      <Input
        placeholder="목록 명을 입력해주세요."
        inputProps={{
          value: TaskListName,
          onChange: handleChange,
        }}
        className="mb-[30px] mt-[15px]"
        onBlur={handleBlurName}
        errorMessage={errors.taskListName?.message}
        isError={errors.taskListName?.isError}
      />
      <div className="mb-[30px] flex justify-between md:gap-[4px]">
        {tagColors.map((tagColor) => (
          <div
            key={tagColor.label}
            style={{ backgroundColor: tagColor.color }}
            className={`h-[25px] w-[25px] shrink-0 rounded-full hover:scale-105 ${selectedColor === tagColor.color ? 'scale-105 border-2 border-[#ffffff]' : ''}`}
            onClick={() => handleColorClick(tagColor.color)}
            data-value={tagColor.color}
          >
            &nbsp;
          </div>
        ))}
      </div>

      <Modal.Footer>
        <Button size="full" onClick={handlePatchClick}>
          수정하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
