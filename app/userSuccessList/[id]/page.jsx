// TODO: bune bakılacak export const dynamicParams = true;
// TODO: Succesler üzerinde kullanıcıya tıklanınca kullanıcının tüm succesleri açılacak
// TODO: Tüm succeslerde bir de kullanıcı profilini görebileceğimiz bir link olacak*/
// TODO: olmayan bir kulanıcı id'si url param olarak girilirse not found page dönecek

import SuccessCart from "@/components/SuccessCart";
import { SUCCESS_LIST_REVALIDATE_DURATION } from "@/data/constants";
import H1 from "@/components/H1";

export const dynamicParams = true;

async function UserSuccessList({ params }) {
  const { userSuccessList } = await getUserSuccessList(params.id);
  return (
    <>
      <H1>User Success List</H1>
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
