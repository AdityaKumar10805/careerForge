import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "120px",
          margin: "0",
          color: "#2563eb",
        }}
      >
        404
      </h1>

      <h2
        style={{
          marginTop: "10px",
          fontSize: "32px",
        }}
      >
        Page Not Found
      </h2>

      <p
        style={{
          color: "#666",
          marginTop: "10px",
          maxWidth: "500px",
        }}
      >
        Oops! The page you're looking for doesn't exist or may have been moved.
      </p>

      <Link
        to="/dashboard"
        style={{
          marginTop: "30px",
          padding: "12px 25px",
          background: "#2563eb",
          color: "white",
          textDecoration: "none",
          borderRadius: "8px",
          fontWeight: "bold",
        }}
      >
        Go to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;