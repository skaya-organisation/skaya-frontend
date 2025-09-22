import React, { useEffect, useRef } from "react";
import { LocationButton, useGeolocation } from "skayajs";
import Globe from "react-globe.gl";

interface LocationProps {
  label?: string;
}

export const Location: React.FC<LocationProps> = ({
  label = "Get My Location",
}) => {
  const { location, isLoading, fetchLocation, resetLocation } = useGeolocation();
  const globeRef = useRef<any>(null);

  useEffect(() => {
    if (location.latitude && location.longitude && globeRef.current) {
      // Zoom into location on globe
      globeRef.current.pointOfView(
        { lat: location.latitude, lng: location.longitude, altitude: 1.5 },
        1500 // ms animation
      );
    }
  }, [location]);

  return (
    <div className="w-full max-w-lg p-2 bg-white rounded-xl shadow-md space-y-6 text-center">
      <div className="flex justify-center w-full">
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
      </div>

      <div className="p-4 bg-gray-50 rounded-lg flex justify-center items-center">
        {location.latitude && location.longitude ? (
          <div className="space-y-1 text-left">
            <p className="font-semibold">
              Latitude: <span className="font-normal">{location.latitude}</span>
            </p>
            <p className="font-semibold">
              Longitude:{" "}
              <span className="font-normal">{location.longitude}</span>
            </p>
          </div>
        ) : location.error ? (
          <p className="text-red-500">Error: {location.error}</p>
        ) : (
          <p className="text-gray-500">Location data is not available.</p>
        )}
      </div>

      <div className="flex justify-center gap-2">
        <LocationButton
          children={label}
          onClick={fetchLocation}
          isLoading={isLoading}
          className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        />
        <button
          onClick={resetLocation}
          className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
        >
          Reset
        </button>
      </div>

      <p className="text-gray-600">
        Click the button to get your current latitude and longitude.
      </p>
    </div>
  );
};
