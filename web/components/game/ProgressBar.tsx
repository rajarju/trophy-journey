interface ProgressBarProps {
  completed: number;
  total: number;
  showLabel?: boolean;
  size?: "sm" | "md";
}

export function ProgressBar({
  completed,
  total,
  showLabel = true,
  size = "md",
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const heightClass = size === "sm" ? "h-1.5" : "h-2";

  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 bg-surface-border rounded-full ${heightClass}`}>
        <div
          className={`bg-success rounded-full ${heightClass} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-text-muted whitespace-nowrap">
          {completed}/{total}
        </span>
      )}
    </div>
  );
}
