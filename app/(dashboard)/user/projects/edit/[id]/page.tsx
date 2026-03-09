"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    ProjectName: "",
    ProjectStartDate: "",
    ProjectEndDate: "",
    ProjectDetail: "",
    Description: "",
  });

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/projects?id=${id}`).then((res) => {
      const p = res.data.data;
      setForm({
        ProjectName: p.ProjectName || "",
        ProjectStartDate: p.ProjectStartDate
          ? new Date(p.ProjectStartDate).toISOString().slice(0, 10)
          : "",
        ProjectEndDate: p.ProjectEndDate
          ? new Date(p.ProjectEndDate).toISOString().slice(0, 10)
          : "",
        ProjectDetail: p.ProjectDetail || "",
        Description: p.Description || "",
      });
    });
  }, [id]);

  const submit = async (e: any) => {
    e.preventDefault();

    if (!form.ProjectName) {
      alert("Project name is required");
      return;
    }

    setLoading(true);
    try {
      await axios.put(`/api/projects?id=${id}`, {
        ProjectName: form.ProjectName,
        ProjectStartDate: form.ProjectStartDate || null,
        ProjectEndDate: form.ProjectEndDate || null,
        ProjectDetail: form.ProjectDetail || null,
        Description: form.Description || null,
      });

      router.push("/user/projects");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl">
      <h1 className="text-xl font-semibold mb-4">Edit Project</h1>

      <form onSubmit={submit} className="space-y-4">
        <input
          type="text"
          placeholder="Project Name"
          required
          value={form.ProjectName}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, ProjectName: e.target.value }))
          }
        />

        <input
          type="date"
          value={form.ProjectStartDate}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, ProjectStartDate: e.target.value }))
          }
        />

        <input
          type="date"
          value={form.ProjectEndDate}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, ProjectEndDate: e.target.value }))
          }
        />

        <textarea
          placeholder="Project Detail"
          value={form.ProjectDetail}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, ProjectDetail: e.target.value }))
          }
        />

        <textarea
          placeholder="Description"
          value={form.Description}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, Description: e.target.value }))
          }
        />

        <button
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Updating..." : "Update Project"}
        </button>
      </form>
    </div>
  );
}
