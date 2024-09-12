export function Message({ message }) {
  return (
    <div>
      <h3>{message.message}</h3>
      <p>{message.author}</p>
      <p>{message.date.toLocaleString()}</p>
    </div>
  );
}
