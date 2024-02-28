export const dynamicParams = true;

//TODO: olmayan bir kulanıcı id'si url param olarak girilirse not found page dönecek
async function getUser() {
  const response = await fetch("http://localhost:3000/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { user } = await response.json();
  console.log(user);

  return user;
}

async function UserSuccessList() {
  const user = await getUser();

  return (
    <>
      <div>User Success List </div>
      {/*<h1>{`${user.name} Success List`}</h1>*/}
    </>
  );
}

export default UserSuccessList;
