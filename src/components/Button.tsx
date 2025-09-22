import React, { useEffect } from "react";
import { GetLocationButton, useGeolocation } from "skayajs";

interface MyButtonProps {
  label: string;
}

export const Location: React.FC<MyButtonProps> = ({ label }) => {
  const { location, loading, getPosition } = useGeolocation();

  useEffect(() => {
    if (!loading) {
      console.log("Location fetch complete. Final state from hook:", location);
    }
  }, [loading, location]);
  return (
    <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-md space-y-4 text-center">
      <h1 className="text-2xl font-bold text-gray-900">Get User Location</h1>
      <p className="text-gray-600">
        Click the button to get your current latitude and longitude.
      </p>

      <GetLocationButton
        label="Get My Location"
        onGetPosition={getPosition}
        isLoading={loading}
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
      />

      <div className="p-4 bg-gray-50 rounded-lg text-left">
        {loading ? (
          <p className="text-red-500 font-semibold">Loading</p>
        ) : (
          <div className="space-y-1">
            {location.latitude && location.longitude ? (
              <>
                <p className="font-semibold">
                  Latitude:{" "}
                  <span className="font-normal">{location.latitude}</span>
                </p>
                <p className="font-semibold">
                  Longitude:{" "}
                  <span className="font-normal">{location.longitude}</span>
                </p>
              </>
            ) : location.error ? (
              <p className="text-red-500">Error: {location.error}</p>
            ) : (
              <p className="text-gray-500">Location data is not available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
