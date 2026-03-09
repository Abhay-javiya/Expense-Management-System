"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddPeoplePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    PeopleName: "",
    Email: "",
    MobileNo: "",
    Description: "",
  });

  const submit = async (e: any) => {
    e.preventDefault();

    if (!form.PeopleName || !form.Email || !form.MobileNo) {
      alert("Name, email and mobile are required");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/peoples", {
        PeopleName: form.PeopleName,
        Email: form.Email,
        MobileNo: form.MobileNo,
        Description: form.Description || null,
      });

      router.push("/user/peoples");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save person");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl">
      <h1 className="text-xl font-semibold mb-4">Add Person</h1>

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
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Saving..." : "Save Person"}
        </button>
      </form>
    </div>
  );
}
