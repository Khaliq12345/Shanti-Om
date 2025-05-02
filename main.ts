import { loadCheerioDocument } from "./shanti-om-scrape/cheerio";
import { extractDestinationDetails } from "./shanti-om-scrape/destination_details";
import { extractExpertDetails } from "./shanti-om-scrape/expert_details";
import { extractProgramDetails } from "./personal/program_details_v1";

async function main() {
  const url = "https://www.shanti.om/voyage-bien-etre-bali/"
  const $ = await loadCheerioDocument(url)

  /* const anExpertDetails = extractExpertDetails($, 'div.expert')
  console.log(anExpertDetails) */

  /* const anProgramDetails = extractProgramDetails($, 'div.card a')
  console.log(anProgramDetails) */

  const anDestinationDetails = await extractDestinationDetails($, url)
  console.log(anDestinationDetails)
}

main()