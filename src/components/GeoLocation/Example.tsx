import React, { useEffect, useRef } from "react";
import { LocationButton, useGeolocation } from "skayajs";
import Globe from "react-globe.gl";


const Location = ({ label = "Track Me" }) => {
  const { location, isLoading, fetchLocation, resetLocation } = useGeolocation();
  const globeRef = useRef<any>(null);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      globeRef.current?.pointOfView(
        { lat: location.latitude, lng: location.longitude, altitude: 1.5 },
        1500
      );
    }
  }, [location]);

  return (
    <div className="flex flex-col items-center rounded-xl  space-y-6 text-center">
      {/* Globe */}
      <Globe
        ref={globeRef}
        width={400}
        height={400}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        pointsData={
          location.latitude && location.longitude
            ? [{ lat: location.latitude, lng: location.longitude, size: 1 }]
            : []
        }
        pointAltitude={0.2}
        pointColor={() => "red"}
      />

      {location.latitude && location.longitude && (
        <p className="mt-2">
          Latitude: {location.latitude.toFixed(5)}, Longitude:{" "}
          {location.longitude.toFixed(5)}
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <LocationButton
          onClick={fetchLocation}
          isLoading={isLoading}
          className={`px-6 py-2 rounded-md ${
            isLoading
              ? "bg-gray-400"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {isLoading ? "Loading..." : label}
        </LocationButton>

        <button
          onClick={resetLocation}
          className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
        >
          Reset
        </button>
      </div>

      <p className="text-gray-800 dark:text-gray-200 pb-4">
        Click the button to get your current latitude and longitude.
      </p>
    </div>
  );
};

export default Location;
