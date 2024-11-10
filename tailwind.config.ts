import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      keyframes: {
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInDown: 'fadeInDown 0.2s ease-out',
      },
      screens: {
        tablet: '1024px',
      },
      borderRadius: {
        '40': '40px',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(to right, #FF5580, #FFAA80)', // brand.gradient 정의된 값
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        '5xl-semibold': ['48px', { lineHeight: '48px', fontWeight: '600' }],
        '4xl': ['40px', { lineHeight: '48px', fontWeight: '500' }],
        '4xl-semibold': ['40px', { lineHeight: '48px', fontWeight: '600' }],
        '3xl-bold': ['32px', { lineHeight: '38px', fontWeight: '700' }],
        '3xl-semibold': ['32px', { lineHeight: '38px', fontWeight: '600' }],
        '2xl-bold': ['24px', { lineHeight: '28px', fontWeight: '700' }],
        '2xl-semibold': ['24px', { lineHeight: '28px', fontWeight: '600' }],
        '2xl-medium': ['24px', { lineHeight: '28px', fontWeight: '500' }],
        '2xl-regular': ['24px', { lineHeight: '28px', fontWeight: '400' }],
        'xl-bold': ['20px', { lineHeight: '24px', fontWeight: '700' }],
        'xl-semibold': ['20px', { lineHeight: '24px', fontWeight: '600' }],
        'xl-medium': ['20px', { lineHeight: '24px', fontWeight: '500' }],
        'xl-regular': ['20px', { lineHeight: '24px', fontWeight: '400' }],
        '2lg-bold': ['18px', { lineHeight: '21px', fontWeight: '700' }],
        '2lg-semibold': ['18px', { lineHeight: '21px', fontWeight: '600' }],
        '2lg-medium': ['18px', { lineHeight: '21px', fontWeight: '500' }],
        '2lg-regular': ['18px', { lineHeight: '21px', fontWeight: '400' }],
        'lg-bold': ['16px', { lineHeight: '19px', fontWeight: '700' }],
        'lg-semibold': ['16px', { lineHeight: '19px', fontWeight: '600' }],
        'lg-medium': ['16px', { lineHeight: '19px', fontWeight: '500' }],
        'lg-regular': ['16px', { lineHeight: '19px', fontWeight: '400' }],
        'md-bold': ['14px', { lineHeight: '17px', fontWeight: '700' }],
        'md-semibold': ['14px', { lineHeight: '17px', fontWeight: '600' }],
        'md-medium': ['14px', { lineHeight: '17px', fontWeight: '500' }],
        'md-regular': ['14px', { lineHeight: '17px', fontWeight: '400' }],
        'sm-semibold': ['13px', { lineHeight: '16px', fontWeight: '600' }],
        'xs-semibold': ['12px', { lineHeight: '14px', fontWeight: '600' }],
        'xs-medium': ['12px', { lineHeight: '14px', fontWeight: '500' }],
        'xs-regular': ['12px', { lineHeight: '14px', fontWeight: '400' }],
      },
      colors: {
        brand: {
          primary: '#FF5580',
          secondary: '#FFAA80',
          tertiary: '#FFFF80',
        },
        point: {
          purple: '#A76BCF',
          blue: '#5B8FF9',
          cyan: '#00B5D8',
          pink: '#FF6F91',
          rose: '#FF7F8D',
          orange: '#FF9F43',
          yellow: '#F6EB61',
        },
        background: {
          primary: '#121212',
          secondary: '#1E1E1E',
          tertiary: '#2C2C2C',
          inverse: '#FFFFFF',
        },
        interaction: {
          inactive: '#B0BEC5',
          hover: '#D94B6D',
          pressed: '#C95A7A',
          focus: '#FF6F8E',
        },
        border: {
          primary: '#FFAA80',
        },
        status: {
          danger: '#FF4C4C',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#E0E0E0',
          tertiary: '#B0BEC5',
          default: '#FFFFFF',
          inverse: '#000000',
          disabled: '#757575',
        },
        icon: {
          primary: '#FF5580',
          inverse: '#FFFFFF',
          brand: '#FF5580',
        },
      },
    },
  },
  plugins: [],
};
export default config;
