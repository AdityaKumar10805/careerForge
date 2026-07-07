import React from "react";

function MinimalTemplate({ resumeData }) {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-14 py-16">
        {/* HEADER */}

        <div className="text-center">
          <h1 className="text-5xl font-light tracking-[3px] uppercase text-gray-900">
            {resumeData.personalInfo.fullName || "Your Name"}
          </h1>

          <p className="mt-4 text-gray-500 uppercase tracking-[8px] text-sm">
            Software Engineer
          </p>
        </div>

        {/* CONTACT */}

        <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
          <a
            href={`mailto:${resumeData.personalInfo.email}`}
            className="hover:text-black transition"
          >
            Email
          </a>

          <span>|</span>

          <a
            href={`tel:${resumeData.personalInfo.phone}`}
            className="hover:text-black transition"
          >
            Phone
          </a>

          <span>|</span>

          <a
            href={
              resumeData.personalInfo.linkedin.startsWith("http")
                ? resumeData.personalInfo.linkedin
                : `https://${resumeData.personalInfo.linkedin}`
            }
            target="_blank"
            rel="noreferrer"
            className="hover:text-black transition"
          >
            LinkedIn
          </a>

          <span>|</span>

          <a
            href={
              resumeData.personalInfo.github.startsWith("http")
                ? resumeData.personalInfo.github
                : `https://${resumeData.personalInfo.github}`
            }
            target="_blank"
            rel="noreferrer"
            className="hover:text-black transition"
          >
            GitHub
          </a>
        </div>

        <hr className="my-12 border-gray-300" />

        {/* SUMMARY */}

        <section>
          <h2 className="uppercase tracking-[5px] text-xs font-bold text-gray-500">
            Professional Summary
          </h2>

          <p className="mt-6 leading-8 text-gray-700 text-justify">
            {resumeData.summary}
          </p>
        </section>

        <hr className="my-12 border-gray-300" />
        {/* SKILLS */}

        <section>
          <h2 className="uppercase tracking-[5px] text-xs font-bold text-gray-500">
            Skills
          </h2>

          <div className="flex flex-wrap gap-3 mt-6">
            {resumeData.skills.map((skill, index) => (
              <span
                key={index}
                className="border border-gray-300 rounded-full px-4 py-2 text-sm hover:bg-black hover:text-white transition"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>

        <hr className="my-12 border-gray-300" />

        {/* EDUCATION */}

        <section>
          <h2 className="uppercase tracking-[5px] text-xs font-bold text-gray-500">
            Education
          </h2>

          <div className="mt-8 space-y-8">
            {resumeData.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{edu.college}</h3>

                    <p className="italic text-gray-600 mt-1">{edu.degree}</p>
                  </div>

                  <div className="text-right text-sm text-gray-500">
                    <p>
                      {edu.startYear} - {edu.endYear}
                    </p>

                    <p>CGPA : {edu.cgpa}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="my-12 border-gray-300" />

        {/* EXPERIENCE */}

      
        {/* PROJECTS */}

        <section>
          <h2 className="uppercase tracking-[5px] text-xs font-bold text-gray-500">
            Projects
          </h2>

          <div className="mt-8 space-y-10">
            {resumeData.projects.map((project, index) => (
              <div key={index}>
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
                      className="text-gray-500 hover:text-black transition"
                    >
                      View Project ↗
                    </a>
                  )}
                </div>

                {project.technologies && (
                  <p className="mt-2 text-sm uppercase tracking-[2px] text-gray-500">
                    {project.technologies}
                  </p>
                )}

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
        </section>

        <hr className="my-12 border-gray-300" />

        {/* ACHIEVEMENTS */}

        <section>
          <h2 className="uppercase tracking-[5px] text-xs font-bold text-gray-500">
            Achievements
          </h2>

          <ul className="mt-8 space-y-4 list-disc pl-6 text-gray-700">
            {resumeData.achievements.map((achievement, index) => (
              <li key={index} className="leading-8">
                {achievement.title}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default MinimalTemplate;
