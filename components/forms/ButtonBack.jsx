"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { MoveLeft } from "lucide-react";

function ButtonBack({ isDisabled }) {
  const router = useRouter();
  return (
    <Button
      size="lg"
      radius="sm"
      variant="bordered"
      startContent={<MoveLeft />}
      isDisabled={isDisabled}
      onPress={() => router.back()}
      className={"w-full"}
    >
      Back
    </Button>
  );
}

export default ButtonBack;
