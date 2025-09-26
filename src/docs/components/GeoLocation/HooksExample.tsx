import { useGeolocation } from "skayajs";

export default function GeoLocation() {
  const { location, isLoading, fetchLocation, resetLocation } =
    useGeolocation();

  return (
    <div className="flex flex-col items-center rounded-xl space-y-1 text-center">
      <button
        onClick={fetchLocation}
        className={`px-6 py-2 rounded-md ${
          isLoading
            ? "bg-gray-400"
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Fetching..." : "Get My Location"}
      </button>

      {location.error && (
        <p className="text-red-600 mt-2">Error: {location.error}</p>
      )}

      <button
        color="secondary"
        onClick={resetLocation}
        className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-200"
      >
        Reset
      </button>
      {location.latitude && location.longitude && (
        <p className="mt-2">
          Latitude: {location.latitude.toFixed(5)}, Longitude:{" "}
          {location.longitude.toFixed(5)}
        </p>
      )}
    </div>
  );
}
