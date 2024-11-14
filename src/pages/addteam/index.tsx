import SlideInMotion from '@components/@shared/animation/SlideInMotion';
import AddTeamForm from '@components/addteam/AddTeamForm';

export default function AddTeam() {
  return (
    <main className="my-[72px] flex justify-center md:my-[100px] xl:my-[140px]">
      <section className="flex flex-col gap-8 md:gap-[80px]">
        <h1 className="text-center text-2xl-semibold text-brand-primary md:text-text-primary xl:text-4xl">
          팀 생성하기
        </h1>
        <SlideInMotion className="flex flex-col items-center gap-6">
          <AddTeamForm />
          <p className="text-center text-md-regular md:text-lg-regular">
            팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
          </p>
        </SlideInMotion>
      </section>
    </main>
  );
}
