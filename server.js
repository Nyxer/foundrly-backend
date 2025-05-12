
const express = require("express");
const dotenv = require("dotenv");
const refineIdea = require("./routes/refineIdea");
const generateCode = require("./routes/generateCode");

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/refine-idea", refineIdea);
app.use("/api/generate-code", generateCode);

app.get("/", (req, res) => {
  res.send("Foundrly backend is running.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Foundrly backend running on port ${PORT}`);
});
