import TurndownService from 'turndown';
import { extractExpertDetails } from './expert_details';
import { saveToCsv } from '../utils/save_to_csv';


// Extrait les informations d'une destination
export function extractDestinationDetails($: cheerio.CheerioAPI): {
    destination_name: string;
    destination_cover: string;
    destination_description: any;
    destination_expert_id: number;
  }
  {
    const destination_name = $('div.container-fluid p.text').first().text().trim();

    // matching pour cover
    const coverStyle = $('div.container-fluid div.row').attr('style') || '';
    const match = coverStyle.match(/url\(['"]?(\/\/[^'")]+)['"]?\)/);
    let destination_cover = '';
    if (match && match[1]) {
        if (!match[1].startsWith('http')) {
            destination_cover = `https:${match[1]}`;
        }
    }

    // Convertir la description en markdown
    const turndownService = new TurndownService();
    const destination_description = turndownService.turndown($('div#pills-intro').html());

    const destination_expert_id = extractExpertDetails($, 'div.expert').expert_id

    const destination = {
        destination_name,
        destination_cover,
        destination_description,
        destination_expert_id
    }

    saveToCsv(destination, 'destination.csv');
    return destination;
}