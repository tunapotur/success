import SuccessCart from "@/components/SuccessCart";
import { SUCCESS_LIST_REVALIDATE_DURATION } from "@/data/constants";

export const dynamicParams = true;

async function getAllSuccessList() {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/allSuccessList`,
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

async function Home() {
  const { allSuccessList } = await getAllSuccessList();

  return (
    <>
      <h1>Main Page</h1>
      <div>
        {allSuccessList.map((success) => (
          <SuccessCart key={success.id} success={success} />
        ))}
      </div>
    </>
  );
}

export default Home;
