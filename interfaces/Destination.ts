import { MetaData } from '../interfaces/SEO';

export interface Destination {
    destination_id: number;
    destination_name: string;
    destination_slug: string;
    destination_cover: string;
    destination_description: any;
    destination_expert_id: number;
    destination_seo: MetaData;
}