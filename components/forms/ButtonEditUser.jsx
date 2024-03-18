"use client";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { UserCog } from "lucide-react";
import { useSession } from "next-auth/react";
import { Skeleton } from "@nextui-org/react";

function ButtonEditUser({ isDisabled, userId }) {
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
          startContent={<UserCog />}
          isDisabled={isDisabled}
          onClick={() => router.push(`/editUser/${userId}`)}
          className="w-full bg-cyan-600 text-primary-foreground"
        >
          Edit User
        </Button>
      )}
    </>
  );
}

export default ButtonEditUser;
