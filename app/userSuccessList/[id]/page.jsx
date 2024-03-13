// TODO: bune bakılacak export const dynamicParams = true;
// TODO: Succesler üzerinde kullanıcıya tıklanınca kullanıcının tüm succesleri açılacak
// TODO: Tüm succeslerde bir de kullanıcı profilini görebileceğimiz bir link olacak*/
// TODO: olmayan bir kulanıcı id'si url param olarak girilirse not found page dönecek

import SuccessCart from "@/components/SuccessCart";
import { SUCCESS_LIST_REVALIDATE_DURATION } from "@/data/constants";
import getUserById from "@/lib/getUserById";
import Image from "next/image";
import Logo from "@/public/goal-bold.png";

export const dynamicParams = true;

async function UserSuccessList({ params }) {
  const { userSuccessList } = await getUserSuccessList(params.id);
  const user = await getUserById(params.id);
  console.log("User: ", user);
  return (
    <>
      <div className={"flex flex-row items-center justify-between px-4"}>
        <Image
          src={Logo}
          alt="Success Bold Logo"
          width={40}
          placeholder="blur"
          quality={100}
          className="h-[3rem] w-[3rem]"
        />
        <h1 className="mb-4 flex flex-col items-end text-xl font-bold capitalize italic leading-tight tracking-normal text-primary">
          <div>{user.name}</div>
          <div className={"underline"}>Success List</div>
        </h1>
      </div>
      <div>
        {userSuccessList.map((success) => (
          <SuccessCart key={success.id} success={success} />
        ))}
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
      next: { revalidate: SUCCESS_LIST_REVALIDATE_DURATION },
    },
  );

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary.
    throw new Error(`Failed to fetch the data`);
  }

  return await response.json();
}

export default UserSuccessList;
