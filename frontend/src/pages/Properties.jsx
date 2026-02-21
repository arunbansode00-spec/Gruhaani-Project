import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    city: "",
    bhk: "",
    maxPrice: ""
  });

  const navigate = useNavigate();

  const fetchProperties = async (filterValues = {}) => {
    try {
      setLoading(true);
      const res = await API.get("/properties", {
        params: filterValues
      });

      setProperties(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(filters);
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProperties(filters);
    }, 400);

    return () => clearTimeout(delay);
  }, [filters]);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const inputStyle = {
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    minWidth: "150px",
    fontSize: "14px"
  };

  return (
    <div style={{ background: "#f3f4f6", minHeight: "100vh" }}>

      {/* ================= HERO ================= */}
      <div
        style={{
          position: "relative",
          height: "70vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {/* overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.4))"
          }}
        />

        {/* hero content */}
        <div
          style={{
            position: "relative",
            textAlign: "center",
            color: "white",
            maxWidth: "900px"
          }}
        >
          <h1
            style={{
              fontSize: "52px",
              fontWeight: "700",
              marginBottom: "15px"
            }}
          >
            Find Your Perfect Property
          </h1>

          <p style={{ fontSize: "18px", opacity: 0.9 }}>
            Trusted real estate platform in Manipal & Udupi
          </p>

          {/* SEARCH */}
          <div
            style={{
              marginTop: "30px",
              background: "rgba(255,255,255,0.95)",
              padding: "18px",
              borderRadius: "14px",
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
            }}
          >
            <input
              name="city"
              placeholder="City"
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="bhk"
              type="number"
              placeholder="BHK"
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="maxPrice"
              type="number"
              placeholder="Max Budget"
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* ================= PROPERTY LIST ================= */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "60px auto",
          padding: "0 20px"
        }}
      >
        <h2 style={{ marginBottom: "25px", fontSize: "28px" }}>
          Available Properties
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "25px"
          }}
        >
          {loading ? (
            <h3>Loading properties...</h3>
          ) : properties.length === 0 ? (
            <h3>No properties found</h3>
          ) : (
            properties.map((p) => (
              <div
                key={p._id}
                onClick={() => navigate(`/property/${p._id}`)}
                style={{
                  background: "white",
                  borderRadius: "14px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "0.25s",
                  boxShadow: "0 4px 18px rgba(0,0,0,0.08)"
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform =
                    "translateY(-6px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform =
                    "translateY(0)")
                }
              >
                {/* SOLD badge */}
                {p.status === "sold" && (
                  <div
                    style={{
                      position: "absolute",
                      background: "red",
                      color: "white",
                      padding: "6px 12px",
                      margin: "10px",
                      borderRadius: "6px",
                      fontWeight: "bold",
                      zIndex: 2
                    }}
                  >
                    SOLD
                  </div>
                )}

                <img
                  src={
                    p.images?.[0] ||
                    "https://via.placeholder.com/400x250?text=No+Image"
                  }
                  alt="property"
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "210px",
                    objectFit: "cover"
                  }}
                />

                <div style={{ padding: "16px" }}>
                  <h3 style={{ marginBottom: "6px" }}>
                    {p.title}
                  </h3>

                  <p style={{ color: "#666" }}>
                    📍 {p.location}, {p.city}
                  </p>

                  <h3
                    style={{
                      color: "#2563eb",
                      marginTop: "8px"
                    }}
                  >
                    ₹ {Number(p.price).toLocaleString()}
                  </h3>

                  <p>
                    {p.bhk} BHK • {p.area} sqft
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Properties;