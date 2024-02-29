// TODO: bune bakılacak export const dynamicParams = true;
/* TODO: bu sayfa her kullanıcı tarafından açılabilir olacak.
 *  Succesler üzerinde kullanıcıya tıklanınca kullanıcının tüm succesleri açılacak
 *  Tüm succeslerde bir de kullanıcı profilini görebileceğimiz bir link olacak*/
/* TODO: Kullanıcı profili sayfası tasarla. K. Adi, e-mail'i, profil fotosu gibi bilgiler olacak*/
// TODO: bu ekranda unauthenticated oldunduğunda navbar main page ikonu görünmüyor
// TODO: navbar main page ikonu koşul olmadan tüm sayfalarda görünsün.
// TODO: olmayan bir kulanıcı id'si url param olarak girilirse not found page dönecek
// TODO: next: { revalidate: 0 }, parametresi nextjs'in fetch i cash'lemesi. bunun için const dosyasına belirli değerler girip tanımlanacak.

import success from "@/models/Success";

export const dynamicParams = true;

// Will revalidate every 1 moment
// 60*60 = 3600 1 hour
const revalidateDuration = 60;

// http://localhost:3000/api/userSuccessList/65d305aef8a0af475dc21a76
// http://localhost:3000/userSuccessList/65d305aef8a0af475dc21a76
async function getUserSuccessList(userId) {
  const response = await fetch(
    `http://localhost:3000/api/userSuccessList/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: revalidateDuration },
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
          <Success key={success.id} success={success} />
        ))}
      </div>
    </>
  );
}

function Success({ success }) {
  const { id, date, header, detail, userId } = success;
  return (
    <>
      <div>--------------------</div>
      <div>{id}</div>
      <div>{date}</div>
      <div>{header}</div>
      <div>{detail}</div>
      <div>{userId}</div>
      <div>--------------------</div>
      <br />
    </>
  );
}

export default UserSuccessList;
