export function extractSEOData($: cheerio.CheerioAPI): MetaData {

    const metaSocial: Record<string, string> = {};
    $('meta[property^="og:"], meta[name^="twitter:"]').each((_, el) => {
        const name = $(el).attr('property') || $(el).attr('name');
        const content = $(el).attr('content') || '';
        if (name) metaSocial[name] = content.trim();
    });

    const structuredData: any[] = [];

    $('script[type="application/ld+json"]').each((_, el) => {
        const jsonText = $(el).contents().text().trim();
        try {
            const parsed = JSON.parse(jsonText);
            structuredData.push(parsed);
        }
        catch (error) {
            // Ignorer les JSON mal formés
        }
    });

    return {
        "metaTitle" : $('meta[name="title"]').attr('content')?.trim() || "",
        "metaDescription" : $('meta[name="description"]').attr('content')?.trim() || "",
        "metaImage" : $('meta[name="image"]').attr('content')?.trim() || "",
        "metaSocial" : metaSocial,
        "metaRobots" : $('meta[name="ROBOTS"]').attr('content')?.trim() || "",
        "metaViewport" : $('meta[name="viewport"]').attr('content')?.trim() || "",
        "structuredData" : structuredData,
        "canonicalURL" : $('link[rel="canonical"]').attr('href')?.trim() || "",
    }
}