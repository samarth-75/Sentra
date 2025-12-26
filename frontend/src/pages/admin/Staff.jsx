import { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import API from "../../services/api";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { sendCredentials } from "../../utils/sendCredentials";
import toast from "react-hot-toast";

export default function Staff() {
  const [staff, setStaff] = useState([]);
  const [visibility, setVisibility] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchStaff = async () => {
    const res = await API.get("/auth/users/staff");
    setStaff(res.data);
  };

  const addStaff = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/add-user", {
        name,
        email,
        role: "staff",
      });

      toast.success("Staff created successfully!");

      try {
        await sendCredentials(res.data.credentials);
        toast.success("Credentials emailed!");
      } catch {
        toast.error("Staff created, but email failed");
      }

      fetchStaff();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create staff");
    }
  };

  const deleteStaff = async (id) => {
    await API.delete(`/auth/user/${id}`);
    toast.success("Staff deleted");
    fetchStaff();
  };

  const toggleVisibility = (id) => {
    setVisibility({ ...visibility, [id]: !visibility[id] });
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Staff Members</h2>

      <form
        onSubmit={addStaff}
        className="flex gap-3 bg-white p-4 rounded shadow w-fit"
      >
        <input
          type="text"
          placeholder="Name"
          className="p-2 border rounded"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="bg-blue-600 text-white px-4 rounded">
          Add Staff
        </button>
      </form>

      <table className="w-full mt-6 bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Password</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {staff.map((s) => (
            <tr key={s._id} className="border-b">
              <td className="p-3">{s.name}</td>
              <td className="p-3">{s.email}</td>

              <td className="p-3 flex items-center gap-2">
                {visibility[s._id] ? s.plainPassword : "••••••••"}

                <button onClick={() => toggleVisibility(s._id)}>
                  {visibility[s._id] ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-600" />
                  )}
                </button>
              </td>

              <td className="p-3">
                <button
                  onClick={() => deleteStaff(s._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}