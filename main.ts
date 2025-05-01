import { extractExpertDetails, extractProgramDetails, loadCheerioDocument } from "./functions/cheerio";

async function main() {
  const $ = await loadCheerioDocument("https://www.shanti.om/voyage-bien-etre-inde/")

  const anExpertDetails = extractExpertDetails($, 'div.expert')
  // console.log(anExpertDetails)

  const anProgramDetails = extractProgramDetails($, 'div.card a')
  // console.log(anProgramDetails)
}

main()