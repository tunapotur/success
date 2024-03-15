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

async function getSuccessById(id) {
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

async function getUserById(id) {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: SUCCESS_LIST_REVALIDATE_DURATION },
  });

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary.
    throw new Error(`Failed to fetch the user data`);
  }

  const { user } = await response.json();

  return user;
}

async function Success({ params }) {
  const success = await getSuccessById(params.id);
  const user = await getUserById(success.userId);
  return (
    <>
      <SuccessDetail success={success} user={user} />
    </>
  );
}

function SuccessDetail({ success, user }) {
  const { date, header, detail } = success;
  const { _id: userId, name: userName } = user;

  return (
    <Card className="mb-5 min-h-[75vh]">
      <CardHeader className="items-center justify-end px-12">
        <Link href={`/userSuccessList/${userId}`}>
          <div className="mr-4 flex flex-col">
            <p className="text-md font-bold capitalize text-primary">
              {userName}
            </p>
          </div>

          <div className="flex h-10 w-10 flex-col items-center justify-center text-foreground">
            <UserRound className="h-10 w-10" />
          </div>
        </Link>
      </CardHeader>

      <Divider />

      <CardBody className="min-h-[5rem] px-12 py-6">
        <div className={"mb-5 flex flex-col items-end"}>
          <h1 className="mb-1 text-left indent-[2rem] text-2xl font-medium capitalize text-primary">
            {header}
          </h1>
          <p className="text-right text-small text-default-500">
            {format(parseISO(date), "dd  MMMM yyyy")}
          </p>
        </div>
        <p className="text-justify indent-[2rem] font-montserrat text-[1.125rem] font-medium leading-8 tracking-wider">
          {detail}
        </p>
      </CardBody>

      <Divider />
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/tunapotur/success"
        >
          Visit source code on GitHub.
        </Link>
      </CardFooter>
    </Card>
  );
}

export default Success;
