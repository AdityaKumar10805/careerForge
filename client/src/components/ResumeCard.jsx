import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function ResumeCard({ resume, onDelete, onEdit }) {
  
  return (
    <div
      
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 p-6 border"
    >
      {/* Resume Title */}

      <h2 className="text-2xl font-bold text-gray-800">{resume.title}</h2>

      {/* Summary */}

      <p className="text-gray-600 mt-3 line-clamp-3">
        {resume.summary || "No summary added."}
      </p>

      {/* Resume Statistics */}

      <div className="mt-5 space-y-2 text-sm text-gray-500">
        <p>
          Skills : <span className="font-semibold">{resume.skills.length}</span>
        </p>

        <p>
          Projects :{" "}
          <span className="font-semibold">{resume.projects.length}</span>
        </p>


      </div>

      {/* Created Date */}

      <p className="mt-5 text-sm text-gray-400">
        Created : {new Date(resume.createdAt).toLocaleDateString()}
      </p>

      {/* Buttons */}

      <div className="grid grid-cols-2 gap-3 mt-6">
        <button
          onClick={() => onEdit(resume._id)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(resume._id)}
          className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
        >
          Delete
        </button>

        <Link
          to={`/resume/${resume._id}`}
          className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-center"
        >
          Preview
        </Link>

       
      </div>
    </div>
  );
}

export default ResumeCard;
