import { postTaskList } from '@/src/api/tasks/taskListAPI';
import Button from '@components/@shared/Button';
import { Input } from '@components/@shared/Input';
import { Modal } from '@components/@shared/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { TeamStore } from '@/src/stores/teamStore';
import { useValidation } from '@hooks/useValidation';
import { tagColors } from './tagColors';

interface AddTaskListModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
}

export default function AddTaskListModal({
  isOpen,
  onClose,
  groupId,
}: AddTaskListModalProps) {
  const [taskListName, setTaskListName] = useState('');
  const newGroupId = Number(groupId);
  const queryClient = useQueryClient();
  const {
    errors,
    setError,
    validateOnBlur,
    validateValueOnSubmit,
    clearError,
  } = useValidation();

  const teamData = queryClient.getQueryData<TeamStore>(['group', groupId]);

  const [selectedColor, setSelectedColor] = useState('#A533FF');

  const handleColorClick = (color: string) => {
    setSelectedColor(color); // 선택한 색상 저장
  };

  // onBlur 시 이름이 비어 있는지 검사
  const handleBlurName = () => {
    validateOnBlur('taskListName', taskListName);
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

  // 그룹 생성 Mutation
  const { mutate: createTaskList } = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      postTaskList({ groupId: id }, { name }),
    onSuccess: () => {
      setTaskListName('');
      onClose();
    },
    onSettled: () => {
      // 쿼리 무효화 및 리패치
      queryClient.invalidateQueries({ queryKey: ['group', groupId] });
    },
    onError: (error) => {
      console.error('목록 생성 실패:', error);
    },
  });

  // 제출 시 중복된 이름 검사
  const taskListNames =
    teamData?.taskLists.map((taskList) => taskList.name) || [];

  const handleAddClick = () => {
    if (validateValueOnSubmit('taskListName', taskListNames, taskListName)) {
      createTaskList({ id: newGroupId, name: taskListName });

      const taskListData = {
        name: taskListName,
        color: selectedColor,
      };
      // 로컬 스토리지에서 기존 TaskLists 가져오기 (없으면 빈 배열)
      const existingTaskListsString = localStorage.getItem(
        `TaskLists_${newGroupId}`
      );

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

      // 기존 이름과 겹치는지 확인
      const existingTaskIndex = existingTaskLists.findIndex(
        (task) => task.name === taskListData.name
      );

      // 기존 이름이 있는 경우 색상 업데이트, 없으면 새로 추가
      if (existingTaskIndex !== -1) {
        existingTaskLists[existingTaskIndex].color = taskListData.color;
      } else {
        existingTaskLists.push(taskListData);
      }

      // 업데이트된 배열을 로컬 스토리지에 저장
      localStorage.setItem(
        `TaskLists_${newGroupId}`,
        JSON.stringify(existingTaskLists)
      );
    }
  };

  const handleClose = () => {
    setTaskListName('');
    clearError('taskListName');
    setSelectedColor('#A533FF');
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
      fontSize="16"
      fontArray="center"
      gap="40"
    >
      <Modal.Wrapper array="column">
        <Modal.Header fontColor="primary">할 일 목록</Modal.Header>
        <Modal.Content fontColor="secondary" fontSize="14" fontArray="left">
          <Input
            onBlur={handleBlurName}
            inputProps={{
              value: taskListName,
              onChange: handleChange,
            }}
            className="mt-[30px]"
            placeholder="목록 명을 입력해주세요."
            errorMessage={errors.taskListName?.message}
            isError={errors.taskListName?.isError}
          />
          <div className="mt-[30px] flex justify-between md:gap-[4px]">
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
        </Modal.Content>
      </Modal.Wrapper>
      <Modal.Footer>
        <Button
          size="full"
          onClick={handleAddClick}
          disabled={taskListName === ''}
        >
          만들기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
