export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Monthly Reports</h2>
        <p className="text-slate-400 text-sm">Your full performance summary for the last 30 days.</p>
      </div>
      <div className="glass-card rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-semibold text-white mb-2">Report generating...</h3>
        <p className="text-slate-400">
          Your first monthly report will be ready at the end of the month. Come back then to see your full breakdown.
        </p>
      </div>
    </div>
  );
}
