import { SUCCESS_LIST_REVALIDATE_DURATION } from "@/data/constants";

async function getUserById(userId) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/user/${userId}`,
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
    throw new Error(`Failed to fetch the user data`);
  }

  const { user } = await response.json();

  return user;
}

export default getUserById;
