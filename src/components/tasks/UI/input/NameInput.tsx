import { Input } from '@components/@shared/Input';

interface NameInputProps {
  label?: string;
  placeholder?: string;
  register: any;
  isError: boolean;
  errorMessage: string | undefined;
  isDuplicateName?: (value: string) => boolean;
}

export default function NameInput({
  label,
  placeholder,
  register,
  isError,
  errorMessage,
  isDuplicateName,
}: NameInputProps) {
  return (
    <Input
      label={label || ''}
      placeholder={label ? `${label}을 입력해주세요.` : `${placeholder}`}
      inputProps={{
        ...register('name', {
          required: '이름은 필수 입력 사항입니다.',
          maxLength: {
            value: 30,
            message: '이름은 30자 이내로 입력해야 합니다.',
          },
          validate: {
            isDuplicate: (value: string) => {
              if (isDuplicateName && isDuplicateName(value)) {
                return '이미 존재하는 이름입니다.';
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
