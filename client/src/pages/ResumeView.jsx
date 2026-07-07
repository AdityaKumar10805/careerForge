import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import ResumePreview from "../components/ResumePreview";

function ResumeView() {
    const { id } = useParams();
    const [resume, setResume] = useState(null);

    useEffect(() => {
        const fetchResume = async () => {
            const response = await api.get(`/resume/${id}`);
            setResume(response.data.resume);
        };

        fetchResume();
    }, [id]);

    if (!resume) return <h2>Loading...</h2>;

    return <ResumePreview resumeData={resume} template={resume.template} />;
}

export default ResumeView;