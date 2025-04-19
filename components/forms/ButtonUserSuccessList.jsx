"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { List } from "lucide-react";
import { useParams } from "next/navigation";

function ButtonUserSuccessList({ isDisabled }) {
  const router = useRouter();
  const params = useParams();
  const link = params ? `/userSuccessList/${params?.id}` : "#";

  return (
    <Button
      size="lg"
      radius="sm"
      variant="bordered"
      startContent={<List />}
      isDisabled={isDisabled}
      onPress={() => router.push(link)}
      className="w-full bg-cyan-600 text-primary-foreground"
    >
      User Success List
    </Button>
  );
}

export default ButtonUserSuccessList;
