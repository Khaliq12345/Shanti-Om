import { writeFileSync } from 'fs';
import { Parser } from 'json2csv';

type Destination = {
  destination_name: string;
  destination_cover: string;
  destination_description: string;
  destination_expert_id: number;
};

export function saveToCsv(data: Destination, fileName: string) {
  const parser = new Parser<Destination>();
  const csv = parser.parse([data]);

  writeFileSync(fileName, csv);
}
