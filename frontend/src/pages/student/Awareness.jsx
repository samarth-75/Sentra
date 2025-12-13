import { useEffect, useState } from "react";
import StudentLayout from "../../layout/StudentLayout";
import API from "../../services/api";

export default function Awareness() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAwareness = async () => {
    try {
      const res = await API.get("/auth/awareness");
      setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAwareness();
  }, []);

  return (
    <StudentLayout>
      <h2 className="text-2xl font-bold mb-4">Awareness Hub</h2>

      {loading ? (
        <p className="text-gray-600">Loading awareness articles...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-600">No awareness content available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded shadow border"
            >
              <span className="text-sm font-medium text-blue-600">
                {item.type}
              </span>

              <h3 className="text-lg font-semibold mt-1">
                {item.title}
              </h3>

              <p className="text-gray-700 mt-2">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </StudentLayout>
  );
}