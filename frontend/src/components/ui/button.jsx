export function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
    >
      {children}
    </button>
  );
}
