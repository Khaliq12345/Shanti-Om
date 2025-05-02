import TurndownService from 'turndown';
import { extractExpertDetails } from './expert_details';
import { extractSEOData } from './seo';
import { saveDestinationToCsv, saveProgramToCsv } from '../utils/save_to_csv';
import { loadCheerioDocument } from './cheerio';
import { extractProgramDetails } from './program_details';


// Extrait les informations d'une destination
export async function extractDestinationDetails($: cheerio.CheerioAPI, url: string): Promise<Destination>
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
    const destination_description = turndownService.turndown($('div#pills-intro').html());

    const destination_expert_id = extractExpertDetails($, 'div.expert').expert_id

    // Les programmes
    const destination_programs = await Promise.all(
        $('div.item-trek-list').map(async function() {
            const html = $(this).html()
            const program_url = $(this).find('a').attr('href') || ''
            const $p = await loadCheerioDocument(program_url)
            const program = extractProgramDetails($p, program_url)
            const savingProgram = {
                ...program,
                program_destination_id: destination_id,
                program_expert_id: destination_expert_id,
                program_intro_expert: ""
            }
            saveProgramToCsv(
                savingProgram,
                `data/program_${program.program_slug.toLowerCase()}_${program.program_id}.csv`
            );
            return savingProgram
        }).get()
    )

    const destination = {
        destination_id,
        destination_name,
        destination_slug,
        destination_cover,
        destination_description,
        destination_expert_id: destination_expert_id,
        destination_seo: extractSEOData($),
        destination_programs
    }

    saveDestinationToCsv(
        destination,
        `data/destination_${destination_name.toLowerCase()}_${destination_id}.csv`
    );
    return destination;
}