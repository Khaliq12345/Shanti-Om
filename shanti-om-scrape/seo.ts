import { CheerioAPI } from "cheerio";
import { MetaData } from "../interfaces/SEO";


export function extractSEOData($: CheerioAPI): MetaData {
    // extract the seo from the metadata of the page
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

    let metaDescription = $('meta[name="description"]').attr('content')?.trim() || ""
    return {
        "metaTitle" : $('meta[name="title"]').attr('content')?.trim() || "",
        "metaDescription" : metaDescription,
        "metaImage" : $('meta[name="image"]').attr('content')?.trim() || "",
        "metaRobots" : $('meta[name="ROBOTS"]').attr('content')?.trim() || "",
        "metaViewport" : $('meta[name="viewport"]').attr('content')?.trim() || "",
        "canonicalURL" : $('link[rel="canonical"]').attr('href')?.trim() || "",
    }
}