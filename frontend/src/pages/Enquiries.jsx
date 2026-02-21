import { useEffect, useState } from "react";
import API from "../services/api";

function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);

  const fetchEnquiries = async () => {
    try {
      const res = await API.get("/enquiries");
      setEnquiries(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Customer Enquiries</h1>

      {enquiries.length === 0 && <p>No enquiries yet.</p>}

      {enquiries.map((e) => (
        <div
          key={e._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px"
          }}
        >
          <h3>{e.name}</h3>
          <p>📞 {e.phone}</p>

          <p>
            🏠 Property:{" "}
            <strong>
              {e.propertyId?.title} ({e.propertyId?.city})
            </strong>
          </p>

          <p>💬 {e.message}</p>

          <small>
            {new Date(e.createdAt).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}

export default Enquiries;