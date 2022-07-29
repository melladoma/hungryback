var source1 = "./tests/images/ok/fiche-recette-gratin-de-ravioles-courge-mahealthytendency-.png"
var result1 = {
    "text": "Gratin de rauioles, courge & châtaignes\n\nby @ma_healthy_tendency\n\nPour 5 personnes :\n\n+5 plaques de ravioles\n\n+ 1KG de courge (avec la peau)\n\n+ 1 bocal de châtaines poêlées\n\n+ +/- 200g de champignons de Paris\n\n+ oignon\n\n+ 2 cas de crème d'amande cuisine (ou autre\ncrème)\n\n+ sel, poivre 5 baies, parmesan râpé\n\n@ma_heatthy_tendency\nInstructions :\nCommencer par retirer la peau de la courge et la couper en morceaux.\n\nLa cuire à la vapeur ou à l'eau (dans ce cas, bien retirer l'excédent d'eau en fin de cuisson)\njusqu'à ce qu'elle soit tendre (tester avec la pointe d'un couteau). Réserver.\n\nPasser les châtaignes poëlées au robot pour les hacher.\nEmincer l'oignon et les champignons:\nDans une sauteuse légèrement huilée, faire revenir l'oignon. Ajouter les champignons.\n\nQuand le tout a fondu, rajouter la courge. Mélanger avec une cuillère en bois et écraser\nlégèrement les morceaux de courge. Laisser revenir à feu moyen.\n\nCuire les ravioles 1min à l'eau bouillante. Egoutter. Les verser dans la sauteuse, mélanger.\nVerser les châtaignes hachées. Ajouter 2 cas de crème. Assaisonner : poivre, sel. Mélanger.\nDans un plat à gratin, verser le tout, bien étaler. Saupoudrer de parmesan râpé.\n\nEnfourner pendant une vingtaine de minutes à 180°C. Finir quelques minutes en mode grill\npour un joli \"gratinage”.\n\nDéguster avec une bonne salade verte\n"
}

var source4 = "./tests/images/ok/axoa2.png"
var result4 = {
    "text": "AxOa\n\npour 4 personnes\nTemps de préparation: 30min\nTemps de cuisson: 1h\n\nInarédient\ne 750gr d'épaule de veau\ne 2 oignons\ne 2 poivrons rouges\ne 5 piments verts doux\ne 2 gousses d'ail\ne huile\ne laurier\ne thym\ne piment d'espelette\n\nÉmincer l'oignon et l'ail. Couper les piments et les poivrons en petits dés.\n\nFaire revenir le tout dans l'huile à la poêle 10 min puis ajouter la viande coupée en petits\nmorceaux, les herbes, le sel et le pigment fort (je mets une cuillère à soupe ou même 1\ncuillère à soupe et demi).\n\nFaire sauter le tout puis mouiller avec 2 verres d'eau ou de bouillon.\n\nLaisser mijoter à couvert 45 ou 60 min.\n\nUne dizaine de minutes avant la fin, ôter le couvercle pour que le jus accumulé s'évapore un\npeu.\n\nAccompagner de pommes de terre bouillies ou de pâtes ou de riz.\n"
}


var strTest = "Gratin de rauioles, courge & châtaignes\n\nby @ma_healthy_tendency\n\n\nTemps de préparation: 30min\nTemps de cuisson: 1h\nPour 5 personnes :\n\n+5 plaques de ravioles\n\n+ 1KG de courge (avec la peau)\n\n+ 1 bocal de châtaines poêlées\n\n+ +/- 200g de champignons de Paris\n\n+ oignon\n\n+ 2 cas de crème d'amande cuisine (ou autre\ncrème)\n\n+ sel, poivre 5 baies, parmesan râpé\n\n@ma_heatthy_tendency\nInstructions :\nCommencer par retirer la peau de la courge et la couper en morceaux.\n\nLa cuire à la vapeur ou à l'eau (dans ce cas, bien retirer l'excédent d'eau en fin de cuisson)\njusqu'à ce qu'elle soit tendre (tester avec la pointe d'un couteau). Réserver.\n\nPasser les châtaignes poëlées au robot pour les hacher.\nEmincer l'oignon et les champignons:\nDans une sauteuse légèrement huilée, faire revenir l'oignon. Ajouter les champignons.\n\nQuand le tout a fondu, rajouter la courge. Mélanger avec une cuillère en bois et écraser\nlégèrement les morceaux de courge. Laisser revenir à feu moyen.\n\nCuire les ravioles 1min à l'eau bouillante. Egoutter. Les verser dans la sauteuse, mélanger.\nVerser les châtaignes hachées. Ajouter 2 cas de crème. Assaisonner : poivre, sel. Mélanger.\nDans un plat à gratin, verser le tout, bien étaler. Saupoudrer de parmesan râpé.\n\nEnfourner pendant une vingtaine de minutes à 180°C. Finir quelques minutes en mode grill\npour un joli \"gratinage”.\n\nDéguster avec une bonne salade verte\n"
var strTest2 = "AxOa\n\npour 4 personnes\nTemps de préparation: 30min\nTemps de cuisson: 1h\n\nInarédient\n- 750gr d'épaule de veau\n- 2 oignons\n- 2 poivrons rouges\n- 5 piments verts doux\n- 2 gousses d'ail\n- huile\n- laurier\n- thym\n- piment d'espelette\n\nInstructions:\nÉmincer l'oignon et l'ail. Couper les piments et les poivrons en petits dés.\n\nFaire revenir le tout dans l'huile à la poêle 10 min puis ajouter la viande coupée en petits\nmorceaux, les herbes, le sel et le pigment fort (je mets une cuillère à soupe ou même 1\ncuillère à soupe et demi).\n\nFaire sauter le tout puis mouiller avec 2 verres d'eau ou de bouillon.\n\nLaisser mijoter à couvert 45 ou 60 min.\n\nUne dizaine de minutes avant la fin, ôter le couvercle pour que le jus accumulé s'évapore un\npeu.\n\nAccompagner de pommes de terre bouillies ou de pâtes ou de riz.\n"
//strTest2 = axoa2.png + puces modifiees en tirets + "Instructions" ajoute



function treatText(str) {
    let resultObj = {}
    //pre treatment
    var arr = str.split('\n')
    arr = arr.filter(x => x !== "")
    //suppression des lignes vides creees par le split

    //title
    resultObj.title = arr[0]

    //ingredients
    var regExIngredients = /^[+-]/
    resultObj.ingredients = arr.filter(x => x.match(regExIngredients)).map(x => x.substring(1))
    //isole les ingredients, supprime la puce

    //temps
    var regExTimings = /^tem/i
    var timings = arr.filter(x => x.match(regExTimings))
    //isole les str qui commencent par "tem"
    var regExCookTime = /cui/i
    var regExPrepTime = /pr/i
    var cookTime = timings.filter(x => x.match(regExCookTime))
    var prepTime = timings.filter(x => x.match(regExPrepTime))
    //isole parmi les strings qui commencet par 'tem' celle qui contient "cui" ou "pr"

    var regTime = /[0-9]+/
    var regMinutes = /min/

    var cookTimeNum = parseInt(cookTime[0].match(regTime))
    if (!cookTime[0].match(regMinutes)) {
        cookTimeNum = cookTimeNum * 60
    }
    resultObj.cookingTime = cookTimeNum;
    var prepTimeNum = parseInt(prepTime[0].match(regTime))
    if (!prepTime[0].match(regMinutes)) {
        prepTimeNum = prepTimeNum * 60
    }
    resultObj.preparationTime = prepTimeNum;

    //nb personnes
    var regPax = /^Pour/i
    var regPaxNumber = /[0-9]+/
    let pax = parseInt(arr.filter(x => x.match(regPax))[0].match(regPaxNumber))
    resultObj.numPax = pax;

    //deroule
    //   let direction = arr.filter(x=>!x.match(regExIngredients)).filter(x=>!x.match(regExTimings)).slice(1)
    var regExInstructions = /^Ins/
    let directionBeginning = arr.findIndex(x => x.match(regExInstructions)) + 1
    resultObj.direction = arr.slice(directionBeginning).join("")

    return resultObj
}

console.log(treatText(strTest2))

/*resultat resultObj sur strTest2
{
  cookingTime: 60,
  direction: "Émincer l'oignon et l'ail. Couper les piments et les poivrons en petits dés.Faire revenir le tout dans l'huile à la poêle 10 min puis ajouter la viande coupée en petitsmorceaux, les herbes, le sel et le pigment fort (je mets une cuillère à soupe ou même 1cuillère à soupe et demi).Faire sauter le tout puis mouiller avec 2 verres d'eau ou de bouillon.Laisser mijoter à couvert 45 ou 60 min.Une dizaine de minutes avant la fin, ôter le couvercle pour que le jus accumulé s'évapore unpeu.Accompagner de pommes de terre bouillies ou de pâtes ou de riz.",
  ingredients: [" 750gr d'épaule de veau", " 2 oignons", " 2 poivrons rouges", " 5 piments verts doux", " 2 gousses d'ail", " huile", " laurier", " thym", " piment d'espelette"],
  numPax: 4,
  preparationTime: 30,
  title: "AxOa"
}
*/


//A FAIRE
//Gerer les cas d'erreur: si champs vides
//dans recette demo OCR live (Axoa) puces a remplacer par tirets + ajouter "Instructions"
