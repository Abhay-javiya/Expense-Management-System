"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    ProjectName: "",
    ProjectStartDate: "",
    ProjectEndDate: "",
    ProjectDetail: "",
    Description: "",
  });

  const submit = async (e: any) => {
    e.preventDefault();

    if (!form.ProjectName) {
      alert("Project name is required");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/projects", {
        ProjectName: form.ProjectName,
        ProjectStartDate: form.ProjectStartDate || null,
        ProjectEndDate: form.ProjectEndDate || null,
        ProjectDetail: form.ProjectDetail || null,
        Description: form.Description || null,
      });

      router.push("/user/projects");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl">
      <h1 className="text-xl font-semibold mb-4">Add Project</h1>

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
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Saving..." : "Save Project"}
        </button>
      </form>
    </div>
  );
}
