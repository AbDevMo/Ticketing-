export default function Loading() {
  return (
    <div className="p-5">
      <h2 className="mb-4 text-xl font-semibold">Loading Dashboard...</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-24 bg-gray-700 rounded-md animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
}
