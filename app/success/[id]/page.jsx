import SuccessCart from "@/components/SuccessCart";
import { SUCCESS_LIST_REVALIDATE_DURATION } from "@/data/constants";
import H1 from "@/components/H1";
import Image from "next/image";
import Logo from "@/public/goal-bold.png";

export const dynamicParams = true;

async function getSuccess(id) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/getSuccess/${id}`,
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

async function Success({ params }) {
  const success = await getSuccess(params.id);
  return (
    <>
      <div>Success Detail</div>
      <div>{success._id}</div>
      <div>{success.header}</div>
      <div>{success.detail}</div>
      <div>{success.userId}</div>
    </>
  );
}

export default Success;
