import { useState } from 'react';

export default function useTaskListModals() {
  const [selectedTaskListId, setSelectedTaskListId] = useState<number | null>(
    null
  );
  const [modalType, setModalType] = useState<'edit' | 'delete' | null>(null);

  const openModal = (type: 'edit' | 'delete', taskListId: number) => {
    setModalType(type);
    setSelectedTaskListId(taskListId);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedTaskListId(null);
  };

  return {
    modalType,
    selectedTaskListId,
    openModal,
    closeModal,
  };
}
