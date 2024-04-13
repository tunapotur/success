// TODO: bune bakılacak export const dynamicParams = true;
// TODO: Succesler üzerinde kullanıcıya tıklanınca kullanıcının tüm succesleri açılacak
// TODO: Tüm succeslerde bir de kullanıcı profilini görebileceğimiz bir link olacak*/
// TODO: olmayan bir kulanıcı id'si url param olarak girilirse not found page dönecek

import SuccessCart from "@/components/SuccessCart";
// import { SUCCESS_LIST_REVALIDATE_DURATION } from "@/data/constants";
import getUserById from "@/lib/getUserById";
import Image from "next/image";
import Logo from "@/public/goal-bold.png";
import { Link } from "@nextui-org/react";
import ButtonBack from "@/components/forms/ButtonBack";

export const dynamicParams = true;

async function UserSuccessList({ params }) {
  const userSuccessList = await getUserSuccessList(params.id);
  const user = await getUserById(params.id);

  return (
    <>
      <div className={"mb-6 flex flex-row items-start justify-between px-4"}>
        <Link href={`/`}>
          <Image
            src={Logo}
            alt="Success Bold Logo"
            width={40}
            placeholder="blur"
            quality={100}
            className="h-[3rem] w-[3rem]"
          />
        </Link>
        <Link href={`/user/${user._id}`}>
          <h1 className="flex flex-col items-end text-xl font-bold capitalize italic leading-tight tracking-normal text-primary">
            <div>{user.name}</div>
            <div className={"underline"}>Success</div>
          </h1>
        </Link>
      </div>
      <div>
        {userSuccessList.map((success) => (
          <SuccessCart key={success._id} success={success} />
        ))}
      </div>
      <div className={"mt-16"}>
        <ButtonBack />
      </div>
    </>
  );
}

async function getUserSuccessList(userId) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/userSuccessList/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // next: { revalidate: SUCCESS_LIST_REVALIDATE_DURATION },
    },
  );

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary.
    throw new Error(`Failed to fetch the data`);
  }

  const { data } = await response.json();

  return data;
}

export default UserSuccessList;
