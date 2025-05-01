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