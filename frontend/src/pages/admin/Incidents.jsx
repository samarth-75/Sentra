import { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import API from "../../services/api";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");

  const fetchIncidents = async () => {
    const res = await API.get("/auth/incident/all");
    setIncidents(res.data);
  };

  const updateIncident = async (e) => {
    e.preventDefault();

    await API.put(`/auth/incident/update/${selected._id}`, {
      status,
      notes,
    });

    fetchIncidents();
    setSelected(null);
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Incident Reports</h2>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Ref ID</th>
            <th className="p-3">Title</th>
            <th className="p-3">Reporter</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {incidents.map((i) => (
            <tr key={i._id} className="border-b">
              <td className="p-3">{i.referenceId}</td>
              <td className="p-3">{i.title}</td>
              <td className="p-3">
                {i.anonymous ? "Anonymous" : i.reporterId?.name}
              </td>
              <td className="p-3">{i.status}</td>
              <td className="p-3">
                <button
                  onClick={() => {
                    setSelected(i);
                    setStatus(i.status);
                    setNotes(i.notes || "");
                  }}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Manage
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div className="mt-6 bg-white p-6 border rounded shadow w-full max-w-lg">
          <h3 className="text-xl font-bold mb-3">
            Update Incident – {selected.referenceId}
          </h3>

          <form onSubmit={updateIncident} className="space-y-3">

            <select
              className="w-full p-2 border rounded"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            <textarea
              className="w-full p-2 border rounded"
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Save Changes
            </button>
          </form>
        </div>
      )}
    </AdminLayout>
  );
}