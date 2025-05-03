import { saveToCsv } from "../utils/save_to_csv"
import { Inspiration } from "../interfaces/Inspiration"
import { loadCheerioDocument } from "./cheerio"
import { json2csv } from 'json-2-csv';
import TurndownService from 'turndown';
import { extractSlug } from "../utils/extract_slug";


const inpiration_urls: string[] = [
    "https://www.shanti.om/connaissance-de-soi",
    "https://www.shanti.om/cure-ayurvedique",
    "https://www.shanti.om/cure-ayurvedique",
    "https://www.shanti.om/meditation"
]

async function extractInspirationInfo(inspiration_url: string): Promise<Inspiration> {
    const $ = await loadCheerioDocument(inspiration_url)

    const title = $('div.container-fluid div.row p.text').first().text().trim();

    // Matching pour cover
    const coverStyle = $('div.container-fluid div.row').attr('style') || '';
    const match = coverStyle.match(/url\(['"]?(\/\/[^'")]+)['"]?\)/);
    let cover_url = '';
    if (match && match[1]) {
        if (!match[1].startsWith('http')) {
            cover_url = `https:${match[1]}`;
        }
    }

    const turndownService = new TurndownService();
    let introduction = turndownService.turndown($('div.container-fluid div.container').html() || "");

    const program_slugs: string[] = []
    $('div.container div.row').map((i, el) => {
        const title = $(el).find('div.card div.card-body span').text().trim() || ''
        program_slugs.push(extractSlug(title))
    })

    return {
        title: title,
        cover: cover_url,
        introduction: introduction,
        program_slugs: program_slugs,
    }
}


async function main() {
    const inspirations: Inspiration[] = await Promise.all(
        inpiration_urls.map((url) => extractInspirationInfo(url))
    )
    saveToCsv(json2csv(inspirations), "./data/inspirations.csv")
    console.log(inspirations)
}

main()