import { useEffect, useState } from "react";
import API from "../services/api";

function Admin() {

  /* ================= STATE ================= */

  const emptyForm = {
    title:"",
    price:"",
    city:"",
    location:"",
    propertyType:"",
    bhk:"",
    area:"",
    ownerPhone:"",
    status:"available",
    description:""
  };

  const [form,setForm]=useState(emptyForm);
  const [properties,setProperties]=useState([]);
  const [editing,setEditing]=useState(null);
  const [image,setImage]=useState(null);
  const [loading,setLoading]=useState(false);

  /* ================= FETCH ================= */

  const fetchProperties = async () => {
    const res = await API.get("/properties");
    setProperties(res.data);
  };

  useEffect(()=>{ fetchProperties(); },[]);

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach(key=>{
      formData.append(key,form[key]);
    });

    // ⭐ MUST MATCH backend upload.single("image")
    if(image){
      formData.append("image",image);
    }

    try{
      setLoading(true);

      if(editing){
        await API.put(`/properties/${editing._id}`,formData,{
          headers:{ "Content-Type":"multipart/form-data" }
        });
        alert("Property Updated ✅");
      }else{
        await API.post("/properties/add",formData,{
          headers:{ "Content-Type":"multipart/form-data" }
        });
        alert("Property Added ✅");
      }

      setForm(emptyForm);
      setEditing(null);
      setImage(null);
      fetchProperties();

    }catch(err){
      console.error("ADD ERROR:",err.response?.data || err);
      alert("Failed to add property ❌");
    }finally{
      setLoading(false);
    }
  };

  /* ================= ACTIONS ================= */

  const deleteProperty = async(id)=>{
    await API.delete(`/properties/${id}`);
    fetchProperties();
  };

  const toggleStatus = async(id)=>{
    await API.patch(`/properties/${id}/status`);
    fetchProperties();
  };

  const openEdit = (p)=>{
    setEditing(p);
    setForm({...emptyForm,...p});
    window.scrollTo({top:0,behavior:"smooth"});
  };

  /* ================= UI ================= */

  return (
    <div style={page}>

      <h1 style={{marginBottom:"20px"}}>🏠 Admin Dashboard</h1>

      {/* ===== ADD / EDIT FORM ===== */}
      <form onSubmit={handleSubmit} style={formCard}>

        <h2>{editing ? "Update Property" : "Add New Property"}</h2>

        <div style={grid}>
          {Object.keys(form).map(key=>(
            key!=="description" &&
            <input
              key={key}
              placeholder={key}
              value={form[key]}
              onChange={e=>setForm({...form,[key]:e.target.value})}
              required
              style={input}
            />
          ))}
        </div>

        <textarea
          placeholder="Property Description"
          value={form.description}
          onChange={e=>setForm({...form,description:e.target.value})}
          style={textarea}
        />

        <input
          type="file"
          onChange={e=>setImage(e.target.files[0])}
        />

        <button
          type="submit"
          disabled={loading}
          style={submitBtn}
        >
          {loading
            ? "Saving..."
            : editing ? "Update Property" : "Add Property"}
        </button>

      </form>

      {/* ===== PROPERTY LIST ===== */}
      <div style={grid}>
        {properties.map(p=>(
          <div key={p._id} style={card}>

            <img
              src={
                p.images?.[0] ||
                "https://via.placeholder.com/400x250"
              }
              style={img}
            />

            <h3>{p.title}</h3>
            <p>{p.city}</p>

            <h3 style={{color:"#2563eb"}}>
              ₹ {Number(p.price).toLocaleString()}
            </h3>

            <div style={btnRow}>
              <button onClick={()=>openEdit(p)} style={editBtn}>
                Edit
              </button>

              <button onClick={()=>deleteProperty(p._id)} style={deleteBtn}>
                Delete
              </button>

              <button onClick={()=>toggleStatus(p._id)} style={toggleBtn}>
                Toggle
              </button>
            </div>

          </div>
        ))}
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

const formCard={
  background:"white",
  padding:"25px",
  borderRadius:"14px",
  marginBottom:"40px",
  boxShadow:"0 8px 25px rgba(0,0,0,0.08)"
};

const grid={
  display:"grid",
  gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",
  gap:"12px",
  marginBottom:"15px"
};

const input={
  padding:"10px",
  borderRadius:"6px",
  border:"1px solid #ddd"
};

const textarea={
  width:"100%",
  padding:"10px",
  borderRadius:"6px",
  border:"1px solid #ddd",
  marginBottom:"12px"
};

const submitBtn={
  background:"#2563eb",
  color:"white",
  border:"none",
  padding:"12px",
  borderRadius:"8px",
  cursor:"pointer",
  width:"100%",
  fontWeight:"bold"
};

const card={
  background:"white",
  padding:"15px",
  borderRadius:"12px",
  boxShadow:"0 5px 18px rgba(0,0,0,0.08)"
};

const img={
  width:"100%",
  height:"170px",
  objectFit:"cover",
  borderRadius:"10px"
};

const btnRow={display:"flex",gap:"8px",marginTop:"10px"};

const editBtn={background:"#2563eb",color:"white",border:"none",padding:"8px",borderRadius:"6px"};
const deleteBtn={background:"#ef4444",color:"white",border:"none",padding:"8px",borderRadius:"6px"};
const toggleBtn={background:"#111827",color:"white",border:"none",padding:"8px",borderRadius:"6px"};

export default Admin;