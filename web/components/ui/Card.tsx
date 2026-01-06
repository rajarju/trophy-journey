interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({
  children,
  className = "",
  onClick,
  hoverable = false,
}: CardProps) {
  return (
    <div
      className={`bg-surface border border-surface-border rounded-lg ${
        hoverable ? "hover:bg-surface-hover cursor-pointer transition-colors" : ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
