"use client";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { MoveLeft } from "lucide-react";

function ButtonBack() {
  const router = useRouter();
  return (
    <Button
      size="lg"
      radius="sm"
      variant="bordered"
      startContent={<MoveLeft />}
      onClick={() => router.back()}
    >
      Back
    </Button>
  );
}

export default ButtonBack;
