import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import styles from '../../styles/scroll.module.css';

export interface Option {
  label?: string;
  id?: number;
  component: ReactNode;
}

export interface DropdownProps {
  triggerClass?: string; // 드롭다운 버튼에 추가할 클래스
  optionsWrapClass?: string; // 옵션을 감싸는 div태그에 추가할 클래스
  optionClass?: string; // 옵션에 추가할 클래스
  triggerIcon?: ReactNode; // 드롭다운 버튼에 추가할 아이콘
  initialOption?: Option;
  options: Option[];
  selected?: Option | null;
  onSelect?: (option: Option) => void;
}

export default function Dropdown({
  initialOption,
  options,
  selected,
  onSelect,
  triggerIcon,
  triggerClass,
  optionsWrapClass,
  optionClass,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleToggle = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev); // 드롭다운 열기/닫기
  }, []);

  const handleSelect = (option: Option) => {
    if (onSelect) {
      onSelect(option);
    }
    setIsOpen(false);
  };

  // 메뉴 밖의 화면을 누르면 드롭다운 사라지도록
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = () => setIsOpen(false);
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  // 드롭다운이 화면 밖으로 나갈 때 위치 조정
  useEffect(() => {
    if (isOpen && dropdownRef.current && triggerRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const dropdownWidth = dropdownRect.width;
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      // 드롭다운을 트리거 버튼 아래로 위치 조정
      dropdownRef.current.style.top = `${triggerRect.bottom + scrollY}px`; // 트리거 버튼 바로 아래
      dropdownRef.current.style.left = `${triggerRect.left}px`; // 트리거 버튼 왼쪽과 맞춤

      // 트리거의 위치에 따라 드롭다운 정렬 결정
      if (triggerRect.left + dropdownWidth > window.innerWidth) {
        // 드롭다운이 화면을 넘어간다면
        dropdownRef.current.style.left = 'auto'; // 좌측 정렬 초기화
        dropdownRef.current.style.right = '20px'; // 우측 정렬
      } else {
        // 기본 좌측 정렬
        dropdownRef.current.style.left = `${triggerRect.left}px`; // 트리거 버튼 왼쪽과 맞춤
        dropdownRef.current.style.right = 'auto'; // 우측 정렬 초기화
      }
    }
  }, [isOpen, dropdownRef]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleToggle}
        className={`${triggerClass} relative`}
        ref={triggerRef}
      >
        {initialOption && !selected
          ? initialOption.label
          : selected?.label || ''}
        {triggerIcon}
      </button>
      {isOpen &&
        ReactDOM.createPortal(
          <div
            ref={dropdownRef}
            className={`${optionsWrapClass} absolute z-50 flex max-h-[200px] w-fit flex-col overflow-y-auto bg-background-secondary text-text-primary ${styles.dropdownScroll}`}
          >
            {options.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => handleSelect(option)}
                className={`${optionClass}`}
              >
                {option.component}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}
