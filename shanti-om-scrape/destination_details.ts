import TurndownService from 'turndown';
import { extractExpertDetails } from './expert_details';
import { extractSEOData } from './seo';
import { saveToCsv } from '../utils/save_to_csv';
import { loadCheerioDocument } from './cheerio';
import { extractProgramDetails } from './program_details';
import { CheerioAPI } from 'cheerio';
import { Destination } from '../interfaces/Destination';
import { json2csv } from 'json-2-csv';

// Extrait les informations d'une destination
export async function extractDestinationDetails($: CheerioAPI, url: string): Promise<Destination>
  {
    const destination_id: number = Date.now() + Math.floor(Math.random() * 1000);
    const destination_name = $('div.container-fluid p.text').first().text().trim();
    const destination_slug = url.split("/").filter(Boolean).pop()!;

    // Matching pour cover
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
    let destination_description = turndownService.turndown($('div#pills-intro').html() || "") as string;
    destination_description = destination_description.replace("(//bos.shantitravel.com", "(https://bos.shantitravel.com")
    

    // extract and save the destination expert info
    const destination_expert_id = extractExpertDetails($, 'div.expert').expert_id

    // Extract and save the programs of the destination to a csv
    const destination_programs = await Promise.all(
        $('div.item-trek-list').map(async function() {
            const program_url = $(this).find('a').attr('href') || ''
            const $p = await loadCheerioDocument(program_url)
            const program = extractProgramDetails($p, program_url)
            const savingProgram = {
                ...program,
                program_destination_id: destination_id,
                program_intro_expert: ""
            }
            return savingProgram
        }).get()
    )
    let csvString = json2csv(destination_programs)
    saveToCsv(csvString, './data/programs.csv')

    // save the destination info
    const destination = {
        destination_id,
        destination_name,
        destination_slug,
        destination_cover,
        destination_description,
        destination_expert_id: destination_expert_id,
        destination_seo: extractSEOData($)
    }
    csvString = json2csv([destination])
    saveToCsv(csvString, './data/destinations.csv')
    return destination;
}