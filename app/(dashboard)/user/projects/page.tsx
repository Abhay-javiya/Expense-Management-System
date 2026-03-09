"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProjectPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("/api/projects");
      setProjects(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const deleteProject = async (id: number) => {
    if (!confirm("Delete this project?")) return;

    await axios.delete(`/api/projects?id=${id}`);
    fetchProjects();
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Projects</h1>
        </div>
        <button
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          onClick={() => router.push("/user/projects/add")}
        >
          + Add Project
        </button>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Project List
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-2 text-left text-sm">
            <thead>
              <tr className="text-slate-500">
                <th className="px-3 py-2 font-medium">Name</th>
                <th className="px-3 py-2 font-medium">Start</th>
                <th className="px-3 py-2 font-medium">End</th>
                <th className="px-3 py-2 font-medium">Detail</th>
                <th className="px-3 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr
                  key={p.ProjectID}
                  className="rounded-xl bg-slate-50 text-slate-700 shadow-[0_1px_0_rgba(0,0,0,0.04)] ring-1 ring-slate-100 transition hover:bg-white"
                >
                  <td className="px-3 py-3 font-medium text-slate-900">
                    {p.ProjectName}
                  </td>
                  <td className="px-3 py-3">
                    {p.ProjectStartDate
                      ? new Date(p.ProjectStartDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-3 py-3">
                    {p.ProjectEndDate
                      ? new Date(p.ProjectEndDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-3 py-3">{p.ProjectDetail || "-"}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3 text-sm">
                      <button
                        className="font-medium text-blue-600 hover:text-blue-700"
                        onClick={() =>
                          router.push(`/user/projects/edit/${p.ProjectID}`)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="font-medium text-rose-600 hover:text-rose-700"
                        onClick={() => deleteProject(p.ProjectID)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
