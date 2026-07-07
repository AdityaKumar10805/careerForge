import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {useState, useEffect } from "react";
import api from "../services/api";
function Dashboard() {
  const {user}=useAuth();
  const [resumes,setResumes]=useState([])
  const fetchResume = async () => {
    try {
      const response = await api.get(`/resume/`);

     
      setResumes(response.data.resume);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Your side-effect logic goes here
  fetchResume()
   
  }, []);
 
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      
      {/* Header */}
      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.name} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Manage and build your professional resumes
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Total Resumes</h2>
          <p className="text-3xl font-bold mt-2">{resumes.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">AI Score</h2>
          <p className="text-3xl font-bold mt-2 text-green-600">100%</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Profile Status</h2>
          <p className="text-3xl font-bold mt-2 text-blue-600">Active</p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

        <div className="flex gap-4 flex-wrap">

          <Link to="/resume-builder">
            <button className="bg-blue-600 text-white px-5 py-2 rounded">
              Create Resume
            </button>
          </Link>

          <Link to="/my-resumes">
            <button className="bg-gray-800 text-white px-5 py-2 rounded">
              My Resumes
            </button>
          </Link>

          <Link to="/profile">
            <button className="bg-green-600 text-white px-5 py-2 rounded">
              View Profile
            </button>
          </Link>

        </div>
      </div>

    </div>
  );
}

export default Dashboard;