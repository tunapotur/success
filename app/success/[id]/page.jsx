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
import getUserById from "@/lib/getUserById";
import ButtonBack from "@/components/forms/ButtonBack";

export const dynamicParams = true;

async function Success({ params }) {
  const success = await getSuccessById(params.id);
  const user = await getUserById(success.user._id);
  return (
    <>
      <SuccessDetail success={success} user={user} />
    </>
  );
}

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

function SuccessDetail({ success, user }) {
  const { date, header, detail } = success;
  const { _id: userId, name: userName } = user;

  return (
    <div>
      <Card className="mb-8 min-h-[75vh]">
        <CardHeader className="justify-end px-6">
          <Link className={""} href={`/userSuccessList/${userId}`}>
            <div className="mr-2 mt-2 flex flex-col items-end justify-center">
              <p className="text-md font-bold capitalize leading-none text-primary">
                {userName}
              </p>
              <div className="text-right text-small text-default-500">
                Success List
              </div>
            </div>

            <div className="flex h-12 w-12 flex-col items-center justify-center text-foreground">
              <UserRound className="h-10 w-10" />
            </div>
          </Link>
        </CardHeader>

        <Divider />

        <CardBody className="min-h-[5rem] px-6 py-6">
          <div className={"mb-5 flex flex-col items-end"}>
            <h1 className="mb-1 text-left text-[1.5rem] font-medium capitalize leading-none text-primary">
              {header}
            </h1>
            <p className="text-right text-small text-default-500">
              {format(parseISO(date), "dd  MMMM yyyy")}
            </p>
          </div>
          <p className="font-montserrat text-left indent-[2rem] text-[1.2rem] font-medium leading-7 tracking-wide">
            {detail}
          </p>
        </CardBody>

        <div className={"px-2 py-4"}>
          <ButtonBack />
        </div>
        <Divider />
        <CardFooter>
          <Link showAnchorIcon href={`/user/${userId}`}>
            {`Visit user profile page`}
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Success;
