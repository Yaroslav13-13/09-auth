import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ textAlign: "center", padding: "60px" }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for doesn’t exist.</p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "10px 16px",
          background: "#0070f3",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
        }}
      >
        Go back home
      </Link>
    </main>
  );
}
