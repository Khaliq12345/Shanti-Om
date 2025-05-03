import { saveToCsv } from "../utils/save_to_csv"
import { Inspiration } from "../interfaces/Inspiration"
import { extractSlug } from "./program_details"


const inpiration_urls: string[] = [
    "https://www.shanti.om/connaissance-de-soi"
]

const inspirations: Inspiration[] = []
inpiration_urls.forEach((inspiration) => {
    //inpiration_html = sendRequests(inpiration)
    // extract all data
    inspirations.push({
        title: "string",
        cover: "string",
        introduction: "",
        program_slugs: [""]
    })
})

saveToCsv(inspirations, './data/inspirations.csv')