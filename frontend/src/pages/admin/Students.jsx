import { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import API from "../../services/api";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [newPassword, setNewPassword] = useState({});
  const [visibility, setVisibility] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchStudents = async () => {
    const res = await API.get("/auth/users/student");
    setStudents(res.data);
  };

  const addStudent = async (e) => {
    e.preventDefault();

    const res = await API.post("/auth/add-user", {
      name,
      email,
      role: "student",
    });

    // store password for UI display (not stored in DB)
    setNewPassword({ ...newPassword, [res.data.user._id]: res.data.password });

    fetchStudents();
  };

  const deleteStudent = async (id) => {
    await API.delete(`/auth/user/${id}`);
    fetchStudents();
  };

  const toggleVisibility = (id) => {
    setVisibility({ ...visibility, [id]: !visibility[id] });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Students</h2>

      <form
        onSubmit={addStudent}
        className="flex gap-3 bg-white p-4 rounded shadow w-fit"
      >
        <input
          type="text"
          placeholder="Name"
          className="p-2 border rounded"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-4 rounded">
          Add Student
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
          {students.map((s) => (
            <tr key={s._id} className="border-b">
              <td className="p-3">{s.name}</td>
              <td className="p-3">{s.email}</td>

              {/* PASSWORD FIELD */}
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

              {/* DELETE BUTTON */}
              <td className="p-3">
                <button
                  onClick={() => deleteStudent(s._id)}
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