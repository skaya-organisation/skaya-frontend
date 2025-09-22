import React, { useEffect } from 'react';
import { GetLocationButton, useGeolocation } from 'skayajs';

interface LocationProps {
    label?: string;
}

export const Location: React.FC<LocationProps> = ({ label = "Get My Location" }) => {
    const { location, loading, getPosition, resetPosition } = useGeolocation();

    useEffect(() => {
        if (!loading) {
            console.log("Location fetch complete:", location);
        }
    }, [loading, location]);

    return (
        <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-md space-y-4 text-center">
            <div className="p-4 bg-gray-50 rounded-lg flex justify-center items-center">
                {location.latitude && location.longitude ? (
                    <div className="space-y-1 text-left">
                        <p className="font-semibold">
                            Latitude: <span className="font-normal">{location.latitude}</span>
                        </p>
                        <p className="font-semibold">
                            Longitude: <span className="font-normal">{location.longitude}</span>
                        </p>
                    </div>
                ) : location.error ? (
                    <p className="text-red-500">Error: {location.error}</p>
                ) : (
                    <p className="text-gray-500">Location data is not available.</p>
                )}
            </div>

            <div className="flex justify-center gap-2">
                <GetLocationButton
                    label={label}
                    onGetPosition={getPosition}
                    isLoading={loading}
                    className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                />
                <button
                    onClick={resetPosition}
                    className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                    Reset
                </button>
            </div>

            <p className="text-gray-600">Click the button to get your current latitude and longitude.</p>
        </div>
    );
};
