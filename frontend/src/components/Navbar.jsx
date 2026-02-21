import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backdropFilter: "blur(10px)",
        background: "rgba(10,18,35,0.85)",
        color: "white",
        padding: "14px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 12px rgba(0,0,0,0.25)"
      }}
    >
      {/* BRAND */}
      <h2
        style={{
          cursor: "pointer",
          letterSpacing: "1px",
          fontWeight: "700"
        }}
        onClick={() => navigate("/")}
      >
        Gruhaani
      </h2>

      {/* LINKS */}
      <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
        <Link style={linkStyle} to="/">Properties</Link>
        <Link style={linkStyle} to="/admin">Admin</Link>
        <Link style={linkStyle} to="/enquiries">Enquiries</Link>

        <button
          onClick={logout}
          style={{
            background: "#ef4444",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            color: "white",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500"
};

export default Navbar;