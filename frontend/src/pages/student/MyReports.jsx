import { useEffect, useState } from "react";
import StudentLayout from "../../layout/StudentLayout";
import API from "../../services/api";

export default function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyReports = async () => {
    try {
      const res = await API.get("/auth/incident/my");
      setReports(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyReports();
  }, []);

  const statusColor = (status) => {
    if (status === "Pending") return "bg-yellow-100 text-yellow-700";
    if (status === "In Progress") return "bg-blue-100 text-blue-700";
    if (status === "Resolved") return "bg-green-100 text-green-700";
    return "";
  };

  return (
    <StudentLayout>
      <h2 className="text-2xl font-bold mb-4">My Reports</h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : reports.length === 0 ? (
        <p className="text-gray-600">You haven’t reported any incidents yet.</p>
      ) : (
        <div className="space-y-4">
          {reports.map((r) => (
            <div
              key={r._id}
              className="bg-white p-5 rounded shadow border"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{r.title}</h3>
                <span
                  className={`px-3 py-1 text-sm rounded ${statusColor(
                    r.status
                  )}`}
                >
                  {r.status}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                Reference ID: {r.referenceId}
              </p>

              <p className="mt-2 text-gray-700">{r.description}</p>

              <div className="text-sm text-gray-500 mt-3">
                <p>Category: {r.category}</p>
                <p>Location: {r.location}</p>
                <p>
                  Reported on:{" "}
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>
                {r.anonymous && (
                  <p className="italic text-gray-400">
                    Reported anonymously
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </StudentLayout>
  );
}