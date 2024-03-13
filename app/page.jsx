import SuccessCart from "@/components/SuccessCart";
import { SUCCESS_LIST_REVALIDATE_DURATION } from "@/data/constants";
import H1 from "@/components/H1";
import Image from "next/image";
import Logo from "@/public/goal-bold.png";

export const dynamicParams = true;

async function getAllSuccessList() {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/allSuccessList`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: SUCCESS_LIST_REVALIDATE_DURATION },
    },
  );

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary.
    throw new Error(`Failed to fetch the data`);
  }

  return await response.json();
}

async function Home() {
  const { allSuccessList } = await getAllSuccessList();

  return (
    <>
      <div className="mb-[1rem] flex flex-row items-center justify-between px-4">
        <Image
          src={Logo}
          alt="Success Bold Logo"
          width={40}
          placeholder="blur"
          quality={100}
          className="h-[3rem] w-[3rem]"
        />
        <H1>Success</H1>
      </div>
      <div>
        {allSuccessList.map((success) => (
          <SuccessCart key={success.id} success={success} />
        ))}
      </div>
    </>
  );
}

export default Home;
