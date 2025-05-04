import axios from "axios";
import * as cheerio from 'cheerio';
import iconv from 'iconv-lite';

/**
 * Charge le HTML d'une page à partir de son URL et renvoie un document Cheerio.
 * @param url - L'URL de la page à scraper.
 * @returns Un objet CheerioStatic pour manipuler le DOM.
 */
export async function loadCheerioDocument(url: string): Promise<cheerio.CheerioAPI> {
    try {
        //Faire une requête GET pour récupérer le HTML de la page
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: {
                'Accept-Charset': 'utf-8, iso-8859-1;q=0.8',
            },
        })
        // const html = response.data
        const html = iconv.decode(Buffer.from(response.data), 'iso-8859-1');

        // Charger ce HTML dans Cheerio pour le manipuler
        return cheerio.load(html)
    }
    catch(error) {
        console.error(`Erreur lors du chargement de l'URL ${url}:`, error);
        throw error;
    }
    finally {}
}
