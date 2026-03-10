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

  const inputBase =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition";
  const labelBase = "text-xs font-semibold text-slate-600";

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Add Project</h1>
        <p className="text-sm text-slate-500">
          Create a project with clear timelines and notes.
        </p>
      </div>

      <form
        onSubmit={submit}
        className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <label className={labelBase}>Project Name</label>
            <input
              type="text"
              required
              placeholder="Project name"
              className={inputBase}
              value={form.ProjectName}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, ProjectName: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <label className={labelBase}>Start Date</label>
            <input
              type="date"
              className={inputBase}
              value={form.ProjectStartDate}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, ProjectStartDate: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <label className={labelBase}>End Date</label>
            <input
              type="date"
              className={inputBase}
              value={form.ProjectEndDate}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, ProjectEndDate: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className={labelBase}>Project Detail</label>
          <textarea
            className={`${inputBase} min-h-[90px] resize-none`}
            placeholder="Optional notes"
            value={form.ProjectDetail}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, ProjectDetail: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className={labelBase}>Description</label>
          <textarea
            className={`${inputBase} min-h-[90px] resize-none`}
            placeholder="Additional details"
            value={form.Description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, Description: e.target.value }))
            }
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
            onClick={() => router.push("/user/projects")}
          >
            Cancel
          </button>
          <button
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:bg-blue-700 transition"
          >
            {loading ? "Saving..." : "Save Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
