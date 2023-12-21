import Image from "next/image";

import { successList } from "@/sampleData/successList";

export default function Home() {
  return (
    <>
      <h1>Hello World!</h1>

      {successList.map((el) => (
        <SuccessCart key={el.id} success={el} />
      ))}
    </>
  );
}

function SuccessCart({ success }) {
  return (
    <div className="border border-yellow-300 m-[1rem]">
      <h1>{success.header}</h1>
      <p>{success.userName}</p>
      {/* <Image src={success.userPhoto} alt="User" width={500} height={500} /> */}
    </div>
  );
}
