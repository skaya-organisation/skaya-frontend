import { useGeolocation } from "skayajs";
import { Button, CircularProgress, Typography, Box } from "@mui/material";

export default function MUIExample() {
  const { location, isLoading, fetchLocation, resetLocation } =
    useGeolocation();

  return (
    <Box className="flex flex-col items-center rounded-xl space-y-2 text-center">
      {/* Fetch Location Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={fetchLocation}
        disabled={isLoading}
        className={`px-6 py-2 rounded-md ${
          isLoading
            ? "bg-gray-400"
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
        startIcon={
          isLoading && <CircularProgress size={20} sx={{ color: "white" }} />
        }
      >
        {isLoading ? "Fetching..." : "Get My Location"}
      </Button>

      {/* Reset Button */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={resetLocation}
        className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-200"
      >
        Reset
      </Button>
      {/* Display Coordinates */}
      {location.latitude !== null && location.longitude !== null && (
        <Typography variant="body1" className="mt-2">
          Latitude: {location.latitude.toFixed(5)}, Longitude:{" "}
          {location.longitude.toFixed(5)}
        </Typography>
      )}
    </Box>
  );
}
