import TurndownService from 'turndown';
import { saveExpertToCsv } from '../utils/save_to_csv';


// Extrait les informations d'un expert
export function extractExpertDetails($: cheerio.CheerioAPI, selector: string): {
    expert_id: number;
    expert_name: string;
    expert_photo: string;
    expert_shortBio: string;
    expert_fullBio: any;
  }
  {
    const expertSection = $(selector);

    const expert_name = expertSection.find('span.name').first().text().trim();
    const expert_shortBio = expertSection.find('span.where').first().text().trim();

    let expert_photo = expertSection.find('img').first().attr('src') || '';
    if (!expert_photo.startsWith('http')) {
        expert_photo = `https:${expert_photo}`;
    }

    // Convertir le HTML en Markdown
    const turndownService = new TurndownService();
    const expert_fullBio = turndownService.turndown(expertSection.html());

    const expert_id: number = Date.now() + Math.floor(Math.random() * 1000);

    const expert = {
      expert_id,
      expert_name,
      expert_photo,
      expert_shortBio,
      expert_fullBio,
    };

    saveExpertToCsv(
      expert,
      `data/expert_${expert_name.toLowerCase()}_${expert_id}.csv`
    );
    return expert
}