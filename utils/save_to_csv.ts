import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { Parser } from 'json2csv';
import { dirname } from 'path';

type Expert = {
  expert_id: number,
  expert_name: string,
  expert_photo: string,
  expert_shortBio: string,
  expert_fullBio: string,
};

type Destination = {
  destination_id: number;
  destination_name: string;
  destination_cover: string;
  destination_description: string;
  destination_expert_id: number;
};

function ensureDirectoryExists(filePath: string) {
  const directoryPath = dirname(filePath);
  if (!existsSync(directoryPath)) {
    mkdirSync(directoryPath, { recursive: true });
  }
}


export function saveExpertToCsv(data: Expert, fileName: string) {
  ensureDirectoryExists(fileName);
  const parser = new Parser<Expert>();
  const csv = parser.parse([data]);
  writeFileSync(fileName, csv);
}

export function saveDestinationToCsv(data: Destination, fileName: string) {
  ensureDirectoryExists(fileName);
  const parser = new Parser<Destination>();
  const csv = parser.parse([data]);
  writeFileSync(fileName, csv);
}
