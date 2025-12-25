import { useState } from "react";
import StudentLayout from "../../layout/StudentLayout";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function ReportIncident() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
    anonymous: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const submitIncident = async (e) => {
    e.preventDefault();
    try{

    await API.post("/auth/incident/create", form);
    toast.success("Incident reported successfully");

    setForm({
      title: "",
      description: "",
      category: "",
      location: "",
      date: "",
      anonymous: false,
    });
  }
    catch (err) {
      toast.error("Failed to report incident. Please try again.");
    }
  };

  return (
    <StudentLayout>
      <h2 className="text-2xl font-bold mb-4">Report New Incident</h2>

      <form
        onSubmit={submitIncident}
        className="bg-white p-6 rounded shadow max-w-xl space-y-4"
      >
        <input
          name="title"
          placeholder="Incident Title"
          className="w-full p-2 border rounded"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Describe the incident"
          className="w-full p-2 border rounded"
          value={form.description}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          className="w-full p-2 border rounded"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option>Bullying</option>
<option>Harassment</option>
<option>Safety Issue</option>
<option>Technical Issue</option>
<option>Lost Item</option>
<option>Emergency</option>
<option>Other</option>
        </select>

        <input
          name="location"
          placeholder="Location"
          className="w-full p-2 border rounded"
          value={form.location}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          className="w-full p-2 border rounded"
          value={form.date}
          onChange={handleChange}
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="anonymous"
            checked={form.anonymous}
            onChange={handleChange}
          />
          Report Anonymously
        </label>

        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Submit Incident
        </button>
      </form>
    </StudentLayout>
  );
}