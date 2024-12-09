import SlideInMotion from '@components/@shared/animation/SlideInMotion';
import InputTask from '@components/mysetting/inputTask';
import RemoveAccount from '@components/mysetting/RemoveAccount';

export default function MySetting() {
  return (
    <div className="mt-6 flex min-h-screen flex-col items-center gap-6">
      <header className="w-full max-w-[792px] text-left text-2lg-bold text-text-primary">
        <span className="ml-6">계정설정</span>
      </header>
      <SlideInMotion className="w-full max-w-[792px]">
        <InputTask />
      </SlideInMotion>
      <footer className="flex w-full max-w-[792px] ">
        <RemoveAccount />
      </footer>
    </div>
  );
}
