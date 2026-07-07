const { generateSummary } = require("../services/geminiService");

const summaryGenerator = async (req, res) => {

    try {

        const { role } = req.body;

        if (!role) {
            return res.status(400).json({
                message: "Role is required",
            });
        }

        const summary = await generateSummary(role);

        res.status(200).json({
            summary,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

module.exports = {
    summaryGenerator,
};