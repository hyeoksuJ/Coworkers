import clsx from 'clsx';
import { motion } from 'framer-motion';

interface SnackbarProps {
  icon: React.ReactNode;
  message: string;
  type: string;
}

export default function Snackbar({ icon, message, type }: SnackbarProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }} // 초기 상태: 투명하고 약간 아래 위치
      animate={{ opacity: 1 }} // 애니메이션 상태: 완전히 보이고 제자리
      exit={{ opacity: 0 }} // 종료 상태: 투명해지며 아래로 이동
      transition={{ duration: 0.5 }} // 애니메이션 지속 시간
      className={clsx(
        'fixed left-1/2 top-20 z-50 flex h-[50px] w-fit -translate-x-1/2 transform items-center rounded-lg border px-5 py-[13px]',
        {
          'border-[#4cbfa4] bg-[#eef9f6] text-[#32a68a]': type === 'success',
          'border-[#d14343] bg-[#fbeded] text-[#d14343]': type === 'error',
        }
      )}
    >
      <div className="mr-[15px]">{icon}</div>
      <span className="text-lg-bold">{message}</span>
    </motion.div>
  );
}
