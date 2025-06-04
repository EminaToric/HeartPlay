export function Textarea({ ...props }) {
  return (
    <textarea
      {...props}
      className="border border-pink-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50"
    />
  );
}
