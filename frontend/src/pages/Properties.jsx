import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Properties() {

  const [properties,setProperties]=useState([]);
  const [loading,setLoading]=useState(true);
  const [filters,setFilters]=useState({
    city:"",
    bhk:"",
    maxPrice:""
  });

  const navigate = useNavigate();

  const fetchProperties = async(values={})=>{
    try{
      setLoading(true);
      const res = await API.get("/properties",{ params: values });
      setProperties(res.data);
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false);
    }
  };

  useEffect(()=>{ fetchProperties(filters); },[]);

  useEffect(()=>{
    const delay=setTimeout(()=>{
      fetchProperties(filters);
    },400);
    return ()=>clearTimeout(delay);
  },[filters]);

  const handleChange=(e)=>{
    setFilters({...filters,[e.target.name]:e.target.value});
  };

  return (
    <div>

      {/* ===== HERO ===== */}
      <div style={hero}>
        <div style={overlay}/>
        <div style={heroContent}>
          <h1>Find Your Dream Home</h1>
          <p>Trusted real estate platform in Manipal & Udupi</p>

          {/* SEARCH */}
          <div style={searchBox}>
            <input name="city" placeholder="City" onChange={handleChange}/>
            <input name="bhk" type="number" placeholder="BHK" onChange={handleChange}/>
            <input name="maxPrice" type="number" placeholder="Max Budget" onChange={handleChange}/>
          </div>
        </div>
      </div>

      {/* ===== PROPERTY LIST ===== */}
      <div style={container}>
        <h2>Available Properties</h2>

        <div style={grid}>
          {loading ? (
            <h3>Loading properties...</h3>
          ) : properties.length===0 ? (
            <h3>No properties found</h3>
          ) : (
            properties.map(p=>(
              <div
                key={p._id}
                style={card}
                onClick={()=>navigate(`/property/${p._id}`)}
              >

                {p.status==="sold" && (
                  <div style={soldBadge}>SOLD</div>
                )}

                <img
                  src={p.images?.[0] ||
                    "https://via.placeholder.com/400x250"}
                  style={img}
                />

                <div style={{padding:"15px"}}>
                  <h3>{p.title}</h3>
                  <p>📍 {p.location}, {p.city}</p>
                  <h3 style={{color:"#2563eb"}}>
                    ₹ {Number(p.price).toLocaleString()}
                  </h3>
                  <p>{p.bhk} BHK • {p.area} sqft</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}

/* ===== STYLES ===== */

const hero={
  position:"relative",
  height:"70vh",
  backgroundImage:"url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
  backgroundSize:"cover",
  backgroundPosition:"center",
  display:"flex",
  alignItems:"center",
  justifyContent:"center"
};

const overlay={
  position:"absolute",
  inset:0,
  background:"linear-gradient(to bottom,rgba(0,0,0,.65),rgba(0,0,0,.4))"
};

const heroContent={
  position:"relative",
  color:"white",
  textAlign:"center"
};

const searchBox={
  marginTop:"25px",
  background:"white",
  padding:"18px",
  borderRadius:"14px",
  display:"flex",
  gap:"12px",
  flexWrap:"wrap"
};

const container={
  maxWidth:"1200px",
  margin:"60px auto",
  padding:"0 20px"
};

const grid={
  display:"grid",
  gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",
  gap:"25px"
};

const card={
  background:"white",
  borderRadius:"14px",
  overflow:"hidden",
  cursor:"pointer",
  transition:"0.25s",
  boxShadow:"0 4px 18px rgba(0,0,0,0.08)"
};

const img={width:"100%",height:"210px",objectFit:"cover"};

const soldBadge={
  position:"absolute",
  background:"red",
  color:"white",
  padding:"6px 12px",
  margin:"10px",
  borderRadius:"6px",
  fontWeight:"bold"
};

export default Properties;