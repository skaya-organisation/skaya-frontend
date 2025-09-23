import React, { useEffect, useRef } from "react";
import { LocationButton, useGeolocation } from "skayajs";
import Globe from "react-globe.gl";

interface LocationProps {
  label?: string;
}

const Location: React.FC<LocationProps> = ({
  label = "Get My Location",
}) => {
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
    <div className="flex flex-col items-center rounded-xl shadow-md space-y-6 text-center">
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

      {/* Location Info */}
      <div className="p-4 w-full bg-blue-200 dark:bg-blue-800 rounded-lg ">
        {location.latitude && location.longitude ? (
          <>
            <p>
              <span className="font-semibold">Latitude:</span>{" "}
              {location.latitude}
            </p>
            <p>
              <span className="font-semibold">Longitude:</span>{" "}
              {location.longitude}
            </p>
          </>
        ) : (
          <p className={location.error ? "text-red-800 dark:text-red-300" : "text-gray-500"}>
            {location.error || "Location data is not available."}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <LocationButton
          onClick={fetchLocation}
          isLoading={isLoading}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {label}
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

export default Location