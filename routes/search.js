var express = require("express");
var router = express.Router();

var recipeModel = require("../models/recipes");
var userModel = require("../models/users");

//---- ROUTE RECHERCHE PAR TAGS - GET onPress
//DONNEES d'ENTREE: tableau de chips/tags selected
//DONNEES DE SORTIE:tableau de recettes qui contiennent ces tags [{title,ingredients,direction,persons,cookingTime,prepTime,tags,author,picture,comments,likeCount,privateStatus}]
router.post("/search-tags", async function (req, res, next) {
	var recipes;
	if (JSON.parse(req.body.tags).length === 0) {
		recipes = await recipeModel.find();
	} else {
		/*version aggregate:
		 var aggregate = recipeModel.aggregate();
		aggregate.match({ "tags": { "$all": JSON.parse(req.body.tags) } }); 
		recipes = await aggregate.exec();*/

		//version qui trouve les recettes qui ont obligatoirement TOUS les elements du tableau:
		recipes = await recipeModel.find({ "tags": { "$all": JSON.parse(req.body.tags) } })
	}

	res.json({ recipes });
}); 


//---- ROUTE RECHERCHE TEXTUELLE - POST sur TouchableOpacity Magnify
//DONNEES d'ENTREE: req.body.searchItem (string)
//traitement : recherche BDD sur searchItem dans direction/ingredients/title
//DONNEES DE SORTIE:tableau de recettes qui contiennent le searchItem dans direction/ingredients/title [{title,ingredients,direction,persons,cookingTime,prepTime,tags,author,picture,comments,likeCount,privateStatus}]
router.get("/search-name", function (req, res, next) {
	
	res.json({ recipes });
});

module.exports = router;
