"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getMeClient, updateMeClient, User } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./EditProfile.module.css";
import Loader from "@/components/Loader/Loader";

export default function EditProfilePage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [user, setLocalUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMeClient()
      .then((data) => {
        if (data) {
          setLocalUser(data);
          setUsername(data.username);
        } else {
          setError("User not found");
        }
      })
      .catch(() => setError("Failed to load user"))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const updatedUser = await updateMeClient({ username });
      if (updatedUser) {
        // оновлюємо глобальний auth-store
        setUser({
          ...updatedUser,
          avatar: updatedUser.avatar ?? "",
        });
      }
      router.push("/profile");
    } catch {
      setError("Failed to update username");
    }
  };

  const handleCancel = () => router.push("/profile");

  if (loading) return <Loader />;
  if (!user) return <p>{error || "User not found"}</p>;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        {user.avatar && (
          <div className={css.avatarWrapper}>
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>
        )}
        <form className={css.profileInfo} onSubmit={handleSave}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <p>Email: {user.email}</p>
          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
          {error && <p className={css.error}>{error}</p>}
        </form>
      </div>
    </main>
  );
}
