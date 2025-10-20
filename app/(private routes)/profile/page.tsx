import { cookies } from "next/headers";
import { getMeServer } from "@/lib/api/serverApi";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | NoteHub",
  description: "Your profile on NoteHub",
};

export default async function ProfilePage() {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();

  try {
    const me = await getMeServer(cookieHeader);
    return (
      <main style={{ padding: 24 }}>
        <div style={{ maxWidth: 800 }}>
          <div>
            <h1>Profile Page</h1>
            <a
              href="/profile/edit"
              style={{ marginLeft: 12 }}
              className="editProfileButton"
            >
              {" "}
              Edit Profile{" "}
            </a>
          </div>
          <div style={{ marginTop: 24 }}>
            <Image
              src={
                me.avatar || "https://ac.goit.global/fullstack/react/avatar.png"
              }
              alt="User Avatar"
              width={120}
              height={120}
            />
          </div>
          <div style={{ marginTop: 16 }}>
            <p>Username: {me.username}</p>
            <p>Email: {me.email}</p>
          </div>
        </div>
      </main>
    );
  } catch (err) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Profile</h1>
        <p>Could not load profile. Please sign in again.</p>
      </main>
    );
  }
}
