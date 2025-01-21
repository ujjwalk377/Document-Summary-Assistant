import express from "express";
import multer from "multer";
import cors from "cors";
import pdf from "pdf-parse";
import Tesseract from "tesseract.js";
import { generateSummary } from "./services/summaryService.js";
import { validateFileType, handleError } from "./middleware/errorHandler.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: "https://document-summary-assistant-ywll.vercel.app/",
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: validateFileType,
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "status ok" });
});
// Document analysis endpoint
app.post("/api/analyze", upload.single("document"), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("No file uploaded");
    }

    const summaryLength = req.body.summaryLength || "medium";
    let extractedText = "";

    // Extract text based on file type
    if (req.file.mimetype === "application/pdf") {
      const pdfData = await pdf(req.file.buffer);
      extractedText = pdfData.text;
    } else {
      // Process image using Tesseract
      const {
        data: { text },
      } = await Tesseract.recognize(req.file.buffer, "eng", {
        logger: (info) => console.log(info),
      });
      extractedText = text;
    }

    // Generate summary using Gemini API
    const summary = await generateSummary(extractedText, summaryLength);
    res.json(summary);
  } catch (error) {
    handleError(error, res);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
