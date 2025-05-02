// Extrait les informations de la carte d'un programme sur une destination
export function extractProgramCardDetails($: cheerio.CheerioAPI, selector: string): {
    program_url: string;
    program_title: string;
    program_cover: string;
  } {
    const programSection = $(selector);

    const program_url = programSection.first().attr('href') || '';
    const program_title = programSection.find('div.card-body div.title span').first().text().trim();

    let program_cover = programSection.find('img.card-img').first().attr('src') || '';
    if (!program_cover.startsWith('http')) {
        program_cover = `https:${program_cover}`;
    }

    return {
        program_url,
        program_title,
        program_cover
    };
}