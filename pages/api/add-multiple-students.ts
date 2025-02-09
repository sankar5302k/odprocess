import { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";
import * as path from "path";
import * as XLSX from "xlsx";

const filePath = path.join(process.cwd(), "public", "students.xlsx");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const students = req.body;
  if (!Array.isArray(students) || students.length === 0) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  try {
    let workbook;
    if (fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath);
      workbook = XLSX.read(fileBuffer, { type: "buffer" });
    } else {
      workbook = XLSX.utils.book_new();
    }

    let sheet = workbook.Sheets["Students"];
    let data = sheet ? XLSX.utils.sheet_to_json(sheet) : [];

    // Check for duplicate student IDs
    const existingIds = new Set(data.map((student: any) => student.id));
    const duplicateStudents = students.filter((student) =>
      existingIds.has(student.id)
    );

    if (duplicateStudents.length > 0) {
      return res.status(409).json({
        message: "Some student IDs already exist",
        duplicates: duplicateStudents.map((student) => student.id),
      });
    }

    // Add new students
    data = [...data, ...students];
    const newSheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, newSheet, "Students", true);

    XLSX.writeFile(workbook, filePath);
    return res.status(200).json({ message: "Students added successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}