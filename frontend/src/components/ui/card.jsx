export function Card({ children, className = "" }) {
  return <div className={`rounded-lg border bg-white p-4 shadow ${className}`}>{children}</div>;
}

export function CardContent({ children }) {
  return <div className="text-sm text-gray-800 leading-relaxed">{children}</div>;
}
