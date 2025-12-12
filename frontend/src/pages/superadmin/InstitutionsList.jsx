import { useEffect, useState } from "react";
import API from "../../services/api";
import SuperAdminLayout from "../../layout/SuperAdminLayout";

export default function InstitutionsList() {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInstitutions = async () => {
    try {
      const res = await API.get("/auth/institutions");
      setInstitutions(res.data);
    } catch (err) {
      console.error("Error loading institutions:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInstitutions();
  }, []);

  if (loading)
    return (
      <SuperAdminLayout>
        <p className="text-gray-600">Loading institutions...</p>
      </SuperAdminLayout>
    );

  return (
    <SuperAdminLayout>
      <h2 className="text-2xl font-bold mb-4">Institutions List</h2>

      {institutions.length === 0 ? (
        <p className="text-gray-600">No institutions found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {institutions.map((inst) => (
            <div
              key={inst._id}
              className="bg-white shadow p-5 rounded-lg border"
            >
              <h3 className="text-xl font-semibold text-blue-600">
                {inst.name}
              </h3>
              <p className="text-gray-700 mt-1">
                <strong>Email:</strong> {inst.email}
              </p>
              <p className="text-gray-700 mt-1">
                <strong>Address:</strong> {inst.address}
              </p>

              {/* FUTURE BUTTONS */}
              <div className="mt-4 flex gap-3">
                <button className="px-4 py-1 bg-blue-600 text-white rounded">
                  View Details
                </button>
                <button className="px-4 py-1 bg-red-600 text-white rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </SuperAdminLayout>
  );
}