import SlideInMotion from '@components/@shared/animation/SlideInMotion';
import ParticipateTeamForm from '@components/addteam/ParticipateTeamForm';

export default function ParticipateTeam() {
  return (
    <main className="my-[72px] flex justify-center md:my-[100px] xl:my-[140px]">
      <section className="flex flex-col gap-8 md:gap-[80px]">
        <h1 className="text-center text-2xl-semibold text-brand-primary md:text-text-primary xl:text-4xl">
          팀 참여하기
        </h1>
        <SlideInMotion className="flex flex-col items-center gap-6">
          <ParticipateTeamForm />
          <p className="text-center text-md-regular md:text-lg-regular">
            공유받은 팀 링크를 입력해 참여할 수 있어요.
          </p>
        </SlideInMotion>
      </section>
    </main>
  );
}
