import {
  calculateCircleProgress,
  calculateCircleViewBox,
} from '@utils/calculateCircleProgress';
import { useEffect, useRef } from 'react';

type GraphProps = {
  backgroundColor: string; // 배경 원의 색상
  gradientColorStart: string; // 그라디언트의 시작 색상
  gradientColorEnd: string; // 그라디언트의 끝 색상
  radius: number; // 원의 반지름
  percentage: number; // 채울 퍼센트 (0~100)
  strokeWidth: number; // 선의 두께
  additionalText?: string; // 추가 텍스트
  additionalTextColor?: string; // 추가 텍스트 색상
  isTextShown?: boolean; // 글씨를 보일지 여부
};

export default function CircleGraph({
  backgroundColor,
  gradientColorStart,
  gradientColorEnd,
  radius,
  percentage,
  strokeWidth,
  additionalText,
  additionalTextColor,
  isTextShown = false,
}: GraphProps) {
  const circleRef = useRef<SVGCircleElement>(null);

  const { viewBox, centerX, centerY } = calculateCircleViewBox({
    radius,
    strokeWidth,
  });

  // 기존의 함수로 strokeDasharray와 strokeDashoffset 계산
  const { strokeDasharray, strokeDashoffset } = calculateCircleProgress(
    radius,
    percentage
  );

  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  const boxSize = 2 * (radius + strokeWidth);

  useEffect(() => {
    if (circleRef.current) {
      // 초기 애니메이션 효과 설정
      circleRef.current.style.transition = 'stroke-dashoffset 1s ease-out';

      // 초기에는 가득 채워진 상태에서 시작
      circleRef.current.style.strokeDashoffset = '100%';

      // 이후 목표 퍼센트에 맞춰 채워지도록 설정
      requestAnimationFrame(() => {
        circleRef.current!.style.strokeDashoffset = `${strokeDashoffset}px`;
      });
    }
  }, [strokeDashoffset]);

  return (
    <div
      className="relative"
      style={{
        width: `${boxSize}px`,
        height: `${boxSize}px`,
      }}
    >
      {/* 배경으로 설정 */}
      <svg
        className="absolute left-0 top-0"
        width={`${boxSize}px`}
        height={`${boxSize}px`}
        viewBox={viewBox}
      >
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* 그라디언트 원을 전경에 설정 */}
      <svg
        className="absolute left-0 top-0"
        width={`${boxSize}px`}
        height={`${boxSize}px`}
        viewBox={viewBox}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: gradientColorStart, stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: gradientColorEnd, stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <circle
          ref={circleRef}
          cx={centerX}
          cy={centerY}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          fill="none"
          strokeLinecap="round"
        />
        {isTextShown && (
          <>
            {/* 추가 텍스트를 지정한 색상으로 표시 */}
            <text
              x={centerX}
              y={centerY - 10} // 아래쪽으로 이동
              textAnchor="middle"
              dominantBaseline="middle"
              fill={additionalTextColor} // 추가 텍스트 색상
              style={{ fontSize: '12px' }}
            >
              {additionalText}
            </text>
            {/* 가운데 퍼센트 텍스트를 그라디언트 색상으로 표시 */}
            <text
              x={centerX}
              y={centerY + 10} // 위쪽으로 이동
              textAnchor="middle"
              dominantBaseline="middle"
              fill={`url(#${gradientId})`}
              style={{ fontSize: '1.25rem', fontWeight: 'bold' }}
            >
              {percentage}%
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
