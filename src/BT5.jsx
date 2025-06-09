import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapClickHandler = ({ onClick }) => {
  useMapEvents({
    click: onClick,
  });
  return null;
};

const BT5 = () => {
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [route, setRoute] = useState(null);
  const [startCoords, setStartCoords] = useState("");
  const [endCoords, setEndCoords] = useState("");

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      return response.data.display_name || "Không xác định được địa chỉ";
    } catch (error) {
      console.error("Lỗi khi lấy địa chỉ:", error);
      return "Không thể lấy địa chỉ";
    }
  };

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    console.log(`Clicked at: ${lat}, ${lng}`);
    const coordsText = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    const address = await reverseGeocode(lat, lng);

    if (!startPoint) {
      // Set start point
      setStartPoint([lat, lng]);
      setStartCoords(`${address} | Tọa độ: ${coordsText}`);
    } else if (!endPoint) {
      // Set end point
      setEndPoint([lat, lng]);
      setEndCoords(`${address} | Tọa độ: ${coordsText}`);

      // Get route between points
      getRoute(startPoint, [lat, lng]);
    } else {
      // Reset and start new selection
      setStartPoint([lat, lng]);
      setEndPoint(null);
      setRoute(null);
      setStartCoords(`${address} | Tọa độ: ${coordsText}`);
      setEndCoords("");
    }
  };

  const getRoute = async (start, end) => {
    try {
      const response = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`
      );
      setRoute(
        response.data.routes[0].geometry.coordinates.map((coord) => [
          coord[1],
          coord[0],
        ])
      );
    } catch (error) {
      console.error("Error getting route:", error);
      alert("Không thể lấy đường đi giữa 2 điểm");
    }
  };

  const resetSelection = () => {
    setStartPoint(null);
    setEndPoint(null);
    setRoute(null);
    setStartCoords("");
    setEndCoords("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h3>Bắt đầu</h3>
        <input
          type="text"
          value={startCoords}
          readOnly
          placeholder="Địa chỉ và tọa độ điểm bắt đầu"
          style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
        />

        <input
          type="text"
          value={endCoords}
          readOnly
          placeholder="Địa chỉ và tọa độ điểm kết thúc"
          style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
        />

        <button
          onClick={resetSelection}
          style={{ marginTop: "10px", padding: "8px 16px" }}
        >
          Reset
        </button>
      </div>

      <div style={{ height: "500px", width: "100%" }}>
        <MapContainer
          center={[21.0285, 105.8542]} // Ttam Hanoi
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <MapClickHandler onClick={handleMapClick} />

          {startPoint && (
            <Marker position={startPoint}>
              <Popup>
                Điểm bắt đầu
                <br />
                {startCoords}
              </Popup>
            </Marker>
          )}

          {endPoint && (
            <Marker position={endPoint}>
              <Popup>
                Điểm kết thúc
                <br />
                {endCoords}
              </Popup>
            </Marker>
          )}

          {route && (
            <Polyline positions={route} color="blue" weight={5} opacity={0.7} />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default BT5;
