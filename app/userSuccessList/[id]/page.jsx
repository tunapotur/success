// TODO: bune bakılacak export const dynamicParams = true;
/* TODO: bu sayfa her kullanıcı tarafından açılabilir olacak.
 *  Succesler üzerinde kullanıcıya tıklanınca kullanıcının tüm succesleri açılacak
 *  Tüm succeslerde bir de kullanıcı profilini görebileceğimiz bir link olacak*/
/* TODO: Kullanıcı profili sayfası tasarla. K. Adi, e-mail'i, profil fotosu gibi bilgiler olacak*/
// TODO: bu ekranda unauthenticated oldunduğunda navbar main page ikonu görünmüyor
// TODO: navbar main page ikonu koşul olmadan tüm sayfalarda görünsün.
// TODO: olmayan bir kulanıcı id'si url param olarak girilirse not found page dönecek
// TODO: next: { revalidate: 0 }, parametresi nextjs'in fetch i cash'lemesi. bunun için const dosyasına belirli değerler girip tanımlanacak.

import SuccessCart from "@/components/SuccessCart";
import { SUCCESS_LIST_REVALIDATE_DURATION } from "@/data/constants";

export const dynamicParams = true;

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

async function UserSuccessList({ params }) {
  const { userSuccessList } = await getUserSuccessList(params.id);

  return (
    <>
      <div>User Success List</div>
      <div>
        {userSuccessList.map((success) => (
          <SuccessCart key={success.id} success={success} />
        ))}
      </div>
    </>
  );
}

export default UserSuccessList;
