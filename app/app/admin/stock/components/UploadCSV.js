// Exporting dummy UploadCSV component for now. Replace with actual implementation.
export function UploadCSV({ onUpload }) {
  return (
    <div>
      <input type="file" accept=".csv" />
      <button onClick={() => onUpload([])}>Upload CSV</button>
    </div>
  );
}
