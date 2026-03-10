"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function EditPeoplePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    PeopleName: "",
    Email: "",
    MobileNo: "",
    Description: "",
  });

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/peoples?id=${id}`).then((res) => {
      const p = res.data.data;
      setForm({
        PeopleName: p.PeopleName || "",
        Email: p.Email || "",
        MobileNo: p.MobileNo || "",
        Description: p.Description || "",
      });
    });
  }, [id]);

  const submit = async (e: any) => {
    e.preventDefault();

    if (!form.PeopleName || !form.Email || !form.MobileNo) {
      alert("Name, email and mobile are required");
      return;
    }

    setLoading(true);
    try {
      await axios.put(`/api/peoples?id=${id}`, {
        PeopleName: form.PeopleName,
        Email: form.Email,
        MobileNo: form.MobileNo,
        Description: form.Description || null,
      });

      router.push("/user/peoples");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update person");
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
        <h1 className="text-2xl font-semibold text-slate-900">Edit Person</h1>
        <p className="text-sm text-slate-500">
          Update people details with a clean layout.
        </p>
      </div>

      <form
        onSubmit={submit}
        className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className={labelBase}>Name</label>
            <input
              type="text"
              required
              className={inputBase}
              value={form.PeopleName}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, PeopleName: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <label className={labelBase}>Email</label>
            <input
              type="email"
              required
              className={inputBase}
              value={form.Email}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, Email: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className={labelBase}>Mobile</label>
            <input
              type="tel"
              required
              className={inputBase}
              value={form.MobileNo}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, MobileNo: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className={labelBase}>Description</label>
          <textarea
            className={`${inputBase} min-h-[90px] resize-none`}
            placeholder="Optional notes"
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
            onClick={() => router.push("/user/peoples")}
          >
            Cancel
          </button>
          <button
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:bg-blue-700 transition"
          >
            {loading ? "Updating..." : "Update Person"}
          </button>
        </div>
      </form>
    </div>
  );
}
