import { Guide } from "../interfaces/Guide"
import { saveToCsv } from "../utils/save_to_csv"


const guides = [{
    destination_id: "1746261994090",
    guide_url: "https://www.shanti.om/fr/guide-voyage-indonesie/bali"
}]

const extractGuideInfo = (guide_url: string, cover_url: string, destination_id: string) => {
    // do the parsing
    return {
        title: "",
        body: "",
        cover: "",
        destination_id: destination_id
    }
}

guides.forEach((guide) => {
    // documents = sendRequest(guide.guide_url)
    // guide_outputs: Guide[] = []
    // for document in documents:
        //link_document = https://
        //cover_document = https://
        //guide_outputs.push(extractGuideInfo(link_document, cover_document, guide.destination_id))

    // save guide
    //saveToCsv(guide_outputs, "./data/guides.csv")
})