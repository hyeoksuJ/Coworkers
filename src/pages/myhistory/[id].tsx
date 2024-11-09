import Contributions from '@components/myhistory/Contributions';
import MyTask from '@components/myhistory/MyTask';

export default function Myhistory() {
  return (
    <main className="mx-auto mt-8 w-auto max-w-[1200px] text-text-primary">
      <div className="flex flex-col ">
        <div className="mx-10">
          <h1 className="mb-[27px] text-2xl-bold ">마이 히스토리</h1>
          <Contributions />
          <section className="mb-10 mt-10">
            <MyTask />
          </section>
        </div>
      </div>
    </main>
  );
}
