import { loadCheerioDocument } from "./shanti-om-scrape/cheerio";
import { extractDestinationDetails } from "./shanti-om-scrape/destination_details";


const urls: string[] = [
  "https://www.shanti.om/voyage-bien-etre-bali/",
  "https://www.shanti.om/voyage-bien-etre-bhoutan",
  "https://www.shanti.om/voyage-bien-etre-cambodge",
  "https://www.shanti.om/voyage-bien-etre-inde",
  "https://www.shanti.om/voyage-bien-etre-japon",
  "https://www.shanti.om/voyage-bien-etre-laos",
  "https://www.shanti.om/destination-template.asp?PdtIdx=13579",
  "https://www.shanti.om/voyage-bien-etre-sri-lanka",
  "https://www.shanti.om/voyage-bien-etre/tibet",
  "https://www.shanti.om/voyage-bien-etre-france",
  "https://www.shanti.om/voyage-bien-etre-jordanie",
  "https://www.shanti.om/voyage-bien-etre-egypte",
  "https://www.shanti.om/voyage-bien-etre-japon",
  "https://www.shanti.om/voyage-bien-etre/maroc"
]

async function main() {
  // go through all the destinations and save the needed data
  urls.map(async (url) => {
    console.log(`Destination: ${url}`)
    const $ = await loadCheerioDocument(url)
    await extractDestinationDetails($, url)
  })
}

main()