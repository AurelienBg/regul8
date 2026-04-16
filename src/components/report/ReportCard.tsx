export default function ReportCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="card">
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}
