import { Guide } from "../interfaces/Guide"
import { saveToCsv } from "../utils/save_to_csv"
import { loadCheerioDocument } from "./cheerio"
import { json2csv } from 'json-2-csv';


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


/* const extractGuideInfo(guide_url: string, cover_url: string, destination_id: string) => {
    return {
        title: $('div.container-fluid p.title').first().text().trim(),
        body: "",
        cover: ,
        destination_id: destination_id
    }
} */

/* guides.forEach((guide) => {
    // documents = sendRequest(guide.guide_url)
    // guide_outputs: Guide[] = []
    // for document in documents:
        //link_document = https://
        //cover_document = https://
        //guide_outputs.push(extractGuideInfo(link_document, cover_document, guide.destination_id))

    // save guide
    //saveToCsv(guide_outputs, "./data/guides.csv")
}) */


async function extractGuideInfo(guide_url: string, cover_url: string, destination_id: number): Promise<Guide> {
    const $ = await loadCheerioDocument(guide_url)
    return {
        title: $('div.container-fluid p.title').first().text().trim(),
        body: "",
        cover: cover_url,
        destination_id: destination_id
    }
}

async function main() {
    const guide_outputs: Guide[] = await Promise.all(
        guides.map((guide) =>
            extractGuideInfo(guide.guide_url, guide.cover_url, guide.destination_id)
        )
    )
    saveToCsv(json2csv(guide_outputs), "./data/guides.csv")
    console.log(guide_outputs)
}

main()