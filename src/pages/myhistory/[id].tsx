import Contributions from '@components/myhistory/Contributions';
import MyTask from '@components/myhistory/MyTask';

export default function Myhistory() {
  return (
    <main className="mx-auto mt-10 w-auto max-w-[1200px] text-text-primary md:mt-12">
      <div className="flex flex-col ">
        <div className="mx-10">
          <Contributions />
          <section className="mb-10 mt-10">
            <MyTask />
          </section>
        </div>
      </div>
    </main>
  );
}
