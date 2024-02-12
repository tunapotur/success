import { Skeleton } from "@nextui-org/react";

function InputSkeleton() {
  return (
    <div className="flex flex-col justify-center gap-y-[0.5rem]">
      <Skeleton className="h-[1rem] w-[10rem] rounded-sm" />
      <Skeleton className="h-[3rem] w-full rounded-lg" />
    </div>
  );
}

export default InputSkeleton;
