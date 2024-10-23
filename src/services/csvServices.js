import { parse } from 'json2csv';
import fs from 'fs';
import path from 'path';

export default class CSVService {
  

    // Method to generate CSV file from student data
    async generateCSV(students) {
        console.log("in side fun")
        const fields = ['id', 'name', 'email', 'college', 'batch', 'status', 'dsa_score', 'web_score', 'react_score']; 
        const opts = { fields };
        
        console.log("🚀 ~ CSVService ~ generateCSV ~ opts:", opts)
        try {
            // Convert the student data to CSV format
            const csv = parse(students, opts);
            console.log("🚀 ~ CSVService ~ generateCSV ~ csv:", csv)

            // Define the file path where the CSV will be saved
            const filePath = path.join(path.resolve(), 'src', 'downloads', 'students.csv');

            // Save the CSV to a file
            fs.writeFileSync(filePath, csv);
            console.log("CSV file generated successfully at:", filePath);

            // Return the file path for download
            return filePath;
        } catch (error) {
            console.error('Error generating CSV:', error);
            throw new Error('Error generating CSV: ' + error.message);
        }
    }
}


