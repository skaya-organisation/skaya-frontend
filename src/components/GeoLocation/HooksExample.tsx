import { useGeolocation } from "skayajs";

export default function GeoLocation() {
  const { location, isLoading, fetchLocation } = useGeolocation();

  return (
    <div className="p-4">
      <button
        onClick={fetchLocation}
        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? "Fetching..." : "Get My Location"}
      </button>

      {location.error && <p className="text-red-600 mt-2">Error: {location.error}</p>}

      {location.latitude && location.longitude && (
        <p className="mt-2">
          Latitude: {location.latitude.toFixed(5)}, Longitude:{" "}
          {location.longitude.toFixed(5)}
        </p>
      )}
    </div>
  );
}
