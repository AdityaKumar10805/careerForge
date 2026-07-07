const Resume = require("../models/Resume");

const createResume = async (req, res) => {
    const {
        title,
        personalInfo,
        summary,
        education,
        skills,
        projects,
        
        achievements,
        template,
    } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Resume title is required",
        });
    }

    const resume = await Resume.create({
        user: req.user.id,
        title,
        personalInfo,
        summary,
        education,
        skills,
        projects,
       
        achievements,
        template,
    });

    res.status(201).json({
        message: "Resume created successfully",
        resume,
    });
};


const getResume=async(req,res)=>{
  const resume= await Resume.find({ user: req.user.id })
  if(resume.length==0){
    return res.status(404).json({message:"sorry you have no active resume"})
  }
  return res.status(200).json({
    message:"successful",
    resume
  })
}
const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found",
            });
        }

        res.status(200).json({
            resume,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
const updateResume = async (req, res) => {
    const resume = await Resume.findOne({
        _id: req.params.id,
        user: req.user.id,
    });

    if (!resume) {
        return res.status(404).json({
            message: "Resume not found",
        });
    }

    const updatedResume = await Resume.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json({
        message: "Resume updated successfully",
        resume: updatedResume,
    });
};
const deleteResume = async (req, res) => {
    const resume = await Resume.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id,
    });

    if (!resume) {
        return res.status(404).json({
            message: "Resume not found",
        });
    }

    return res.status(200).json({
        message: "Resume deleted successfully",
    });
};


module.exports = {
    createResume,getResume,getResumeById,updateResume,

    deleteResume
};