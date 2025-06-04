export function Card({ children, className = "" }) {
  return <div className={`rounded-lg border bg-white p-6 shadow-lg ${className}`}>{children}</div>;
}

export function CardContent({ children }) {
  return <div className="text-base text-gray-700 leading-relaxed space-y-2">{children}</div>;
}
