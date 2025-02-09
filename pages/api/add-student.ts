import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

const filePath = path.join(process.cwd(), "public", "students.xlsx");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, id, odCount, username } = req.body;
  if (!name || !id || !odCount || !username) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Ensure the public folder exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let workbook;
    if (fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath);
      workbook = XLSX.read(fileBuffer, { type: "buffer" });
    } else {
      workbook = XLSX.utils.book_new();
    }

    let sheet = workbook.Sheets["Students"];
    let data = sheet ? XLSX.utils.sheet_to_json(sheet) : [];

    // Check if student ID already exists
    const studentExists = data.some((student: any) => student.id === id);
    if (studentExists) {
      return res.status(409).json({ message: "Student ID already exists" });
    }

    // Add new student
    data.push({ name, id, odCount, username });
    const newSheet = XLSX.utils.json_to_sheet(data);
    workbook.Sheets["Students"] = newSheet;
    XLSX.writeFile(workbook, filePath);

    return res.status(200).json({ message: "Student added successfully!" });
  } catch (error) {
    console.error("Error writing file:", error);
    return res.status(500).json({ message: "Internal Server Error"});
  }
}
