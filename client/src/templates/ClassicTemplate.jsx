import { FaEnvelope, FaPhone, FaGithub, FaLinkedin } from "react-icons/fa";
function ClassicTemplate({ resumeData }) {
  return (
    <div className="bg-white max-w-5xl mx-auto p-12 shadow-xl min-h-screen">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-wide uppercase">
          {resumeData.personalInfo.fullName || "YOUR NAME"}
        </h1>

        <p className="mt-2 text-xl uppercase tracking-[6px] text-gray-600">
          SOFTWARE ENGINEER
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm">
          <a
            href={`mailto:${resumeData.personalInfo.email}`}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <FaEnvelope />
            <span>{resumeData.personalInfo.email}</span>
          </a>

          <a
            href={`tel:${resumeData.personalInfo.phone}`}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <FaPhone />
            <span>{resumeData.personalInfo.phone}</span>
          </a>

          <div className="flex items-center gap-2">
            <FaLinkedin />
            <a
              href={
                resumeData.personalInfo.linkedin.startsWith("http")
                  ? resumeData.personalInfo.linkedin
                  : `https://${resumeData.personalInfo.linkedin}`
              }
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <FaLinkedin />
              <span>LinkedIn</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <FaGithub />
            <a
              href={
                resumeData.personalInfo.github.startsWith("http")
                  ? resumeData.personalInfo.github
                  : `https://${resumeData.personalInfo.github}`
              }
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-gray-800 hover:text-black"
            >
              <FaGithub />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>

      <hr className="border-black mt-8" />

      <div className="mt-8">
        <h2 className="font-bold text-2xl uppercase border-b-2 border-black pb-2">
          Professional Summary
        </h2>

        <p className="mt-4 text-gray-700 leading-8 text-justify">
          {resumeData.summary}
        </p>
      </div>
      <div className="mt-8">
        <h2 className="font-bold text-2xl uppercase border-b-2 border-black pb-2">
          Skills
        </h2>

        <div className="flex flex-wrap gap-3 mt-5">
          {resumeData.skills.map((skill, index) => (
            <span
              key={index}
              className="border border-black px-4 py-2 rounded-full font-medium"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold uppercase border-b-2 border-black pb-2">
          Education
        </h2>

        <div className="mt-5 space-y-6">
          {resumeData.education.map((edu, index) => (
            <div key={index}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{edu.college}</h3>

                  <p className="italic text-gray-700">{edu.degree}</p>
                </div>

                <div className="text-right text-gray-600">
                  <p>
                    {edu.startYear} - {edu.endYear}
                  </p>

                  <p>CGPA : {edu.cgpa}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-10">
        <h2 className="text-2xl font-bold uppercase border-b-2 border-black pb-2">
          Projects
        </h2>

        <div className="mt-5 space-y-8">
          {resumeData.projects.map((project, index) => (
            <div key={index}>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{project.title}</h3>

                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-700 font-medium hover:underline"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>

              <p className="italic text-gray-600 mt-1">
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
      <div className="mt-10">
        <h2 className="text-2xl font-bold uppercase border-b-2 border-black pb-2">
          Achievements
        </h2>

        <ul className="mt-5 list-disc ml-7 space-y-3 text-gray-700 leading-7">
          {resumeData.achievements.map((achievement, index) => (
            <li key={index}>{achievement.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ClassicTemplate;
