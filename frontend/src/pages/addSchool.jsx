import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function AddSchool() {
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm();
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [schools, setSchools] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch schools
  const fetchSchools = async () => {
    try {
      const response = await axios.get('https://mini-project-rm2k.onrender.com/api/schools/all');
      setSchools(response.data);
    } catch (error) {
      console.error('Failed to fetch schools', error);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  // Add or Update school
  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key !== 'image') formData.append(key, data[key]);
    });
    if (data.image?.[0]) {
      formData.append('image', data.image[0]);
    }

    try {
      setUploading(true);

      if (editingId) {
        await axios.put(`https://mini-project-rm2k.onrender.com/api/schools/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('School updated successfully!');
      } else {
        await axios.post('https://mini-project-rm2k.onrender.com/api/schools/add', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('School added successfully!');
      }

      reset();
      setPreview(null);
      setEditingId(null);
      fetchSchools();
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || 'Failed to save school');
    } finally {
      setUploading(false);
    }
  };

  // Delete school
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this school?')) return;
    try {
      await axios.delete(`https://mini-project-rm2k.onrender.com/api/schools/${id}`);
      alert('School deleted successfully!');
      fetchSchools();
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || 'Failed to delete school');
    }
  };

  // Edit school (populate form)
  const handleEdit = (school) => {
    setEditingId(school.id);
    setValue('name', school.name);
    setValue('address', school.address);
    setValue('city', school.city);
    setValue('state', school.state);
    setValue('contact', school.contact);
    setValue('email_id', school.email_id);
    setPreview(school.imageUrl || null); // Use imageUrl from backend
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        {editingId ? 'Edit School' : 'Manage Schools'}
      </h1>

      {/* Add/Edit School Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mb-10">
        <div>
          <input
            {...register('name', { required: 'School name is required' })}
            placeholder="School Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <input
            {...register('address', { required: 'Address is required' })}
            placeholder="Address"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            {...register('city', { required: 'City is required' })}
            placeholder="City"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            {...register('state', { required: 'State is required' })}
            placeholder="State"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            {...register('contact', { required: 'Contact number is required' })}
            placeholder="Contact"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            {...register('email_id', { required: 'Email is required' })}
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <input
            type="file"
            accept="image/*"
            {...register('image')}
            className="w-full p-3 border rounded-lg cursor-pointer"
            onChange={(e) =>
              setPreview(e.target.files?.[0] ? URL.createObjectURL(e.target.files[0]) : preview)
            }
          />
          {preview && (
            <div className="mt-3">
              <p className="text-sm text-gray-600">Image Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 mt-2 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || uploading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition 
            ${uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {uploading ? 'Saving...' : editingId ? 'Update School' : 'Add School'}
        </button>
      </form>

      {/* Display Schools */}
      <h2 className="text-2xl font-bold mb-4">All Schools</h2>
      <ul className="space-y-3">
        {schools.map((school) => (
          <li key={school.id} className="flex justify-between items-center p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              {school.imageUrl && (
                <img
                  src={school.imageUrl}
                  alt={school.name}
                  className="w-16 h-16 object-cover rounded-lg border"
                />
              )}
              <div>
                <p className="font-semibold">{school.name}</p>
                <p className="text-sm text-gray-600">{school.city}, {school.state}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(school)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(school.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
