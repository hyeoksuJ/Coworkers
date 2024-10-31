import Button from '@components/@shared/Button';
import { Input } from '@components/@shared/Input';
import { Modal } from '@components/@shared/Modal';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { TASKLIST_REQUEST_INIT } from '@constants/initValues';
import { useTaskListStore } from '@/src/stores/taskListStore';
import { postTaskList, TaskListUrlParams } from '@/src/api/tasks/taskListAPI';
import type { TaskListRequestBody } from '@/src/types/tasks/taskListDto';

interface AddTaskListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTaskListModal({
  isOpen,
  onClose,
}: AddTaskListModalProps) {
  const queryClient = useQueryClient();
  const { groupId } = useTaskListStore();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<TaskListRequestBody['post']>({
    mode: 'onChange',
    defaultValues: {
      ...TASKLIST_REQUEST_INIT.POST,
    },
  });

  const { mutate: createTaskList } = useMutation({
    mutationFn: async ({
      params,
      data,
    }: {
      params: TaskListUrlParams;
      data: TaskListRequestBody['post'];
    }) => {
      return postTaskList(params, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks', groupId],
      });
      onClose();
    },
    onError: (error) => {
      console.error('createTaskList 실패:', error);
    },
  });

  const onSubmit = async (data: TaskListRequestBody['post']) => {
    await createTaskList({
      params: { groupId },
      data,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      isXButton
      onClose={onClose}
      array="column"
      padding="default"
      bgColor="secondary"
      fontSize="16"
      fontArray="center"
      gap="24"
    >
      <Modal.Wrapper array="column" gap="24">
        <Modal.Header array="column" className="gap-2">
          <h1 className="text-lg-medium text-text-primary">새로운 목록 추가</h1>
          <p className="text-md-medium leading-normal text-text-secondary">
            할 일에 대한 목록을 추가하고 <br />
            목록별 할 일을 만들 수 있습니다.
          </p>
        </Modal.Header>
        <Modal.Content fontArray="left" fontColor="primary">
          <Input
            label="목록 이름"
            placeholder="목록 이름을 입력해주세요."
            inputProps={{
              ...register('name', { required: '제목은 필수 입력 사항입니다.' }),
            }}
          />
        </Modal.Content>
      </Modal.Wrapper>
      <Modal.Footer>
        <Button
          size="full"
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          만들기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
