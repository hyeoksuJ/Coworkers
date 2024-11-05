import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

import ProfileIcon from '@icons/profile_small.svg';
import AlertIcon from '@icons/alert.svg';
import XIcon from '@icons/x.svg';

import IconButtonMotion from './animation/IconButtonMotion';

import { getModalClass, ModalClassProps } from '@utils/getModalClass';

interface ModalProps extends ModalClassProps {
  isOpen?: boolean;
  onClose?: () => void;
  isDanger?: boolean;
  isProfile?: boolean;
  children: React.ReactNode;
}

export function Modal({
  isOpen,
  isDanger,
  isProfile,
  isXButton,
  onClose,
  children,
  ...props
}: ModalProps) {
  const modalClass = getModalClass({ ...props, isXButton });
  const [isDragging, setIsDragging] = useState(false);

  // 모달 외부 스크롤 막기 + 스크롤바 너비만큼 여백 추가
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '5px'; // 스크롤바 너비만큼 패딩 추가
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = ''; // 패딩 초기화
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // 드래그 시작과 종료를 추적하여 클릭 여부 결정
  const handleMouseDown = () => setIsDragging(false);
  const handleMouseMove = () => setIsDragging(true);
  const handleMouseUp = (event: React.MouseEvent) => {
    if (!isDragging && event.target === event.currentTarget) {
      onClose?.();
    }
    setIsDragging(false);
  };

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className={`fixed bottom-0 w-full rounded-t-xl md:relative md:w-[375px] md:rounded-xl xl:w-96 ${modalClass}`}
      >
        {isProfile && <ProfileIcon className="mx-auto h-6 w-6" />}
        {isDanger && <AlertIcon className="mx-auto h-6 w-6" />}
        {isXButton && (
          <button
            type="button"
            className="absolute right-4 top-4 flex justify-end"
            onClick={onClose}
          >
            <IconButtonMotion>
              <XIcon />
            </IconButtonMotion>
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}

// ModalSection 컴포넌트, modal의 하위 요소
function ModalSection({ children, className, ...props }: ModalProps) {
  const modalClass = getModalClass(props);
  return <div className={clsx(modalClass, className)}>{children}</div>;
}

// ModalSection 생성 함수
function createModalComponent() {
  return function ModalComponent({
    children,
    className,
    ...props
  }: ModalProps) {
    return (
      <ModalSection className={clsx(className)} {...props}>
        {children}
      </ModalSection>
    );
  };
}

// Modal에 ModalSection 추가
Modal.Wrapper = createModalComponent();
Modal.Header = createModalComponent();
Modal.Content = createModalComponent();
Modal.Footer = createModalComponent();
