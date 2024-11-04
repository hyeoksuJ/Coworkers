import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/scroll.module.css';

type InputProps = {
  placeholder?: string;
  isError?: boolean;
  label?: string;
  errorMessage?: string;
  type?: 'default' | 'search';
  actionIcon?: React.ReactNode; // 입력 영역 뒤에 들어갈 아이콘
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
} & React.HTMLAttributes<HTMLDivElement>;

export function Input({
  placeholder = '',
  isError = false,
  label = '',
  errorMessage = '',
  inputProps,
  ...props
}: InputProps) {
  return (
    <div className="flex w-full flex-col" {...props}>
      <label htmlFor="input" className="mb-3 text-lg-medium text-text-primary">
        {label}
      </label>
      <input
        className={`h-[48px] w-full rounded-[12px] bg-background-secondary p-[15px] text-lg-regular text-text-primary outline outline-[1px]
            focus:outline-none focus:outline-brand-primary ${isError ? 'outline-status-danger' : 'outline-[#343E4E]'}`}
        id="input"
        placeholder={placeholder}
        {...inputProps}
      />
      {isError && (
        <p className="mt-[10px] text-md-medium text-status-danger">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export function SearchInput({
  placeholder = '',
  inputProps,
  ...props
}: InputProps) {
  return (
    <div
      className="flex h-[48px] w-full items-center gap-[5px] rounded-[12px] bg-background-secondary p-[15px] text-lg-regular text-text-primary outline outline-[1px] outline-[#343E4E]
            focus-within:outline-none focus-within:outline-brand-primary"
      {...props}
    >
      <span className="relative h-[20px] w-[20px]">
        <Image fill src="/icons/search.svg" alt="돋보기 아이콘" />
      </span>
      <input
        className="w-full bg-transparent focus:outline-none"
        id="input"
        placeholder={placeholder}
        {...inputProps}
      />
    </div>
  );
}

export function IconInput({
  placeholder = '',
  isError = false,
  label = '',
  errorMessage = '',
  actionIcon,
  inputProps,
  ...props
}: InputProps) {
  return (
    <div className="flex w-full flex-col" {...props}>
      <label htmlFor="input" className="mb-3 text-lg-medium text-text-primary">
        {label}
      </label>
      <div className="relative ">
        <input
          className={`h-[48px] w-full rounded-[12px] bg-background-secondary p-[15px] text-lg-regular text-text-primary outline outline-[1px]
            focus:outline-none focus:outline-brand-primary ${isError ? 'outline-status-danger' : 'outline-[#343E4E]'}`}
          id="input"
          placeholder={placeholder}
          {...inputProps}
        />
        {actionIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-[50%] transform cursor-pointer">
            {actionIcon}
          </span>
        )}
      </div>
      {isError && (
        <p className="mt-[10px] text-md-medium text-status-danger">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export function ScrollTextArea({
  isError = false,
  errorMessage = '',
  placeholder = '',
  label = '',
  textareaProps,
  ...props
}: InputProps) {
  return (
    <div className="flex w-full flex-col" {...props}>
      <label htmlFor="input" className="mb-3 text-lg-medium text-text-primary">
        {label}
      </label>
      <div
        className={`relative min-h-[100px] w-full overflow-hidden rounded-[12px] bg-background-secondary p-[15px] outline outline-[1px] ${isError ? 'outline-status-danger' : 'outline-[#343E4E]'} focus-within:outline-none focus-within:outline-brand-primary`}
      >
        <textarea
          className={`min-h-[100px] w-full resize-none overflow-auto rounded-[12px] bg-background-secondary  text-lg-regular text-text-primary  focus:outline-none 
             ${isError ? styles.isErrorScroll : styles.textarea}`}
          id="textarea"
          placeholder={placeholder}
          {...textareaProps}
        />
      </div>
      {isError && (
        <p className="mt-[10px] text-md-medium text-status-danger">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

type AutoResizeTextareaProps = {
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
} & React.HTMLAttributes<HTMLElement>;

export function AutoTextArea({
  value,
  placeholder,
  onChange,
  onSubmit,
}: AutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = useState('auto');

  useLayoutEffect(() => {
    if (textareaRef.current) {
      // 높이를 auto로 초기화하여 이전 높이를 지움
      textareaRef.current.style.height = 'auto';
      // 새로운 높이를 계산하여 상태 업데이트
      const newHeight = `${textareaRef.current.scrollHeight}px`;
      setHeight(newHeight); // 상태에 새로운 높이 저장
      textareaRef.current.style.height = newHeight; // 텍스트 에어리어 높이 설정
    }
  }, [value]); // value가 변경될 때마다 높이 조정
  return (
    <form
      className="relative flex min-h-[49px] w-full items-center overflow-auto border-b-[1px] border-t-[1px] border-[#343E4E] bg-transparent pl-[15px] text-lg-regular text-text-primary focus:border-brand-primary focus:outline-none "
      onSubmit={onSubmit}
    >
      <textarea
        className={`relative mt-[15px] w-full resize-none overflow-auto bg-transparent focus:outline-none
            ${styles.autoTextarea}`}
        id="textarea"
        placeholder={placeholder}
        ref={textareaRef}
        value={value}
        style={{ height }}
        onChange={onChange}
        spellCheck="false"
      />
      <button
        type="button"
        onClick={onSubmit}
        className={`${value ? '' : 'cursor-default'}`}
      >
        {value ? (
          <img src="/icons/enter_active.svg" alt="비활성화 제출 버튼" />
        ) : (
          <img src="/icons/enter_inactive.svg" alt="활성화 제출 버튼" />
        )}
      </button>
    </form>
  );
}
