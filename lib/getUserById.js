async function getUserById(userId) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/user/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const { user } = await response.json();

  return user;
}

export default getUserById;
