import { Guide } from "../interfaces/Guide"
import { Travel } from "../interfaces/Travel"
import { saveToCsv } from "../utils/save_to_csv"
import { loadCheerioDocument } from "./cheerio"
import { extractTravelDetails } from "./travel_details"


const guides: {destination_id: number, guide_url: string, cover_url: string}[] = [
    {
        destination_id: 1746261994090,
        guide_url: "https://www.shanti.om/fr/guide-voyage-indonesie/bali",
        cover_url: "https://bos.shantitravel.com/Datas/Medias/Org/voyage-bali-thumbnail.19185x5991A3.jpg"
    },
    {
        destination_id: 1746261994090,
        guide_url: "https://www.shanti.om/fr/guide-voyage-cambodge",
        cover_url: "https://bos.shantitravel.com/Datas/Medias/Org/voyage-cambodge-thumbnail.19189x651EFC.jpg"
    },
    {
        destination_id: 1746261994090,
        guide_url: "https://www.shanti.om/fr/guide-voyage-sri-lanka",
        cover_url: "https://bos.shantitravel.com/Datas/Medias/Org/voyage-sri-lanka-thumbnail.19233x4C2343.jpg"
    },
    {
        destination_id: 1746261994090,
        guide_url: "https://www.shanti.om/fr/guide-voyage-inde",
        cover_url: "https://bos.shantitravel.com/Datas/Medias/Org/voyage-inde-thumbnail.19202x676695.jpg"
    },
    {
        destination_id: 1746261994090,
        guide_url: "https://www.shanti.om/fr/guide-voyage-japon",
        cover_url: "https://bos.shantitravel.com/Datas/Medias/Org/voyage-japon-thumbnail.19204xAC01E6.jpg"
    },
    {
        destination_id: 1746261994090,
        guide_url: "https://www.shanti.om/fr/guide-voyage-nepal",
        cover_url: "https://bos.shantitravel.com/Datas/Medias/Org/voyage-nepal-thumbnail.19224xC5083A.jpg"
    },
    {
        destination_id: 1746261994090,
        guide_url: "https://www.shanti.om/fr/guide-voyage-yoga/yoga",
        cover_url: "https://bos.shantitravel.com/Datas/Medias/Org/pexels-quang-nguyen-vinh-222549-14025084.25451xD32F82.avif"
    },
]


async function extractGuideInfo(guide_url: string, destination_id): Promise<Travel[]> {
    const $g = await loadCheerioDocument(guide_url)
    const travels = await Promise.all(
        $g('div.guide-card').map(async function() {
            let travel_url = $g(this).find('a').attr('href') || ''
            if(!travel_url.startsWith('http')) {
                travel_url = `https://www.shanti.om/${travel_url}`
            }
            const $t = await loadCheerioDocument(travel_url)
            const travel = extractTravelDetails($t)
            let travel_pic = $g(this).find('a div.pic img').first().attr('src') || ''
            if (!travel_pic.startsWith('http')) {
                travel_pic = `https:${travel_pic}`;
            }
            return {
                ...travel,
                "cover": travel_pic,
                "destination_id": destination_id
            }
        }).get()
    )
    return travels
}

async function main() {
    const guide_outputs: Travel[] = (await Promise.all(
        guides.map((guide) => extractGuideInfo(guide.guide_url, guide.destination_id))
    )).flat()
    saveToCsv(guide_outputs, "./data/guides.csv")
    console.log(guide_outputs)
}

main()