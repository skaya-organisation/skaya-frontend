import { BluetoothButton, useBluetooth } from "skayajs";

export const BluetoothDemo = () => {
  const { bluetooth, isLoading, fetchBluetoothDevice, resetBluetooth } =
    useBluetooth();

  return (
    <div className="flex flex-col items-center rounded-xl space-y-4 text-center">
      <BluetoothButton
        onClick={fetchBluetoothDevice}
        isLoading={isLoading}
        className={`px-6 py-2 rounded-md ${
          isLoading
            ? "bg-gray-400"
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
      >
        Connect to Bluetooth Device
      </BluetoothButton>

      {bluetooth.device && <p>Connected to: {bluetooth.device.name}</p>}
      {bluetooth.error && <p style={{ color: "red" }}>{bluetooth.error}</p>}

      <button
        onClick={resetBluetooth}
        className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-200"
      >
        Reset
      </button>
    </div>
  );
};

export default BluetoothDemo;
