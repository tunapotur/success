import {
  Card,
  CardHeader,
  CardBody,
  //CardFooter,
  Divider,
} from "@nextui-org/react";
import { UserRound } from "lucide-react";
import Link from "next/link";
export default function SuccessCart({ success }) {
  const { id, date, header, detail } = success;

  return (
    <Link href={`/success/${id}`}>
      <Card className="mb-5 max-h-[20rem]">
        <CardHeader className="justify-between">
          <div className="flex h-10 w-10 flex-col items-center justify-center">
            <UserRound className="h-10 w-10" />
          </div>

          <div className="ml-4 flex flex-col">
            <p className="text-md line-clamp-1 font-bold capitalize text-primary">
              {header}
            </p>
            <p className="text-right text-small text-default-500">
              {format(parseISO(date), "dd  MMMM yyyy")}
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="min-h-[5rem]">
          <p className="line-clamp-5">{detail}</p>
        </CardBody>
      </Card>
    </Link>
  );
}

import { format, parseISO } from "date-fns";
