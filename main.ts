import { extractExpertDetails, loadCheerioDocument } from "./functions/cheerio";

async function main() {
  const $ = await loadCheerioDocument("https://www.shanti.om/voyage-bien-etre-bali/")

  const anyExpertDetails = extractExpertDetails($, 'div.expert')
  console.log(anyExpertDetails)
}

main()