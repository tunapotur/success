import InputSkeleton from "./InputSkeleton";

function InputWrapper({ isLoading, children }) {
  return (
    <div className="flex h-[5rem] flex-col justify-center gap-y-[0.5rem]">
      {isLoading ? <InputSkeleton /> : children}
    </div>
  );
}

export default InputWrapper;
