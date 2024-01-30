function Form({ handler, children }) {
  return (
    <form className="flex flex-col gap-y-6" onSubmit={handler}>
      <>{children}</>
    </form>
  );
}

export default Form;
