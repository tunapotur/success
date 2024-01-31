function Form({ onSubmit, children }) {
  return (
    <form className="flex flex-col gap-y-6" onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default Form;
