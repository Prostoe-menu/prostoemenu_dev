export const Steps = ({ list }) => {
  return (
    <ul>
      {list.map((item, idx) => (
        <li key={`step${idx}`}>{item.description}</li>
      ))}
    </ul>
  );
};
