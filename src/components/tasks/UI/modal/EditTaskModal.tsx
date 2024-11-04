import Button from '@components/@shared/Button';
import { Modal } from '@components/@shared/Modal';

import { patchTask, TaskUrlParams } from '@/src/api/tasks/taskAPI';
import { useTaskListStore } from '@/src/stores/taskListStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { TASK_REQUEST_INIT } from '@constants/initValues';
import type { TaskRequestBody } from '@/src/types/tasks/taskDto';
import NameInput from '../input/NameInput';
import DescriptionTextArea from '../input/DescriptionTextArea';

interface EditTaskModal {
  isOpen: boolean;
  onClose: () => void;
  done: boolean;
}

export default function EditTaskModal({
  isOpen,
  onClose,
  done,
}: EditTaskModal) {
  const queryClient = useQueryClient();
  const { taskListId, taskId } = useTaskListStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TaskRequestBody['patch']>({
    mode: 'onChange',
    defaultValues: {
      ...TASK_REQUEST_INIT.PATCH,
      done,
    },
  });

  const { mutate: editTask } = useMutation({
    mutationFn: async ({
      params,
      data,
    }: {
      params: TaskUrlParams;
      data: TaskRequestBody['patch'];
    }) => {
      return patchTask(params, data);
    },
    onSuccess: () => {
      onClose();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', taskListId] });
    },
    onError: (error) => {
      console.error('patchTask 실패:', error);
    },
  });

  const onSubmit = async (data: TaskRequestBody['patch']) => {
    const finalData = {
      ...data,
      done,
    };
    await editTask({ params: { taskId }, data: finalData });
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
        <Modal.Header array="column" className="gap-3">
          <h1 className="text-lg-medium text-text-primary">할 일 수정하기</h1>
          <p className="text-md-medium text-text-secondary">
            제목과 메모 내용을{' '}
            <span className="mt-1 flex flex-grow justify-center md:inline">
              변경할 수 있습니다.
            </span>
          </p>
        </Modal.Header>
        <Modal.Content
          array="column"
          fontArray="left"
          fontColor="primary"
          fontSize="14"
          className="gap-4"
        >
          <NameInput
            label="할 일 제목"
            placeholder="할 일 제목을 입력해주세요."
            register={register}
            isError={!!errors.name}
            errorMessage={errors.name?.message}
          />
          <DescriptionTextArea
            label="할 일 메모"
            placeholder="메모를 입력해주세요."
            register={register}
            registerValue="description"
            isError={!!errors.description}
            errorMessage={errors.description?.message}
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
          수정하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
