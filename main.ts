import { loadCheerioDocument } from "./shanti-om-scrape/cheerio";
import { extractDestinationDetails } from "./shanti-om-scrape/destination_details";
import { extractExpertDetails } from "./shanti-om-scrape/expert_details";
import { extractProgramDetails } from "./shanti-om-scrape/program_details";

async function main() {
  const $ = await loadCheerioDocument("https://www.shanti.om/voyage-bien-etre-bali/")

  const anExpertDetails = extractExpertDetails($, 'div.expert')
  // console.log(anExpertDetails)

  const anProgramDetails = extractProgramDetails($, 'div.card a')
  // console.log(anProgramDetails)

  const anDestinationDetails = extractDestinationDetails($)
  // console.log(anDestinationDetails)
}

main()