// TODO: bune bakılacak export const dynamicParams = true;
/* TODO: bu sayfa her kullanıcı tarafından açılabilir olacak.
 *  Succesler üzerinde kullanıcıya tıklanınca kullanıcının tüm succesleri açılacak
 *  Tüm succeslerde bir de kullanıcı profilini görebileceğimiz bir link olacak*/
/* TODO: Kullanıcı profili sayfası tasarla. K. Adi, e-mail'i, profil fotosu gibi bilgiler olacak*/
// TODO: bu ekranda unauthenticated oldunduğunda navbar main page ikonu görünmüyor
// TODO: navbar main page ikonu koşul olmadan tüm sayfalarda görünsün.
// TODO: olmayan bir kulanıcı id'si url param olarak girilirse not found page dönecek

import success from "@/models/Success";

export const dynamicParams = true;

async function getUserSuccessList(userId) {
  const response = await fetch(
    `http://localhost:3000/api/userSuccessList/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return await response.json();
}

async function UserSuccessList({ params }) {
  const userSuccessList = await getUserSuccessList(params.id);
  console.log({ userSuccessList });

  return (
    <>
      <div>User Success List</div>
      {/*<div>*/}
      {/*  {userSuccessList.map((success) => (*/}
      {/*    <div key={success.id}>*/}
      {/*      <div>--------------------</div>*/}
      {/*      <div>{success.id}</div>*/}
      {/*      <div>{success.date}</div>*/}
      {/*      <div>{success.header}</div>*/}
      {/*      <div>{success.detail}l</div>*/}
      {/*      <div>{success.userId}</div>*/}
      {/*      <div>--------------------</div>*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</div>div*/}
    </>
  );
}

function Success({ success }) {
  const { id, date, header, detail, userId } = success;
  return (
    <>
      <div>--------------------</div>
      <div>id</div>
      <div>date</div>
      <div>header</div>
      <div>detail</div>
      <div>userId</div>
      <div>--------------------</div>
      <br />
      <br />
      <br />
    </>
  );
}

export default UserSuccessList;
