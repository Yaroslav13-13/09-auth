"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getMeClient } from "@/lib/api/clientApi";
import { User } from "@/lib/api/clientApi";
import css from "@/app/(private routes)/profile/Profile.module.css";
import Loader from "@/components/Loader/Loader";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getMeClient().then(setUser).catch(console.error);
  }, []);

  if (!user) return <Loader />;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>
        <div className={css.avatarWrapper}>
          {user.avatar && (
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          )}
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
