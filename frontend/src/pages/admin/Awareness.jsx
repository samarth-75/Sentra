import { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import API from "../../services/api";

export default function Awareness() {
  const [items, setItems] = useState([]);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchItems = async () => {
    const res = await API.get("/auth/awareness");
    setItems(res.data);
  };

  const addItem = async (e) => {
    e.preventDefault();

    await API.post("/auth/awareness/create", { type, title, content });
    fetchItems();
  };

  const deleteItem = async (id) => {
    await API.delete(`/auth/awareness/${id}`);
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Awareness Articles</h2>

      <form onSubmit={addItem} className="space-y-3 bg-white p-4 rounded shadow w-full max-w-xl">
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => setType(e.target.value)}
        >
          <option>Select Type</option>
          <option>Safety</option>
          <option>Bullying</option>
          <option>Harassment</option>
          <option>Health</option>
        </select>

        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          className="w-full p-2 border rounded"
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Article
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {items.map((i) => (
          <div key={i._id} className="p-4 bg-white rounded shadow border">
            <p className="text-sm text-blue-600 font-medium">{i.type}</p>
            <h3 className="text-xl font-semibold">{i.title}</h3>
            <p className="text-gray-600 mt-2">{i.content}</p>

            <button
              onClick={() => deleteItem(i._id)}
              className="mt-3 px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}