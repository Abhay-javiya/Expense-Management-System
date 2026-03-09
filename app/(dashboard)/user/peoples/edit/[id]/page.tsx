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

  return (
    <div className="p-4 max-w-xl">
      <h1 className="text-xl font-semibold mb-4">Edit Person</h1>

      <form onSubmit={submit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          required
          value={form.PeopleName}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, PeopleName: e.target.value }))
          }
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={form.Email}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, Email: e.target.value }))
          }
        />

        <input
          type="tel"
          placeholder="Mobile"
          required
          value={form.MobileNo}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, MobileNo: e.target.value }))
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
          {loading ? "Updating..." : "Update Person"}
        </button>
      </form>
    </div>
  );
}
