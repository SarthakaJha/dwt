import { parse as json2csv } from "json2csv";
import fs from "fs";
import path from "path";

const Convertor = (data, filename) => {
  // Define the fields and field names for the CSV file
  const fields = ["irradiance", "electricity", "date"];
  const fieldNames = ["Irradiance", "Electricity", "Date"];

  // Define the output directory and path for the CSV file
  const outDir = "./BACKEND/public/files";
  const outPath = path.join(outDir, filename);

  const csvData = json2csv(data, { fields, fieldNames });


  fs.writeFile(outPath, csvData, function (err) {
    if (err) {
      console.error("Error writing CSV file:", err);
    } else {
      console.log("CSV file generated successfully!");
    }
  });

  return outPath;
};

export default Convertor;
