import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import Loading from "../components/Loading";
import ResumeCard from "../components/ResumeCard";

function MyResumes() {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await api.get("/resume/");

      setResumes(response.data.resume);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await api.delete(`/resume/${id}`);

      alert(response.data.message);

      setResumes((prev) => prev.filter((resume) => resume._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  const editResume = (id) => {
    navigate(`/resume-builder/${id}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}

      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold">My Resumes</h1>

          <p className="text-gray-500 mt-2">
            Manage all your resumes in one place.
          </p>
        </div>

        <Link
          to="/resume-builder"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition"
        >
          + Create Resume
        </Link>
      </div>

      {resumes.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <h2 className="text-2xl font-semibold">No Resume Found</h2>

          <p className="text-gray-500 mt-3">
            Create your first professional resume.
          </p>

          <Link
            to="/resume-builder"
            className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Create Resume
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume._id}
              resume={resume}
              onDelete={deleteResume}
              onEdit={editResume}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyResumes;
