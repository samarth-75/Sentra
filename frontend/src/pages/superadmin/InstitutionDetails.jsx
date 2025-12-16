import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import SuperAdminLayout from "../../layout/SuperAdminLayout";

export default function InstitutionDetails() {
  const { id } = useParams();
  const [institution, setInstitution] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstitution();
  }, []);

  const fetchInstitution = async () => {
    try {
      const res = await API.get(`/auth/institution/${id}`);
      setInstitution(res.data);
    } catch (err) {
      console.error("Error loading institution details:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SuperAdminLayout>
        <p className="text-gray-600">Loading institution details...</p>
      </SuperAdminLayout>
    );
  }

  if (!institution) {
    return (
      <SuperAdminLayout>
        <p className="text-red-600">Institution not found.</p>
      </SuperAdminLayout>
    );
  }

  return (
    <SuperAdminLayout>
      <h2 className="text-2xl font-bold mb-4">{institution.name}</h2>

      <div className="bg-white p-6 rounded shadow max-w-lg">
        <p><strong>Email:</strong> {institution.email}</p>
        <p><strong>Address:</strong> {institution.address}</p>
        <p className="text-sm text-gray-500 mt-2">
          Created At: {new Date(institution.createdAt).toLocaleDateString()}
        </p>
      </div>
    </SuperAdminLayout>
  );
}