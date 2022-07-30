var source1 = "./tests/images/ok/fiche-recette-gratin-de-ravioles-courge-mahealthytendency-.png"
var result1 = {
    "text": "Gratin de rauioles, courge & châtaignes\n\nby @ma_healthy_tendency\n\nPour 5 personnes :\n\n+5 plaques de ravioles\n\n+ 1KG de courge (avec la peau)\n\n+ 1 bocal de châtaines poêlées\n\n+ +/- 200g de champignons de Paris\n\n+ oignon\n\n+ 2 cas de crème d'amande cuisine (ou autre\ncrème)\n\n+ sel, poivre 5 baies, parmesan râpé\n\n@ma_heatthy_tendency\nInstructions :\nCommencer par retirer la peau de la courge et la couper en morceaux.\n\nLa cuire à la vapeur ou à l'eau (dans ce cas, bien retirer l'excédent d'eau en fin de cuisson)\njusqu'à ce qu'elle soit tendre (tester avec la pointe d'un couteau). Réserver.\n\nPasser les châtaignes poëlées au robot pour les hacher.\nEmincer l'oignon et les champignons:\nDans une sauteuse légèrement huilée, faire revenir l'oignon. Ajouter les champignons.\n\nQuand le tout a fondu, rajouter la courge. Mélanger avec une cuillère en bois et écraser\nlégèrement les morceaux de courge. Laisser revenir à feu moyen.\n\nCuire les ravioles 1min à l'eau bouillante. Egoutter. Les verser dans la sauteuse, mélanger.\nVerser les châtaignes hachées. Ajouter 2 cas de crème. Assaisonner : poivre, sel. Mélanger.\nDans un plat à gratin, verser le tout, bien étaler. Saupoudrer de parmesan râpé.\n\nEnfourner pendant une vingtaine de minutes à 180°C. Finir quelques minutes en mode grill\npour un joli \"gratinage”.\n\nDéguster avec une bonne salade verte\n"
}

var source2 = "./tests/images/ok/axoa2.png"
var result2 = {
    "text": "AxOa\n\npour 4 personnes\nTemps de préparation: 30min\nTemps de cuisson: 1h\n\nInarédient\ne 750gr d'épaule de veau\ne 2 oignons\ne 2 poivrons rouges\ne 5 piments verts doux\ne 2 gousses d'ail\ne huile\ne laurier\ne thym\ne piment d'espelette\n\nÉmincer l'oignon et l'ail. Couper les piments et les poivrons en petits dés.\n\nFaire revenir le tout dans l'huile à la poêle 10 min puis ajouter la viande coupée en petits\nmorceaux, les herbes, le sel et le pigment fort (je mets une cuillère à soupe ou même 1\ncuillère à soupe et demi).\n\nFaire sauter le tout puis mouiller avec 2 verres d'eau ou de bouillon.\n\nLaisser mijoter à couvert 45 ou 60 min.\n\nUne dizaine de minutes avant la fin, ôter le couvercle pour que le jus accumulé s'évapore un\npeu.\n\nAccompagner de pommes de terre bouillies ou de pâtes ou de riz.\n"
}

var source3 = "./tests/images/ochazuke_8.png"
var result3 = {
    "text": "Ochazuke, riz parfume au thé\n\nPour : 1 personne\nTemps de préparation :5min Temps de cuisson : Omin\nIngrédients :\n\n- 180g riz cuit\n\n- pousses d’épinard et de betterave\n\n- 1 cs de graines de sésame torréfiées\n\n- 35g de saumon cru coupé en dés\n\n- 1 cc de paillettes d'algue\n\n- 1 quart de pomme acidulée type granny smith\ncoupée en dés\n\n- 10g de thé sensha\n\n- 20cL de dashi (ou autre bouillon de qualité)\n\n- 1 cs sauce soja\n\nInstructions:\nDans un bol, disposer le riz et saupoudrer de tous les\ningrédients en terminant par les dés de saumon. Faire\nchauffer le bouillon avec le thé, dashi et sauce soja, couper\nle feu avant ébullition, et y faire infuser le sensha, puis\najouter la sauce soja et verser par dessus le riz.\n\n"
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
    var ingredients = arr.filter(x => x.match(regExIngredients)).map(x => x.substring(2))
    //isole les ingredients, supprime la puce et le premier espace

    var regExQuantities = /[0-9]+ bocal|[0-9]+ ca*s|[0-9]+ quart|[0-9]+ ca*c|[0-9]+ gousses|[0-9]+gr*|[0-9]+kg|[0-9]+cl|^[0-9]+/i
    var ingredientsSorted = []
    ingredients.map((item, i) => {
        let obj = {};

        obj.quantity = item.match(regExQuantities) ? item.match(regExQuantities) : ""
        itemCleaned = item.replace(regExQuantities, "")
        itemCleaned = itemCleaned.trim()
        var regExDe = /^de |^d'/
        if (itemCleaned.match(regExDe)) {
            itemCleaned = itemCleaned.substring(2)
            itemCleaned = itemCleaned.trim()
        }
        obj.name = itemCleaned
        ingredientsSorted.push(obj)
        return item
    })

    resultObj.ingredients = ingredientsSorted


    //temps
    var regExTimings = /^tem/i
    var timings = arr.filter(x => x.match(regExTimings))
    //isole les str qui commencent par "tem"
    if (timings.length > 0) {
        var regExCookTime = /cui/i
        var regExPrepTime = /pr/i
        var cookTime = timings.filter(x => x.match(regExCookTime))
        var prepTime = timings.filter(x => x.match(regExPrepTime))
        //isole parmi les strings qui commencet par 'tem' celle qui contient "cui" ou "pr"

        var regTime = /[0-9]+/
        var regMinutes = /min/
        if (cookTime.length > 0) {
            var cookTimeNum = parseInt(cookTime[0].match(regTime))
            if (!cookTime[0].match(regMinutes)) {
                cookTimeNum = cookTimeNum * 60
            }
            resultObj.cookingTime = cookTimeNum;
        } else {
            resultObj.cookingTime = "";
        }
        if (prepTime.length > 0) {
            var prepTimeNum = parseInt(prepTime[0].match(regTime))
            if (!prepTime[0].match(regMinutes)) {
                prepTimeNum = prepTimeNum * 60
            }
            resultObj.preparationTime = prepTimeNum;
        } else {
            resultObj.preparationTime = "";
        }

    } else {
        resultObj.preparationTime = "";
        resultObj.cookingTime = "";
    }

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

console.log(treatText(result1.text))
console.log(treatText(result3.text))
console.log(treatText(strTest2))

/*resultat resultObj sur Ochazuke
 {
  cookingTime: 5,
  direction: "Dans un bol, disposer le riz et saupoudrer de tous lesingrédients en terminant par les dés de saumon. Fairechauffer le bouillon avec le thé, dashi et sauce soja, couperle feu avant ébullition, et y faire infuser le sensha, puisajouter la sauce soja et verser par dessus le riz.",
  ingredients: [[object Object] {
  name: "riz cuit",
  quantity: ["180g"]
}, [object Object] {
  name: "pousses d’épinard et de betterave",
  quantity: ""
}, [object Object] {
  name: "graines de sésame torréfiées",
  quantity: ["1 cs"]
}, [object Object] {
  name: "saumon cru coupé en dés",
  quantity: ["35g"]
}, [object Object] {
  name: "paillettes d'algue",
  quantity: ["1 cc"]
}, [object Object] {
  name: "pomme acidulée type granny smith",
  quantity: ["1 quart"]
}, [object Object] {
  name: "thé sensha",
  quantity: ["10g"]
}, [object Object] {
  name: "dashi (ou autre bouillon de qualité)",
  quantity: ["20cL"]
}, [object Object] {
  name: "sauce soja",
  quantity: ["1 cs"]
}],
  numPax: 1,
  preparationTime: 5,
  title: "Ochazuke, riz parfume au thé"
}
*/


//=> fonctionme sur trois recettes ochazuke_9.png, axoa2.png modifiee et fiche recette gratin de courge


//A FAIRE
//Gerer les cas d'erreur: si champs vides=>OK sur cooking times vs recette courge
//dans recette demo OCR live (Axoa) puces a remplacer par tirets + ajouter "Instructions"
