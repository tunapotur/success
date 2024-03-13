function H1({ className, children }) {
  return (
    <div className={className}>
      <h1 className="text-4xl font-bold capitalize tracking-wide text-primary underline drop-shadow-sm">
        {children}
      </h1>
    </div>
  );
}

export default H1;
