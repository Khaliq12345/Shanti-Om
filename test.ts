import { saveToCsv } from "./utils/save_to_csv"


const tester = {
    expert_id: 1746349059914,
    expert_name: 'AURÉLIE GUEANT & ANOUCK ROUSSELOT',
    expert_photo: 'https://bos.shantitravel.com/Datas/Medias/Org/Anouck   aurelie.25890x505065.jpg',
    expert_shortBio: 'Accompagnatrice Inde',
    expert_fullBio: '![ AURÉLIE GUEANT & ANOUCK ROUSSELOT](https://bos.shantitravel.com/Datas/Medias/Org/Anouck   aurelie.25890x505065.jpg)\n' +
      '\n' +
      'AURÉLIE GUEANT & ANOUCK ROUSSELOT Accompagnatrice Inde\n' +
      '\n' +
      '**Anouck,**\n' +
      '\n' +
      "Après avoir mené une vie parfaite, Anouck a commencé à douter de tout : de qui elle était, à quoi elle servait, quel était son but de vie… Malgré ce bonheur parfait sur le papier, elle n'était pas heureuse. C’est à ce moment qu'elle a connu une période de réveil spirituel. Elle a tout quitté pour se reconnecter à soi-même, elle a expérimenté, elle s'est trompé, elle a évolué… Et c’est entre autres **l’astrologie** qui a été son étoile guidante dans ce parcours, très remuant émotionnellement. Entre reconnexion à son intuition, à ses rêves et à son envie d'indépendance, elle décide, en 2022, de faire de sa passion son métier et elle lance le compte instagram astralement parlant, puis la société Céleste Coaching. Pleine de projets, elle est aujourd’hui **coach en développement personnel** certifiée, **astrologue, tarologue et formatrice.** Beaucoup de projets mais avec toujours le même fil conducteur, celui d’accompagner les femmes à se réaligner, à se remettre sur la route du bonheur et à retrouver leur puissance. Sa mission ? Les faire réfléchir, comprendre et accepter qui elles sont vraiment, en dehors des injonctions, et à les aider à prendre les meilleures décisions pour elles-mêmes.  \n" +
      '  \n' +
      '**Aurélie,**  \n' +
      '  \n' +
      "Il y a eu un avant et un après… Une vie toute rangée, routinière… Et puis des déclics à répétition, des souffrances…, du corps, de l’âme… Elle s'est éteinte à plusieurs reprises dans sa vie…, dans un boulot, dans une relation… A chaque fois le même constat : elle n'était plus à la bonne place. Elle sait à quel point on peut se sentir vide dans ces moments souffrants, mais elle sait aussi à quel point on peut se sentir vivante, quand on se reconnecte vraiment à qui on est et à ce qui nous fait vibrer ! D’où sa mission de vie aujourd’hui. Aurélie Guéant est Créatrice de **Luminao, Auteure et Coach au féminin.** Sa vocation est de guider les femmes en transition de vie à réveiller leur soleil intérieur et à passer des caps grâce à la créativité. Les faire prendre conscience de cette lumière qui les habite afin qu’elles puissent la faire rayonner pleinement et éclairer le monde qui les entoure. A travers des pratiques créatives telles que la **danse intuitive, la peinture intuitive, les guidances,** **son oracle des femmes solaires auto-édité, son podcast** ou les cercles de femmes, elle a le privilège d’accompagner les femmes dans leur chemin de libération et de réactivation de leur pouvoir. Elle est également l’auteure de l’agenda Girl power, une réalisation à succès de 2021, avec plus de 7000 exemplaires vendus. En Janvier 2024, elle est fière de sortir un nouveau livre sur le thème de la créativité. L’objectif? Aider les femmes à libérer leur créativité pour manifester leur singularité et mettre des paillettes dans leur vie ! Que chaque femme puisse incarner sa lumière avec confiance et audace !  \n" +
      '  \n' +
      'Leur rencontre,  \n' +
      '  \n' +
      "Anouck et Aurélie se sont découvertes à travers les réseaux, elles ont discutés et décidés de se rencontrer après avoir parlé de leurs activités respectives. Elles se trouvent tout de suite des points communs : une même énergie, une envie de monter des projets, une envie de se découvrir et d'évoluer par leur spiritualité, et surtout une vision partagée : **celle d'accompagner les femmes à retrouver leur puissance** ! Formées toutes les deux en **coaching et au féminin sacré**, elles mettent un point d'honneur à accueillir sans jugement et avec bienveillance les femmes pour les aider à évoluer et à s'accomplir. Elles décident aujourd’hui de s’associer pour créer un tout nouveau projet plein de sens, cette magnifique retraite spirituelle sur le thème de la (re)naissance à Bali. Pour vivre une vraie expérience transformation et de reconnexion à soi, aux autres et au monde. Car pour elles, personne ne se rencontre au hasard, jamais."
}


saveToCsv([tester, tester], './data/sample.csv')