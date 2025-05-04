import TurndownService from 'turndown';
import { CheerioAPI } from 'cheerio';

// Extrait les informations d'un voyage
export function extractTravelDetails($: CheerioAPI): {title: string, body: string} {
    const id: number = Date.now() + Math.floor(Math.random() * 1000);
    const title = $('div.container-fluid div.row p.title').first().text().trim();

    // Convertir le body en markdown
    const turndownService = new TurndownService();
    let body = turndownService.turndown($('div.container.text-justify').html() || "");
    body = body.replace("(//bos.shantitravel.com", "(https://bos.shantitravel.com")

    return {title, body};
}