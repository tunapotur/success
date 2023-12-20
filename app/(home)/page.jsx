import { successList } from "@/SampleData/successList";

export default function Home() {
  return (
    <>
      <h1>Hello World!</h1>

      {successList.map((el) => (
        <SuccessCart key={el.id} data={el} />
      ))}
    </>
  );
}

function SuccessCart({ data }) {
  return (
    <div>
      <h1>{data.header}</h1>
    </div>
  );
}
