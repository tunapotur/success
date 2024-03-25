"use client";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { FilePenLine } from "lucide-react";
import { useSession } from "next-auth/react";
import { Skeleton } from "@nextui-org/react";

function ButtonEditUser({ isDisabled, successId }) {
  const router = useRouter();
  const { status } = useSession();

  return (
    <>
      {status === "loading" && (
        <Skeleton className="h-[3rem] w-full rounded-lg" />
      )}
      {status === "authenticated" && (
        <Button
          size="lg"
          radius="sm"
          variant="bordered"
          startContent={<FilePenLine />}
          isDisabled={isDisabled}
          onClick={() => router.push(`/editSuccess/${successId}`)}
          className="w-full bg-primary text-primary-foreground"
        >
          Edit Success
        </Button>
      )}
    </>
  );
}

export default ButtonEditUser;
