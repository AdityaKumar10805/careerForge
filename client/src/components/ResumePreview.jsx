import ClassicTemplate from "../templates/ClassicTemplate";
import ModernTemplate from "../templates/ModernTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";

function ResumePreview({ resumeData, template }) {
  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-end p-6 print:hidden">
        <button
          onClick={handleDownload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Download PDF
        </button>
      </div>

      <div id="resume"className="p-6">
        {template === "classic" && <ClassicTemplate resumeData={resumeData} />}

        {template === "modern" && <ModernTemplate resumeData={resumeData} />}

        {template === "minimal" && <MinimalTemplate resumeData={resumeData} />}
      </div>
    </div>
  );
}

export default ResumePreview;
