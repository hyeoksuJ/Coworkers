import { useState } from 'react';

export default function useClipboardCopy(
  defaultMessage = '클립보드에 복사 완료!'
) {
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState(defaultMessage);
  const [snackBarType, setSnackBarType] = useState<'success' | 'error'>(
    'success'
  );

  const showSnackbar = (message: string, type: 'success' | 'error') => {
    setSnackBarMessage(message);
    setSnackBarType(type);
    setIsSnackBarOpen(true);

    setTimeout(() => {
      setIsSnackBarOpen(false);
    }, 2000);
  };

  const handleCopyClick = (text: string, onSuccess?: () => void) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showSnackbar(defaultMessage, 'success');
        if (onSuccess) onSuccess();
      })
      .catch(() => {
        showSnackbar('복사에 실패했습니다', 'error');
      });
  };

  return {
    showSnackbar,
    isSnackBarOpen,
    snackBarMessage,
    snackBarType,
    handleCopyClick,
  };
}
