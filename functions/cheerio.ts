import axios from "axios";
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';

/**
 * Charge le HTML d'une page à partir de son URL et renvoie un document Cheerio.
 * @param url - L'URL de la page à scraper.
 * @returns Un objet CheerioStatic pour manipuler le DOM.
 */
export async function loadCheerioDocument(url: string): Promise<cheerio.CheerioAPI> {
    try {
        //Faire une requête GET pour récupérer le HTML de la page
        const response = await axios.get(url)
        const html = response.data

        // Charger ce HTML dans Cheerio pour le manipuler
        return cheerio.load(html)
    }
    catch(error) {
        console.error(`Erreur lors du chargement de l'URL ${url}:`, error);
        throw error;
    }
    finally {}
}


// Extrait les informations d'un expert
export function extractExpertDetails($: cheerio.CheerioAPI, selector: string): {
    expert_name: string;
    expert_photo: string;
    expert_shortBio: string;
    expert_fullBio: any;
  }
  {
    const expertSection = $(selector);

    const expert_name = expertSection.find('span[class*="name"]').first().text().trim();
    const expert_photo = expertSection.find('img').first().attr('src') || '';
    const expert_shortBio = expertSection.find('span[class*="where"]').first().text().trim();

    // Convertir le HTML en Markdown
    const turndownService = new TurndownService();
    const expert_fullBio = turndownService.turndown(expertSection.html());

    return {
      expert_name,
      expert_photo,
      expert_shortBio,
      expert_fullBio,
    };
}


// Extrait les informations d'un program
export function extractProgramDetails($: cheerio.CheerioAPI, selector: string): {
    program_url: string;
    program_title: string;
    program_cover: string;
  } {
    const programSection = $(selector);

    const program_url = programSection.find('span[class*="name"]').first().text().trim();
    const program_title = programSection.find('img').first().attr('src') || '';
    const program_cover = programSection.find('span[class*="where"]').first().text().trim();

    return {
        program_url,
        program_title,
        program_cover
    };
}