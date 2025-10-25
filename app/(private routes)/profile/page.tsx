import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getMeServer } from "@/lib/api/serverApi";
import css from "../../Profile.module.css";

export const metadata: Metadata = {
  title: "Profile | NoteHub",
  description: "User profile page in NoteHub app",
};

export default async function ProfilePage() {
  const user = await getMeServer();

  if (!user) {
    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <p>User not found or unauthorized.</p>
          <Link href="/sign-in" className={css.editProfileButton}>
            Go to Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>

          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          {user.avatar && (
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
              priority
            />
          )}
        </div>

        <div className={css.profileInfo}>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>
    </main>
  );
}
