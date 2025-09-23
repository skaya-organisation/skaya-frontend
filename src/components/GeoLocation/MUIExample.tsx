import { useGeolocation } from "skayajs";
import { Button, CircularProgress } from "@mui/material";

export default function MUIExample() {
  const { location, isLoading, fetchLocation } = useGeolocation();

  return (
    <div className="p-4">
      <Button
        variant="contained"
        color="primary"
        onClick={fetchLocation}
        disabled={isLoading}
        className="px-4 py-2 rounded-lg"
      >
        {isLoading ? <CircularProgress size={20} sx={{ color: "white", mr: 1 }} /> : "Get My Location"}
      </Button>

      {location.latitude && location.longitude && (
        <p className="mt-2">
          Latitude: {location.latitude.toFixed(5)}, Longitude:{" "}
          {location.longitude.toFixed(5)}
        </p>
      )}
    </div>
  );
}