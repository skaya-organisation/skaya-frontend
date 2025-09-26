import React from "react";
import { useBluetooth } from "skayajs";

const HooksExample = () => {
  const { bluetooth, isLoading, fetchBluetoothDevice, resetBluetooth } =
    useBluetooth();

  return (
    <div className="flex flex-col items-center rounded-xl  space-y-4 text-center">
      <button
        onClick={fetchBluetoothDevice}
        disabled={isLoading}
        className={`px-4 py-2 rounded text-white transition-colors duration-200 ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isLoading ? "Connecting Bluetooth..." : "Connect via Hook"}
      </button>

      {bluetooth.device && (
        <p className="text-gray-800">
          Connected to: {bluetooth.device.name || bluetooth.device.id}
        </p>
      )}

      {bluetooth.error && <p className="text-red-600">{bluetooth.error}</p>}

      <button
        onClick={resetBluetooth}
        className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-200"
      >
        Reset
      </button>
    </div>
  );
};

export default HooksExample;
