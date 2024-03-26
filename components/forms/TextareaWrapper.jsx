import TextareaSkeleton from "@/components/forms/TextareaSkeleton";

function TextareaWrapper({ isLoading, children }) {
  return (
    <div className="flex min-h-[15rem] flex-col justify-center gap-y-[0.5rem]">
      {isLoading ? <TextareaSkeleton /> : children}
    </div>
  );
}

export default TextareaWrapper;
