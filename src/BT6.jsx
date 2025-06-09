import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

export default function BT6() {
  const [data, setData] = useState([
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
    { x: 7, y: 0 },
    { x: 8, y: 0 },
  ]);

  const handleInputChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = Number(value);
    setData(newData);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>X</th>
            <th>Y</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="number"
                  value={item.x}
                  onChange={(e) =>
                    handleInputChange(index, "x", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.y}
                  onChange={(e) =>
                    handleInputChange(index, "y", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ width: "600px", height: "400px", marginTop: "20px" }}>
        <Bar
          data={{
            labels: data.map((item) => item.x),
            datasets: [
              {
                label: "Giá trị Y",
                data: data.map((item) => item.y),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
