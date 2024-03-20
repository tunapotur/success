import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { UserRound } from "lucide-react";
import Link from "next/link";

export default function SuccessCart({ success }) {
  const { _id, date, header, detail } = success;
  const { name: userName } = success.user;

  return (
    <Link href={`/success/${_id}`}>
      <Card className="mb-5 max-h-[20rem]">
        <CardHeader className="justify-between px-6">
          <div className="flex h-12 w-12 flex-col items-center justify-center">
            <UserRound className="h-12 w-12" />
          </div>

          <div className="ml-4 flex flex-col">
            <h2 className="text-md line-clamp-2 text-right font-bold capitalize text-primary">
              {header}
            </h2>
            <p className="text-right text-small text-default-500">
              {format(parseISO(date), "dd  MMMM yyyy")}
            </p>
          </div>
        </CardHeader>

        <Divider />

        <CardBody className="min-h-[5rem] px-6">
          <p className="line-clamp-3">{detail}</p>
        </CardBody>

        <Divider />

        <CardFooter className={"flex justify-end px-6"}>
          <p className={"text-sm italic"}>{userName}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}

import { format, parseISO } from "date-fns";
