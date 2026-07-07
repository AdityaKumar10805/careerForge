import { useEffect, useReducer } from "react";
import ResumePreview from "../components/ResumePreview";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";

const initialState = {
  title: "",
  summary: "",
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
  },
  education: [],
  skills: [],
  projects: [],
  experience: [],
  achievements: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_TITLE":
      return {
        ...state,
        title: action.payload,
      };

    case "UPDATE_SUMMARY":
      return {
        ...state,
        summary: action.payload,
      };

    case "UPDATE_PERSONAL":
      return {
        ...state,
        personalInfo: {
          ...state.personalInfo,
          [action.field]: action.payload,
        },
      };
    case "UPDATE_SKILL":
      return {
        ...state,
        skills: state.skills.map((skill, index) =>
          index === action.index ? { ...skill, name: action.payload } : skill
        ),
      };

    case "ADD_SKILL":
      return {
        ...state,
        skills: [...state.skills, { name: "" }],
      };

    case "REMOVE_SKILL":
      return {
        ...state,
        skills: state.skills.filter((_, index) => index !== action.index),
      };
    case "ADD_EDUCATION":
      return {
        ...state,
        education: [
          ...state.education,
          {
            college: "",
            degree: "",
            cgpa: "",
            startYear: "",
            endYear: "",
          },
        ],
      };

    case "UPDATE_EDUCATION":
      return {
        ...state,
        education: state.education.map((edu, index) =>
          index === action.index
            ? {
                ...edu,
                [action.field]: action.payload,
              }
            : edu
        ),
      };

    case "REMOVE_EDUCATION":
      return {
        ...state,
        education: state.education.filter((_, index) => index !== action.index),
      };

    case "ADD_PROJECT":
      return {
        ...state,
        projects: [
          ...state.projects,
          {
            title: "",
            description: "",
            technologies: "",
            githubLink: "",
          },
        ],
      };

    case "UPDATE_PROJECT":
      return {
        ...state,
        projects: state.projects.map((project, index) =>
          index === action.index
            ? {
                ...project,
                [action.field]: action.payload,
              }
            : project
        ),
      };

    case "REMOVE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter((_, index) => index !== action.index),
      };
    case "ADD_ACHIEVEMENT":
      return {
        ...state,
        achievements: [
          ...state.achievements,
          {
            title: "",
          },
        ],
      };

    case "UPDATE_ACHIEVEMENT":
      return {
        ...state,
        achievements: state.achievements.map((achievement, index) =>
          index === action.index
            ? {
                ...achievement,
                title: action.payload,
              }
            : achievement
        ),
      };

    case "REMOVE_ACHIEVEMENT":
      return {
        ...state,
        achievements: state.achievements.filter(
          (_, index) => index !== action.index
        ),
      };
    case "LOAD_RESUME":
      return action.payload;
    default:
      return state;
  }
}

function ResumeBuilder() {
  const { id } = useParams();
  const [resumeData, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const [template, setTemplate] = useState("classic");
  const [role, setRole] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const generateSummary = async () => {
    if (!role.trim()) {
      return alert("Please enter your desired role.");
    }

    try {
      setLoadingSummary(true);
      const response = await api.post("/ai/summary", {
        role,
      });
     

      dispatch({
        type: "UPDATE_SUMMARY",
        payload: response.data.summary,
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to generate summary");
    }finally{
     
        setLoadingSummary(false);
      
    }
  };
  const [currentStep, dispatchStep] = useReducer((state, action) => {
    switch (action) {
      case "NEXT":
        return state + 1;

      case "BACK":
        return state - 1;

      default:
        return state;
    }
  }, 1);
  const saveResume = async () => {
    const updatedResume = {
      ...resumeData,
      template,
    };
    try {
      let response;
      if (id) {
        response = await api.put(`/resume/${id}`, updatedResume);
      } else {
        response = await api.post("/resume/create", updatedResume);
      }

      alert(response.data.message);

      navigate("/my-resumes");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save resume");
    }
  };
  const fetchResume = async () => {
    try {
      const response = await api.get(`/resume/${id}`);

      dispatch({
        type: "LOAD_RESUME",
        payload: response.data.resume,
      });
      setTemplate(response.data.resume.template || "classic");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchResume();
    }
  }, [id]);
  const progress = (currentStep / 5) * 100;

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="grid grid-cols-2 gap-8">
        {/* LEFT SIDE */}

        <div className="bg-white shadow-lg rounded-xl p-6">
          {/* Progress Bar */}

          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{
                width: `${(currentStep / 5) * 100}%`,
              }}
            ></div>
          </div>

          {/* ---------- STEP 1 ---------- */}

          {currentStep === 1 && (
            <>
              <h2 className="text-2xl font-semibold mb-6">
                Personal Information
              </h2>

              <input
                className="border p-3 w-full mb-4 rounded"
                placeholder="Resume Title"
                value={resumeData.title}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_TITLE",

                    payload: e.target.value,
                  })
                }
              />

              <input
                className="border p-3 w-full mb-4 rounded"
                placeholder="Full Name"
                value={resumeData.personalInfo.fullName}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_PERSONAL",

                    field: "fullName",

                    payload: e.target.value,
                  })
                }
              />

              <input
                className="border p-3 w-full mb-4 rounded"
                placeholder="Email"
                value={resumeData.personalInfo.email}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_PERSONAL",

                    field: "email",

                    payload: e.target.value,
                  })
                }
              />

              <input
                className="border p-3 w-full mb-4 rounded"
                placeholder="Phone"
                value={resumeData.personalInfo.phone}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_PERSONAL",

                    field: "phone",

                    payload: e.target.value,
                  })
                }
              />

              <input
                className="border p-3 w-full mb-4 rounded"
                placeholder="LinkedIn"
                value={resumeData.personalInfo.linkedin}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_PERSONAL",

                    field: "linkedin",

                    payload: e.target.value,
                  })
                }
              />

              <input
                className="border p-3 w-full mb-4 rounded"
                placeholder="GitHub"
                value={resumeData.personalInfo.github}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_PERSONAL",

                    field: "github",

                    payload: e.target.value,
                  })
                }
              />
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Desired Role (e.g. MERN Stack Developer)"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="border p-3 rounded w-full"
                />

                <button
                  onClick={generateSummary}
                  className="bg-purple-600 text-white px-5 rounded hover:bg-purple-700"
                >
                  
                  {loadingSummary ? "Generating..." : "✨ Generate"}
                </button>

              </div>

              <textarea
                rows="6"
                className="border p-3 w-full rounded"
                placeholder="Professional Summary"
                value={resumeData.summary}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_SUMMARY",

                    payload: e.target.value,
                  })
                }
              />
            </>
          )}

          {/* ---------- STEP 2 ---------- */}

          {currentStep === 2 && (
            <>
              <h2 className="text-2xl font-semibold mb-6">Skills</h2>

              {resumeData.skills.map((skill, index) => (
                <div key={index} className="flex gap-3 mb-3">
                  <input
                    className="border p-3 rounded w-full"
                    placeholder="Enter Skill"
                    value={skill.name}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_SKILL",

                        index,

                        payload: e.target.value,
                      })
                    }
                  />

                  <button
                    className="bg-red-500 text-white px-4 rounded"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_SKILL",

                        index,
                      })
                    }
                  >
                    X
                  </button>
                </div>
              ))}

              <button
                className="bg-green-600 text-white px-6 py-2 rounded mt-4"
                onClick={() =>
                  dispatch({
                    type: "ADD_SKILL",
                  })
                }
              >
                + Add Skill
              </button>
            </>
          )}

          {/* ---------- STEP 3 ---------- */}

          {currentStep === 3 && (
            <>
              <h2 className="text-2xl font-semibold mb-6">Education</h2>

              {resumeData.education.map((edu, index) => (
                <div key={index} className="border rounded-lg p-4 mb-4">
                  <input
                    className="border p-2 rounded w-full mb-2"
                    placeholder="College"
                    value={edu.college}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_EDUCATION",

                        index,

                        field: "college",

                        payload: e.target.value,
                      })
                    }
                  />

                  <input
                    className="border p-2 rounded w-full mb-2"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_EDUCATION",

                        index,

                        field: "degree",

                        payload: e.target.value,
                      })
                    }
                  />

                  <input
                    className="border p-2 rounded w-full mb-2"
                    placeholder="CGPA"
                    value={edu.cgpa}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_EDUCATION",

                        index,

                        field: "cgpa",

                        payload: e.target.value,
                      })
                    }
                  />

                  <div className="flex gap-2">
                    <input
                      className="border p-2 rounded w-full"
                      placeholder="Start Year"
                      value={edu.startYear}
                      onChange={(e) =>
                        dispatch({
                          type: "UPDATE_EDUCATION",

                          index,

                          field: "startYear",

                          payload: e.target.value,
                        })
                      }
                    />

                    <input
                      className="border p-2 rounded w-full"
                      placeholder="End Year"
                      value={edu.endYear}
                      onChange={(e) =>
                        dispatch({
                          type: "UPDATE_EDUCATION",

                          index,

                          field: "endYear",

                          payload: e.target.value,
                        })
                      }
                    />
                  </div>

                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded mt-3"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_EDUCATION",

                        index,
                      })
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                className="bg-green-600 text-white px-6 py-2 rounded"
                onClick={() =>
                  dispatch({
                    type: "ADD_EDUCATION",
                  })
                }
              >
                + Add Education
              </button>
            </>
          )}

          {/* ---------- STEP 4 ---------- */}

          {/* ---------- STEP 5 ---------- */}

          {currentStep === 4 && (
            <>
              <h2 className="text-2xl font-semibold mb-6">Projects</h2>

              {resumeData.projects.map((project, index) => (
                <div key={index} className="border rounded-lg p-4 mb-4">
                  <input
                    className="border p-2 rounded w-full mb-2"
                    placeholder="Project Title"
                    value={project.title}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_PROJECT",

                        index,

                        field: "title",

                        payload: e.target.value,
                      })
                    }
                  />

                  <textarea
                    className="border p-2 rounded w-full mb-2"
                    rows="4"
                    placeholder="Project Description"
                    value={project.description}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_PROJECT",

                        index,

                        field: "description",

                        payload: e.target.value,
                      })
                    }
                  />

                  <input
                    className="border p-2 rounded w-full mb-2"
                    placeholder="Technologies Used"
                    value={project.technologies}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_PROJECT",

                        index,

                        field: "technologies",

                        payload: e.target.value,
                      })
                    }
                  />

                  <input
                    className="border p-2 rounded w-full mb-2"
                    placeholder="GitHub Link"
                    value={project.githubLink}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_PROJECT",

                        index,

                        field: "githubLink",

                        payload: e.target.value,
                      })
                    }
                  />

                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_PROJECT",

                        index,
                      })
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                className="bg-green-600 text-white px-6 py-2 rounded"
                onClick={() =>
                  dispatch({
                    type: "ADD_PROJECT",
                  })
                }
              >
                + Add Project
              </button>
            </>
          )}

          {/* ---------- STEP 6 ---------- */}

          {currentStep === 5 && (
            <>
              <h2 className="text-2xl font-semibold mb-6">Achievements</h2>

              {resumeData.achievements.map((achievement, index) => (
                <div key={index} className="flex gap-3 mb-3">
                  <input
                    className="border p-3 rounded w-full"
                    placeholder="Achievement"
                    value={achievement.title}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_ACHIEVEMENT",

                        index,

                        payload: e.target.value,
                      })
                    }
                  />

                  <button
                    className="bg-red-500 text-white px-4 rounded"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_ACHIEVEMENT",

                        index,
                      })
                    }
                  >
                    X
                  </button>
                </div>
              ))}

              <button
                className="bg-green-600 text-white px-6 py-2 rounded"
                onClick={() =>
                  dispatch({
                    type: "ADD_ACHIEVEMENT",
                  })
                }
              >
                + Add Achievement
              </button>
            </>
          )}

          {/* Navigation Buttons */}

          <div className="flex justify-between mt-8">
            <button
              disabled={currentStep === 1}
              onClick={() => dispatchStep("BACK")}
              className="bg-gray-600 text-white px-6 py-2 rounded"
            >
              Back
            </button>

            {currentStep < 5 ? (
              <button
                onClick={() => dispatchStep("NEXT")}
                className="bg-blue-600 text-white px-6 py-2 rounded"
              >
                Next
              </button>
            ) : (
              <button
                onClick={saveResume}
                className="bg-green-600 text-white px-6 py-2 rounded"
              >
                {id ? "Update Resume" : "Save Resume"}
              </button>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="bg-white shadow-lg rounded-xl p-4">
          <div className="flex justify-end mb-4">
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="border rounded-lg px-4 py-2"
            >
              <option value="classic">Classic</option>
              <option value="modern">Modern</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>

          <ResumePreview resumeData={resumeData} template={template} />
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;
