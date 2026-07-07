import {
  FaEnvelope,
  FaPhone,
  FaGithub,
  FaLinkedin,
  FaUserGraduate,
  FaBriefcase,
  FaCode,
  FaTrophy,
} from "react-icons/fa";

function ModernTemplate({ resumeData }) {
  return (
    <div className="max-w-6xl mx-auto bg-white shadow-2xl min-h-screen flex">
      {/* LEFT SIDEBAR */}

      <div className="w-[32%] bg-slate-800 text-white p-8">
        <h1 className="text-4xl font-bold leading-tight uppercase">
          {resumeData.personalInfo.fullName || "Your Name"}
        </h1>

        <p className="mt-3 uppercase tracking-[5px] text-blue-300">
          Software Engineer
        </p>

        {/* CONTACT */}

        <div className="mt-12">
          <h2 className="text-xl font-semibold border-b border-gray-500 pb-2">
            CONTACT
          </h2>

          <div className="space-y-6 mt-6">
            <a
              href={`mailto:${resumeData.personalInfo.email}`}
              className="flex items-start gap-3 hover:text-blue-300 break-all"
            >
              <FaEnvelope className="mt-1 flex-shrink-0" />
              <span className="break-all">email</span>
            </a>

            <a
              href={`tel:${resumeData.personalInfo.phone}`}
              className="flex gap-3 items-center hover:text-blue-300"
            >
              <FaPhone />
              <span>{resumeData.personalInfo.phone}</span>
            </a>

            <a
              href={
                resumeData.personalInfo.linkedin.startsWith("http")
                  ? resumeData.personalInfo.linkedin
                  : `https://${resumeData.personalInfo.linkedin}`
              }
              target="_blank"
              rel="noreferrer"
              className="flex gap-3 items-center hover:text-blue-300"
            >
              <FaLinkedin />
              <span>LinkedIn</span>
            </a>

            <a
              href={
                resumeData.personalInfo.github.startsWith("http")
                  ? resumeData.personalInfo.github
                  : `https://${resumeData.personalInfo.github}`
              }
              target="_blank"
              rel="noreferrer"
              className="flex gap-3 items-center hover:text-blue-300"
            >
              <FaGithub />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* SKILLS */}

        <div className="mt-12">
          <h2 className="text-xl font-semibold border-b border-gray-500 pb-2">
            SKILLS
          </h2>

          <div className="flex flex-wrap gap-3 mt-6">
            {resumeData.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-600 px-4 py-2 rounded-full text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* EDUCATION */}

        <div className="mt-12">
          <h2 className="text-xl font-semibold border-b border-gray-500 pb-2 flex items-center gap-3">
            <FaUserGraduate />
            EDUCATION
          </h2>

          <div className="space-y-8 mt-6">
            {resumeData.education.map((edu, index) => (
              <div key={index}>
                <h3 className="font-semibold text-lg">{edu.college}</h3>

                <p className="text-blue-300">{edu.degree}</p>

                <p className="text-gray-300 text-sm">
                  {edu.startYear} - {edu.endYear}
                </p>

                <p className="text-gray-300">CGPA : {edu.cgpa}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="w-[68%] p-10">
        {/* SUMMARY */}

        <div>
          <h2 className="flex items-center gap-3 text-3xl font-bold">
            <FaCode className="text-blue-600" />
            PROFILE
          </h2>

          <p className="mt-5 leading-8 text-gray-700 text-justify">
            {resumeData.summary}
          </p>
        </div>
        {/* EXPERIENCE */}

       

        {/* PROJECTS */}

        <div className="mt-12">
          <h2 className="flex items-center gap-3 text-3xl font-bold">
            <FaCode className="text-blue-600" />
            PROJECTS
          </h2>

          <div className="space-y-8 mt-6">
            {resumeData.projects.map((project, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{project.title}</h3>

                  {project.githubLink && (
                    <a
                      href={
                        project.githubLink.startsWith("http")
                          ? project.githubLink
                          : `https://${project.githubLink}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>

                <p className="italic text-gray-500 mt-2">
                  {project.technologies}
                </p>

                <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-700">
                  {project.description
                    ?.split("\n")
                    .filter(Boolean)
                    .map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ACHIEVEMENTS */}

        <div className="mt-12">
          <h2 className="flex items-center gap-3 text-3xl font-bold">
            <FaTrophy className="text-yellow-500" />
            ACHIEVEMENTS
          </h2>

          <ul className="mt-6 space-y-4">
            {resumeData.achievements.map((achievement, index) => (
              <li key={index} className="bg-slate-100 rounded-lg p-4">
                {achievement.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ModernTemplate;
