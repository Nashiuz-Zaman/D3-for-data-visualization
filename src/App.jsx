// style import
import BarChart from "./components/BarChart";
import "./index.css";

function App() {
  const data = [
    { name: "Smartphone", number: 150, color: "#1f77b4" },
    { name: "Laptop", number: 200, color: "#ff7f0e" },
    { name: "Headphones", number: 100, color: "#2ca02c" },
    { name: "Tablet", number: 250, color: "#d62728" },
    { name: "Smartwatch", number: 180, color: "#9467bd" },
    { name: "Camera", number: 220, color: "#ffd700" },
  ];

  const foodData = [
    { name: "Pizza", number: 250, color: "#d62728" },
    { name: "Salad", number: 120, color: "#32cd32" },
    { name: "Burger", number: 200, color: "#ffd700" },
    { name: "Taco", number: 180, color: "#8a2be2" },
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="grid grid-cols-2">
        <div>
          <BarChart data={data} />
        </div>

        <div>
          <BarChart data={foodData} />
        </div>
      </div>
    </div>
  );
}

export default App;
