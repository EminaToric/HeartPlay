export function Textarea({ ...props }) {
  return (
    <textarea
      {...props}
      className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-300"
    />
  );
}
