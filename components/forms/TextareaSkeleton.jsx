import { Skeleton } from "@nextui-org/react";

function TextareaSkeleton() {
  return (
    <div className="flex flex-col justify-center gap-y-[0.5rem]">
      <Skeleton className="h-[1rem] w-[10rem] rounded-sm" />
      <Skeleton className="h-[15rem] w-full rounded-lg" />
    </div>
  );
}

export default TextareaSkeleton;
