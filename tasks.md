Destinations -> 14
for each destination:
    name
    cover (image)
    expert_name
    expert_photo
    expert_shortBio 
    expert_fullBio (mardown)
    description
    <!-- for each programs:
        program_name
        program_cover -->


//first function
arg -> url
return -> document du cheerio

//second function
arg -> document cheerio du expert
return:
    expert_name
    expert_photo
    expert_shortBio
    expert_fullBio (mardown)

//third function
arg -> document cheerio du un program
return:
    program_url
    program_title
    program_cover

//site url
https://www.shanti.om/

//destination
name
cover (image)
Liaison expert (faux generer un id unique pour l'expert et tu l'ajoute ici)
description (Markdown)

Ajouter au Markdown
Sauvegarde dans un csv


//seo
{"metaTitle": "", "metaDescription": "", "metaImage": "", "metaSocial": "", "structuredData": "all", "metaRobots": "", "metaViewport": "", "canonicalURL": ""}

//work on the encoder - work on the csv stuff

//guides
the input should be:
{'destination_id': 11234556, 'link_to_guide': "https://"}

//inspiration
input should be:
{..., "program_slug": 'jj_kk'} // use the slug to get the program id from the program csv