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

type Program = {
  program_id: number;
  program_title: string;
  program_slug: string;
  program_cover: string;
  program_description: string;
  program_seo: MetaData;
  program_price_includes: string;
  program_price_excludes: string;
  program_more_info: string;
  program_destination_id: number,
  program_expert_id: number,
  program_intro_expert: string
}

type Destination = {
  destination_id: number;
  destination_name: string;
  destination_slug: string;
  destination_cover: string;
  destination_description: any;
  destination_expert_id: number;
  destination_seo: MetaData;
  destination_programs: Program[]
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

export function saveProgramToCsv(data: Program, fileName: string) {
  ensureDirectoryExists(fileName);
  const parser = new Parser<Program>();
  const csv = parser.parse([data]);
  writeFileSync(fileName, csv);
}

export function saveDestinationToCsv(data: Destination, fileName: string) {
  ensureDirectoryExists(fileName);
  const parser = new Parser<Destination>();
  const csv = parser.parse([data]);
  writeFileSync(fileName, csv);
}
