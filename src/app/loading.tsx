export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center mt-48">
      {/* Spinner */}
      <div className="flex items-center justify-center">
        <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>

      {/* Loading Text */}
      <p className="mt-4 text-lg text-gray-700">Loading...</p>
    </div>
  );
}
