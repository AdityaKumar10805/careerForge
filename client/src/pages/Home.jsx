import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
function Home() {
  const {user}=useAuth()
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center flex-1 text-center px-6">
        
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Build Your Professional Resume in Minutes
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl mb-8">
          CareerForge helps you create ATS-friendly resumes, manage multiple versions, and download them instantly as PDF.
        </p>

        <div className="flex gap-4">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50"
          >
            Login
          </Link>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">

          <div className="p-6 shadow rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Easy Builder</h3>
            <p className="text-gray-600">
              Create resumes step by step with live preview.
            </p>
          </div>

          <div className="p-6 shadow rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Multiple Resumes</h3>
            <p className="text-gray-600">
              Save and manage different resume versions.
            </p>
          </div>

          <div className="p-6 shadow rounded-xl">
            <h3 className="text-xl font-semibold mb-2">PDF Download</h3>
            <p className="text-gray-600">
              Download your resume instantly as PDF.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Home;