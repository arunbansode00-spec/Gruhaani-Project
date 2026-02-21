import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function PropertyDetails() {

  const { id } = useParams();
  const [property,setProperty]=useState(null);
  const [activeImage,setActiveImage]=useState("");

  useEffect(()=>{
    API.get(`/properties/${id}`)
      .then(res=>{
        setProperty(res.data);
        setActiveImage(res.data.images?.[0]);
      })
      .catch(err=>console.log(err));
  },[id]);

  if(!property) return <h2 style={{padding:"40px"}}>Loading...</h2>;

  return (
    <div style={page}>

      {/* ===== IMAGE SECTION ===== */}
      <div style={imageSection}>
        <img src={activeImage} style={mainImg} />

        <div style={thumbRow}>
          {property.images?.map((img,i)=>(
            <img
              key={i}
              src={img}
              style={{
                ...thumb,
                border: activeImage===img
                  ? "3px solid #2563eb"
                  : "1px solid #ddd"
              }}
              onClick={()=>setActiveImage(img)}
            />
          ))}
        </div>
      </div>

      {/* ===== CONTENT GRID ===== */}
      <div style={grid}>

        {/* LEFT SIDE */}
        <div>

          <h1>{property.title}</h1>
          <p style={{color:"#666"}}>
            📍 {property.location}, {property.city}
          </p>

          <h2 style={{color:"#2563eb"}}>
            ₹ {property.price.toLocaleString()}
          </h2>

          {/* Highlights */}
          <div style={highlightBox}>
            <div>🏠 {property.bhk} BHK</div>
            <div>📐 {property.area} sqft</div>
            <div>🏢 {property.propertyType}</div>
            <div>✅ {property.status}</div>
          </div>

          <hr style={{margin:"25px 0"}}/>

          <h3>Description</h3>
          <p style={{lineHeight:"1.7"}}>
            {property.description || "No description provided."}
          </p>

          {/* Amenities */}
          <h3 style={{marginTop:"30px"}}>Amenities</h3>
          <div style={amenities}>
            <span>🚗 Parking</span>
            <span>🔒 Security</span>
            <span>💧 Water Supply</span>
            <span>⚡ Power Backup</span>
          </div>

        </div>

        {/* RIGHT SIDE CARD */}
        <div style={contactCard}>

          <h2 style={{color:"#2563eb"}}>
            ₹ {property.price.toLocaleString()}
          </h2>

          <a
            href={`https://wa.me/${property.ownerPhone}?text=Hi I'm interested in ${property.title}`}
            target="_blank"
          >
            <button style={whatsappBtn}>
              WhatsApp Owner
            </button>
          </a>

          <button style={visitBtn}>
            Schedule Visit
          </button>

        </div>

      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const page={
  maxWidth:"1200px",
  margin:"40px auto",
  padding:"20px"
};

const imageSection={marginBottom:"25px"};

const mainImg={
  width:"100%",
  height:"420px",
  objectFit:"cover",
  borderRadius:"12px"
};

const thumbRow={
  display:"flex",
  gap:"10px",
  marginTop:"10px"
};

const thumb={
  width:"120px",
  height:"80px",
  objectFit:"cover",
  borderRadius:"6px",
  cursor:"pointer"
};

const grid={
  display:"grid",
  gridTemplateColumns:"2fr 1fr",
  gap:"30px"
};

const highlightBox={
  display:"flex",
  gap:"20px",
  marginTop:"15px",
  flexWrap:"wrap",
  background:"#f3f4f6",
  padding:"15px",
  borderRadius:"10px"
};

const amenities={
  display:"flex",
  gap:"15px",
  flexWrap:"wrap",
  marginTop:"10px"
};

const contactCard={
  position:"sticky",
  top:"100px",
  border:"1px solid #e5e7eb",
  padding:"25px",
  borderRadius:"12px",
  height:"fit-content",
  boxShadow:"0 4px 15px rgba(0,0,0,0.08)"
};

const whatsappBtn={
  width:"100%",
  padding:"12px",
  background:"#25D366",
  color:"white",
  border:"none",
  borderRadius:"6px",
  marginBottom:"10px",
  cursor:"pointer"
};

const visitBtn={
  width:"100%",
  padding:"12px",
  background:"#2563eb",
  color:"white",
  border:"none",
  borderRadius:"6px",
  cursor:"pointer"
};

export default PropertyDetails;