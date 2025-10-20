"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { getMeClient, updateMeClient } from "@/lib/api/clientApi";

type Form = { username: string };

export default function EditProfilePage() {
  const { register, handleSubmit, setValue } = useForm<Form>();
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const me = await getMeClient();
        if (!mounted) return;
        setValue("username", me.username);
      } catch {
        // ignore
      }
    })();
    return () => {
      mounted = false;
    };
  }, [setValue]);

  const onSubmit = async (data: Form) => {
    try {
      await updateMeClient({ username: data.username });
      router.push("/profile");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Username:</label>
          <input id="username" {...register("username", { required: true })} />
        </div>
        <div style={{ marginTop: 12 }}>
          <button type="submit">Save</button>
          <button
            type="button"
            onClick={() => router.push("/profile")}
            style={{ marginLeft: 8 }}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
