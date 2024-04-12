import SuccessCart from "@/components/SuccessCart";
import Image from "next/image";
import Logo from "@/public/goal-bold.png";
import ButtonBack from "@/components/forms/ButtonBack";
import H1 from "@/components/H1";
import getAllSuccess from "@/lib/getAllSuccess";

async function Home() {
  const allSuccessList = await getAllSuccess();

  return (
    <>
      <div className="mb-6 flex flex-row items-center justify-between px-4">
        <div
          className={"flex w-full flex-row items-center justify-between px-2"}
        >
          <Image
            src={Logo}
            alt="Success Bold Logo"
            width={40}
            placeholder="blur"
            quality={100}
            className="h-[3rem] w-[3rem]"
          />
          <H1>success</H1>
        </div>
      </div>
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
