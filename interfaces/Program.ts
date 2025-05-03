import { MetaData } from '../interfaces/SEO';

export interface Program {
    program_id: number;
    program_title: string;
    program_slug: string;
    program_cover: string;
    program_description: string;
    program_seo: MetaData;
    program_price_includes: string;
    program_price_excludes: string;
    program_more_info: string;
    program_expert_id: number
}