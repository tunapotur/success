function Form({ onSubmit, children }) {
  return (
    <form className="flex flex-col gap-y-4" onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default Form;
