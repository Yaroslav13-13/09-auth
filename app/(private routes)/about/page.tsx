"use client";

import css from "./About.module.css";

export default function AboutPage() {
  return (
    <main className={css.container}>
      <section className={css.hero}>
        <h1>Welcome to NoteHub</h1>
        <p>
          Your personal space to create, manage, and organize your notes
          efficiently.
        </p>
      </section>

      <section className={css.features}>
        <h2>Why Choose NoteHub?</h2>
        <div className={css.featureList}>
          <div className={css.featureItem}>
            <h3>Organize Your Thoughts</h3>
            <p>
              Easily categorize your notes with tags and search them anytime.
            </p>
          </div>
          <div className={css.featureItem}>
            <h3>Secure & Private</h3>
            <p>Your notes are safely stored and accessible only by you.</p>
          </div>
          <div className={css.featureItem}>
            <h3>Fast & Intuitive</h3>
            <p>
              A clean interface that helps you focus on what matters most — your
              ideas.
            </p>
          </div>
        </div>
      </section>

      <section className={css.team}>
        <h2>About the Developer</h2>
        <p>
          NoteHub is developed by a frontend developer specializing in creating
          clean and intuitive web interfaces.
        </p>
      </section>

      <section className={css.callToAction}>
        <h2>Get Started Today</h2>
        <p>
          Create your first note and experience the simplicity and power of
          NoteHub!
        </p>
      </section>
    </main>
  );
}
