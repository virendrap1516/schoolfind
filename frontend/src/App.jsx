import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import AddSchool from "./pages/addSchool";
import ShowSchools from "./pages/showSchools";

function App() {
  return (

      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">SchoolApp</Link>
            <div>
              <Link to="/" className="mr-4 text-gray-700 hover:text-blue-600">View Schools</Link>
              <Link to="/add" className="text-gray-700 hover:text-blue-600">Add School</Link>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<ShowSchools />} />
          <Route path="/add" element={<AddSchool />} />
        </Routes>
      </div>
 
  );
}

export default App;