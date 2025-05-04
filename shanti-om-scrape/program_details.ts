import TurndownService from 'turndown';
import { extractSEOData } from './seo';
import { CheerioAPI } from 'cheerio';
import { Program } from '../interfaces/Program';
import { Step } from '../interfaces/Step';
import { extractExpertDetails } from './expert_details';
import { saveToCsv } from '../utils/save_to_csv';

// Extrait les informations d'un programme
export function extractProgramDetails($: CheerioAPI, url: string): Program {
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

    // Convertir les description en markdown
    const turndownService = new TurndownService();
    let program_description = turndownService.turndown($('div.container-fluid div.container').html() || "");
    let program_price_includes = turndownService.turndown($('div#pills-included').html() || "");
    let program_price_excludes = turndownService.turndown($('div#pills-excluded').html() || "");
    let program_more_info = turndownService.turndown($('div#pills-more').html() || "");

    program_description = program_description.replace("(//bos.shantitravel.com", "(https://bos.shantitravel.com")
    program_price_includes = program_price_includes.replace("(//bos.shantitravel.com", "(https://bos.shantitravel.com")
    program_price_excludes = program_price_excludes.replace("(//bos.shantitravel.com", "(https://bos.shantitravel.com")
    program_more_info = program_more_info.replace("(//bos.shantitravel.com", "(https://bos.shantitravel.com")


    // Extract and save the steps to a csv
    const steps: Step[] = []
    $('div.program-days').map((i, el) => {
        const title = $(el).find('div.title:first').text().trim() || ''
        const subTitle = $(el).find('div.sub-title:first').text().trim() || ''
        const description = turndownService.turndown($(el).find('div.text').html()) || ''
        let stepPhoto = $(el).find('img.card-img').attr('src') || ''
        if (stepPhoto) {
            stepPhoto = `https:${stepPhoto}`
        }
        steps.push({
            programId: program_id,
            title: title,
            subTitle: subTitle,
            description: description,
            photo: stepPhoto
        })
    })
    saveToCsv(steps, './data/steps.csv')

    // Structure the program data
    const program_expert_id = extractExpertDetails($, 'div.expert').expert_id
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
        program_expert_id
    };

    return program
}


// Get the slug from the url of page
export function extractSlug(url: string) {
    const base = 'https://www.shanti.om/' as string;
    if (!url.startsWith(base)) return '';
    const path = url.slice(base.length).replace(/^\/+/, '');
    return path.replace(/\//g, '-');
}