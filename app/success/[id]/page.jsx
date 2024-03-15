import { SUCCESS_LIST_REVALIDATE_DURATION } from "@/data/constants";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
} from "@nextui-org/react";
import { UserRound } from "lucide-react";

import { format, parseISO } from "date-fns";

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
      <SuccessDetail success={success} />
    </>
  );
}

function SuccessDetail({ success }) {
  const { date, header, detail } = success;

  return (
    <Card className="mb-5 min-h-[75vh]">
      <CardHeader className="justify-between">
        <div className="flex h-10 w-10 flex-col items-center justify-center">
          <UserRound className="h-10 w-10" />
        </div>

        <div className="ml-4 flex flex-col">
          <p className="text-md font-bold capitalize text-primary">{header}</p>
          <p className="text-right text-small text-default-500">
            {format(parseISO(date), "dd  MMMM yyyy")}
          </p>
        </div>
      </CardHeader>

      <Divider />

      <CardBody className="min-h-[5rem] p-5">
        <div className={"mb-5 flex flex-col items-end"}>
          <h1 className="mb-1 text-2xl font-bold capitalize text-primary">
            {header}
          </h1>
          <p className="text-right text-small text-default-500">
            {format(parseISO(date), "dd  MMMM yyyy")}
          </p>
        </div>
        <p className="font-montserrat px-2 text-justify text-[1.15rem] font-medium leading-7 tracking-wider">
          {detail}
        </p>
      </CardBody>

      <Divider />
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link>
      </CardFooter>
    </Card>
  );
}

export default Success;
