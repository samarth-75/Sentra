import { useState } from "react";
import API from "../../services/api";
import SuperAdminLayout from "../../layout/SuperAdminLayout";
import toast from "react-hot-toast";  
import { sendCredentials } from "../../utils/sendCredentials";

export default function CreateInstitution() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);

  const handleCreate = async (e) => {
  e.preventDefault();

  try {
    const payload = { name, email, address };
    

    const res = await API.post("/auth/create-institution", payload);
    

    toast.success("Institution & Admin created successfully!");

    const admin = res.data.adminCredentials;
    

    if (!admin || !admin.email || !admin.password) {
      throw new Error("Invalid admin credentials payload");
    }

    try {
      await sendCredentials(admin);
      toast.success("Credentials sent to email!");
    } catch (mailErr) {
      console.error("EMAIL ERROR:", mailErr);
      toast.error("Institution created, but email failed.");
    }

  } catch (err) {
    console.error("CREATE ERROR:", err.response?.data || err.message);
    toast.error(err.response?.data?.message || err.message || "Institution creation failed");
  }
};

  return (
    <SuperAdminLayout>
      <h2 className="text-2xl font-bold mb-4">Create Institution</h2>

      <form className="space-y-4 w-full max-w-lg" onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Institution Name"
          className="w-full p-3 border rounded"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Address"
          className="w-full p-3 border rounded"
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          type="email"
          placeholder="Institution Email"
          className="w-full p-3 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Create
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-green-50 border border-green-400 rounded">
          <h3 className="text-lg font-semibold text-green-700">
            Institution Created Successfully!
          </h3>

          <p className="mt-2 text-gray-700">
            <strong>Admin Email:</strong> {result.adminLogin.email}
          </p>
          <p className="text-gray-700">
            <strong>Admin Password:</strong> {result.adminLogin.password}
          </p>
        </div>
      )}
    </SuperAdminLayout>
  );
}