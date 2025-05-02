import TurndownService from 'turndown';
import { extractSEOData } from './seo';


// Extrait les informations d'un programme
export function extractProgramDetails($: cheerio.CheerioAPI, url: string): Program {
    const program_id: number = Date.now() + Math.floor(Math.random() * 1000);
    const program_title = $('div.container-fluid h1.text').first().text().trim();

    // Matching pour le slug
    const program_slug = extractSlug(url);

    // Matching pour cover
    const coverStyle = $('div.container-fluid div.row').attr('style') || '';
    const match = coverStyle.match(/url\(['"]?(\/\/[^'")]+)['"]?\)/);
    let program_cover = '';
    if (match && match[1]) {
        if (!match[1].startsWith('http')) {
            program_cover = `https:${match[1]}`;
        }
    }

    // Convertir la description en markdown
    const turndownService = new TurndownService();

    const program_description = turndownService.turndown($('div.container-fluid div.container').html());
    const program_price_includes = turndownService.turndown($('div#pills-included').html());
    const program_price_excludes = turndownService.turndown($('div#pills-excluded').html());
    const program_more_info = turndownService.turndown($('div#pills-more').html());

    const program = {
        program_id,
        program_title,
        program_slug,
        program_cover,
        program_description,
        program_seo: extractSEOData($),
        program_price_includes,
        program_price_excludes,
        program_more_info,
    };

    return program
}


function extractSlug(url: string) {
    const base = 'https://www.shanti.om/' as string;
    if (!url.startsWith(base)) return '';
    const path = url.slice(base.length).replace(/^\/+/, '');
    return path.replace(/\//g, '-');
}