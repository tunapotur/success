export default function SuccessCart({ success }) {
  const { id, date, header, detail, userId } = success;
  return (
    <>
      <div>--------------------</div>
      <div>{id}</div>
      <div>{date}</div>
      <div>{header}</div>
      <div>{detail}</div>
      <div>{userId}</div>
      <div>--------------------</div>
      <br />
    </>
  );
}
