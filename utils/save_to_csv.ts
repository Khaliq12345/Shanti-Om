import { existsSync, writeFileSync, appendFileSync } from 'fs';

export function saveToCsv(data: any, fileName: string) {
  if (existsSync(fileName)) {
    appendFileSync(fileName, data)
  } else {
    writeFileSync(fileName, data);
  }
}