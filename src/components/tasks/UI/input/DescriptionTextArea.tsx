import { ScrollTextArea } from '@components/@shared/Input';

interface DescriptionTextAreaProps {
  label?: string;
  placeholder?: string;
  register: any;
  isError: boolean;
  registerValue: string;
  errorMessage: string | undefined;
}

export default function DescriptionTextArea({
  label,
  placeholder,
  register,
  registerValue,
  isError,
  errorMessage,
}: DescriptionTextAreaProps) {
  return (
    <ScrollTextArea
      label={label || ''}
      placeholder={placeholder || (label ? `${label}을 입력해주세요.` : '')}
      textareaProps={{
        ...register(`${registerValue}`, {
          validate: {
            maxLength: (value: any) => {
              if (value && value.length > 250) {
                return '내용은 250자 이내로 입력해야 합니다.';
              }
              return true;
            },
          },
        }),
      }}
      isError={isError}
      errorMessage={errorMessage}
    />
  );
}
