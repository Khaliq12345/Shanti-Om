import TurndownService from 'turndown';
import { saveToCsv } from '../utils/save_to_csv';
import { CheerioAPI } from 'cheerio';
import { Expert } from '../interfaces/Expert';
import { json2csv } from 'json-2-csv';


// Extrait les informations d'un expert
export function extractExpertDetails($: CheerioAPI, selector: string): Expert
  {

    // parse the expert details
    const expertSection = $(selector);
    const expert_name = expertSection.find('span.name').first().text().trim();
    const expert_shortBio = expertSection.find('span.where').first().text().trim();
    let expert_photo = expertSection.find('img').first().attr('src') || '';
    if (!expert_photo.startsWith('http')) {
        expert_photo = `https:${expert_photo}`;
    }

    // Convertir le HTML en Markdown
    const turndownService = new TurndownService();
    let expert_fullBio = turndownService.turndown(expertSection.html() || "") as string;
    expert_fullBio = expert_fullBio.replace("(//bos.shantitravel.com", "(https://bos.shantitravel.com")


    // Generate unique id for the expert
    const expert_id: number = Date.now() + Math.floor(Math.random() * 1000);

    // save the expert to a csv
    const expert = {
      expert_id,
      expert_name,
      expert_photo,
      expert_shortBio,
      expert_fullBio,
    };
    const csv = json2csv([expert])
    saveToCsv(
      csv,
      './data/experts.csv'
    );
    return expert
}