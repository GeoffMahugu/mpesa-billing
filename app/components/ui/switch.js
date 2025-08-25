// Exporting dummy Switch component for now. Replace with actual implementation.
export function Switch({ checked, onCheckedChange }) {
  return (
    <label>
      <input type="checkbox" checked={checked} onChange={(e) => onCheckedChange(e.target.checked)} />
    </label>
  );
}
