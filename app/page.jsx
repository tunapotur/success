import SuccessCart from "@/components/SuccessCart";
import { SUCCESS_LIST_REVALIDATE_DURATION } from "@/data/constants";
import H1 from "@/components/H1";
import Image from "next/image";
import Logo from "@/public/goal-bold.png";
import ButtonBack from "@/components/forms/ButtonBack";

export const dynamicParams = true;

async function getAllSuccess() {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/getAllSuccess`,
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
  const { data } = await response.json();

  return data;
}

async function Home() {
  const allSuccessList = await getAllSuccess();

  return (
    <>
      <div className="mb-6 flex flex-row items-center justify-between px-4">
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
      <H1>Deploy</H1>
      <div>
        {allSuccessList.map((success) => (
          <SuccessCart key={success._id} success={success} />
        ))}
      </div>
      <div className={"mt-16"}>
        <ButtonBack />
      </div>
    </>
  );
}

export default Home;
