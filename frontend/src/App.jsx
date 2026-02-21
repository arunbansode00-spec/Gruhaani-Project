import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Enquiries from "./pages/Enquiries";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Properties />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/enquiries" element={<Enquiries />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;