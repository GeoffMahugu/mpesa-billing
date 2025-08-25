// Exporting dummy Select component for now. Replace with actual implementation.
export function Select({ children, value, onValueChange }) {
  return (
    <select value={value} onChange={(e) => onValueChange(e.target.value)}>
      {children}
    </select>
  );
}

export function SelectTrigger({ children }) {
  return <div>{children}</div>;
}

export function SelectValue({ children }) {
  return <span>{children}</span>;
}

export function SelectContent({ children }) {
  return <div>{children}</div>;
}

export function SelectItem({ children, value }) {
  return (
    <option value={value}>
      {children}
    </option>
  );
}
