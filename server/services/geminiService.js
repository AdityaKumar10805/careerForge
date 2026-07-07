const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
});

async function generateSummary(role) {

    const prompt = `
Generate a professional ATS-friendly resume summary.

Role: ${role}

Rules:
- 50-70 words.
- Professional tone.
- Do NOT use markdown.
- Return ONLY the summary.
`;

    const result = await model.generateContent(prompt);

    return result.response.text().trim();
}

module.exports = {
    generateSummary,
};