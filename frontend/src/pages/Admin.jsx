import { useEffect, useState } from "react";
import API from "../services/api";

function Admin() {

  /* ================= STATE ================= */

  const [section,setSection]=useState("dashboard");
  const [properties,setProperties]=useState([]);
  const [editing,setEditing]=useState(null);
  const [image,setImage]=useState(null);

  const [form,setForm]=useState({
    title:"",
    price:"",
    city:"",
    location:"",
    propertyType:"",
    bhk:"",
    area:"",
    whatsapp:"",
    description:""
  });

  /* ================= FETCH ================= */

  const fetchProperties = async ()=>{
    const res = await API.get("/properties");
    setProperties(res.data);
  };

  useEffect(()=>{ fetchProperties(); },[]);

  /* ================= STATS ================= */

  const totalProperties = properties.length;
  const soldProperties = properties.filter(p=>p.status==="sold").length;
  const availableProperties = properties.filter(p=>p.status==="available").length;

  const totalValue =
    properties.reduce((sum,p)=>sum+Number(p.price||0),0);

  /* ================= ADD ================= */

  const handleAdd = async(e)=>{
    e.preventDefault();

    const formData=new FormData();
    Object.keys(form).forEach(k=>formData.append(k,form[k]));
    if(image) formData.append("image",image);

    await API.post("/properties/add",formData);

    fetchProperties();
    setSection("properties");
  };

  /* ================= ACTIONS ================= */

  const deleteProperty=async(id)=>{
    await API.delete(`/properties/${id}`);
    fetchProperties();
  };

  const toggleStatus=async(id)=>{
    await API.patch(`/properties/${id}/status`);
    fetchProperties();
  };

  const openEdit=(p)=>setEditing({...p});

  const saveEdit=async()=>{
    const formData=new FormData();
    Object.keys(editing).forEach(k=>formData.append(k,editing[k]));
    if(image) formData.append("image",image);

    await API.put(`/properties/${editing._id}`,formData);

    setEditing(null);
    fetchProperties();
  };

  /* ================= UI ================= */

  return (
    <div style={page}>

      {/* ===== SIDEBAR ===== */}
      <div style={sidebar}>
        <h2>🏠 Gruhaani</h2>

        <Menu text="Dashboard" icon="📊"
          active={section==="dashboard"}
          onClick={()=>setSection("dashboard")}
        />

        <Menu text="Properties" icon="🏡"
          active={section==="properties"}
          onClick={()=>setSection("properties")}
        />

        <Menu text="Enquiries" icon="📩"
          active={section==="enquiries"}
          onClick={()=>setSection("enquiries")}
        />

        <Menu text="Settings" icon="⚙"
          active={section==="settings"}
          onClick={()=>setSection("settings")}
        />
      </div>

      {/* ===== MAIN ===== */}
      <div style={main}>

        {/* DASHBOARD */}
        {section==="dashboard" && (
          <>
            <h1>Admin Dashboard</h1>

            <div style={statsGrid}>
              <Stat title="Total" value={totalProperties}/>
              <Stat title="Available" value={availableProperties}/>
              <Stat title="Sold" value={soldProperties}/>
              <Stat title="Total Value" value={`₹ ${totalValue.toLocaleString()}`}/>
            </div>
          </>
        )}

        {/* PROPERTIES */}
        {section==="properties" && (
          <>
            <h2>Add Property</h2>

            <form onSubmit={handleAdd} style={addCard}>
              {Object.keys(form).map(k=>(
                k!=="description" &&
                <input key={k}
                  placeholder={k}
                  onChange={e=>setForm({...form,[k]:e.target.value})}/>
              ))}

              <textarea
                placeholder="description"
                onChange={e=>setForm({...form,description:e.target.value})}
              />

              <input type="file"
                onChange={e=>setImage(e.target.files[0])}
              />

              <button style={primaryBtn}>Add Property</button>
            </form>

            <h2>Manage Properties</h2>

            <div style={grid}>
              {properties.map(p=>(
                <div key={p._id} style={card}>
                  <img src={p.images?.[0]} style={img}/>
                  <h3>{p.title}</h3>

                  <div style={btnRow}>
                    <button onClick={()=>openEdit(p)} style={primaryBtn}>Edit</button>
                    <button onClick={()=>deleteProperty(p._id)} style={deleteBtn}>Delete</button>
                    <button onClick={()=>toggleStatus(p._id)} style={darkBtn}>Toggle</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {section==="enquiries" && <h2>Enquiries Coming Soon 🚀</h2>}
        {section==="settings" && <h2>Settings Panel Coming Soon ⚙</h2>}

      </div>

      {/* EDIT MODAL */}
      {editing && (
        <div style={modalBg}>
          <div style={modal}>
            <h3>Edit Property</h3>

            {Object.keys(editing).slice(1,8).map(k=>(
              <input key={k}
                value={editing[k]}
                onChange={e=>setEditing({...editing,[k]:e.target.value})}/>
            ))}

            <button onClick={saveEdit} style={primaryBtn}>
              Update
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

/* ===== COMPONENTS ===== */

const Menu=({text,icon,onClick,active})=>(
  <div
    onClick={onClick}
    style={{
      padding:"12px",
      cursor:"pointer",
      borderRadius:"8px",
      background:active?"rgba(255,255,255,.15)":"transparent"
    }}
  >
    {icon} {text}
  </div>
);

const Stat=({title,value})=>(
  <div style={statCard}>
    <h4>{title}</h4>
    <h1>{value}</h1>
  </div>
);

/* ===== STYLES ===== */

const page={display:"flex",minHeight:"100vh",background:"#eef2ff"};
const sidebar={width:"240px",background:"#020617",color:"white",padding:"30px"};
const main={flex:1,padding:"40px"};

const statsGrid={display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"20px"};
const statCard={background:"white",padding:"25px",borderRadius:"12px"};

const addCard={background:"white",padding:"20px",margin:"20px 0"};
const grid={display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:"20px"};

const card={background:"white",padding:"15px",borderRadius:"12px"};
const img={width:"100%",height:"160px",objectFit:"cover"};

const btnRow={display:"flex",gap:"8px",marginTop:"10px"};

const primaryBtn={background:"#4f46e5",color:"white",border:"none",padding:"8px"};
const deleteBtn={background:"#ef4444",color:"white",border:"none",padding:"8px"};
const darkBtn={background:"#111827",color:"white",border:"none",padding:"8px"};

const modalBg={position:"fixed",inset:0,background:"rgba(0,0,0,.4)",display:"flex",justifyContent:"center",alignItems:"center"};
const modal={background:"white",padding:"25px",borderRadius:"12px"};

export default Admin;