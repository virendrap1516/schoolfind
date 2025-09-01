import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    axios.get('https://mini-project-rm2k.onrender.com/api/schools/all')
      .then(res => setSchools(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">All Schools</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {schools.map(school => (
          <div
            key={school.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center"
          >
            <img
              src={`${school.imageUrl}`}
              alt={school.name}
              className="h-40 w-full object-cover rounded-xl mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-900">{school.name}</h2>
            <p className="text-sm text-gray-600 text-center mt-1">
              {school.address}, {school.city}
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700 transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
