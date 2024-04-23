import { SUCCESS_LIST_REVALIDATE_DURATION } from "@/data/constants";

async function getSuccessById(id) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/success/${id}`,
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
    throw new Error(`Failed to fetch the success data`);
  }

  const { success } = await response.json();

  return success;
}

export default getSuccessById;
