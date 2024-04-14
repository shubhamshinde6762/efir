const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEN_AI);

exports.generateContent = async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = req.body.prompt || "";
    const result = await model.generateContent(prompt, { maxLength: 100 });
    const response = await result.response;
    const text = await response.text();
    res.json({ text });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Internal server error" }); 
  }
};
