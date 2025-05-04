import { existsSync, writeFileSync, appendFileSync } from 'fs';
import { json2csv } from 'json-2-csv';

export function saveToCsv(data: any, fileName: string) {
  if (existsSync(fileName)) {
    const csvData = json2csv(data, {
      prependHeader: false
    })
    appendFileSync(fileName, `\n${csvData}`)
  } else {
    const csvData = json2csv(data)
    writeFileSync(fileName, csvData);
  }
}