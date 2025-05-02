import TurndownService from 'turndown';


// Extrait les informations d'un programme
export function extractProgramDetails($: cheerio.CheerioAPI, url: string): {
    program_id: number;
    program_title: string;
    program_slug: string;
    program_cover: string;
  } {
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
    // const program_description = turndownService.turndown($('div#pills-intro').html());

    return {
        program_id,
        program_title,
        program_slug,
        program_cover
    };
}


function extractSlug(url) {
    const base = 'https://www.shanti.om/';
    if (!url.startsWith(base)) return '';
    const path = url.slice(base.length).replace(/^\/+/, '');
    return path.replace(/\//g, '-');
}