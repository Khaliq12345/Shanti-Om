// Get the slug from the url of page
export function extractSlug(element: string) {
    const base = 'https://www.shanti.om/' as string;
    if (!element.startsWith(base)) return '';
    const path = element.slice(base.length).replace(/^\/+/, '');
    return path.replace(/\//g, '-');
}