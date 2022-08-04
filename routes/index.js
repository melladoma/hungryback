var express = require("express");
var router = express.Router();
var recipeModel = require("../models/recipes");
var userModel = require("../models/users");
var uniqid = require("uniqid");
var fs = require("fs");
var request = require("sync-request");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name: "cloud022",
	api_key: "252989959543114",
	api_secret: "yRgI4lzdRpXEzwUrzgzbn5dXN4s",
});

router.get("/", function (req, res, next) {
	res.send("respond with a resource");
});

//---- ROUTE AFFICHAGE HOMESCREEN - GET => voir en USEEFFECT d'INITIALISATION
//DONNEES d'ENTREE: token user
//TRAITEMENT : recherche BDD recipesAdded user
//DONNEES DE SORTIE:tableau de recettes du user [{title,ingredients,direction,persons,cookingTime,prepTime,tags,author,picture,comments,likeCount,privateStatus}]
// router.get('/get-myrecipes', function (req, res, next) {
// 	res.send('respond with a resource');
// });

//----- ROUTE AFFICHAGE FEED - GET USEEFFECT d'INITIALISATION
//DONNEES d'ENTREE: /
//TRAITEMENT : recherche BDD recettes publiques
//DONNEES DE SORTIE:tableau de recettes publiques [{title,ingredients,direction,persons,cookingTime,prepTime,tags,author,picture,comments,likeCount,privateStatus}]
router.get("/get-feed", function (req, res, next) {
	res.send("respond with a resource");
});

//ROUTE VALIDATION FICHE RECETTE -POST ONPRESS

//DONNEES d'ENTREE: objet validatedForm{title,ingredients,direction,persons,cookingTime,prepTime,tags,author,picture,privateStatus}
//TRAITEMENT : envoi en BDD
//DONNEES DE SORTIE: result true/false sur enregistrement BDD recette
router.post("/upload-image", async function (req, res, next) {
	var filePath = "./tmp/" + uniqid() + ".jpg";
	var resultCopy = await req.files.image.mv(filePath);
	if (!resultCopy) {
		var resultCloud = await cloudinary.uploader.upload(filePath);
		let resultObj = {
			imageUrl: resultCloud.url,
		};
		// console.log(resultObj)
		fs.unlinkSync(filePath);
		res.json({ result: true, message: "File uploaded!", resultObj });
	} else {
		res.json({ result: false, message: resultCopy });
	}
});

router.post("/validate-form", async function (req, res, next) {
	//filtre les ingredients vides
	let ingredients = req.body.recipe.ingredients.filter((x) => x.name !== "");

	//creation de la recette dans la BDD
	var newRecipe = new recipeModel({
		name: req.body.recipe.name,
		ingredients: ingredients,
		directions: req.body.recipe.directions,
		servings: req.body.recipe.servings,
		prepTime: req.body.recipe.prepTime,
		cookTime: req.body.recipe.cookTime,
		tags: req.body.recipe.tags,
		author: { username: req.body.userName, token: req.body.userToken },
		image: req.body.recipe.image,
		comments: [],
		likeCount: 1,
		privateStatus: req.body.recipe.privateStatus,
	});
	var recipeSaved = await newRecipe.save();

	//enregistrement de la recette dans les likes de l'auteur user en cle etrangere
	var author = await userModel.findOne({ token: req.body.userToken });
	author.addedRecipes.push(recipeSaved._id);
	authorSaved = await author.save();
	//C'est marrant que ça marche ça, je savais même pas qu'on pouvait l'écrire comme ça, j'aurais fait un updateOne avec $push...

	let result = false;
	if (recipeSaved && authorSaved) {
		result = true;
		res.json({ result, recipeSaved });
	} else {
		res.json({ result });
	}
});

router.get("/ajout-auto-recettes-bdd", async function (req, res, next) {
	const name = [
		"pain perdu",
		"nougat",
		"Raviolis",
		"Gaufres",
		"Nutella Maison",
		"Pizza",
		"Burger",
		"Quiche",
		"Molotof",
		"Poulet basquaise",
		"Steak-frite",
	];
	const ingredients = [
		{ name: "Lait", quantity: "20cl" },
		{ name: "Carottes", quantity: "1" },
		{ name: "Farine", quantity: "20g" },
	];
	const directions =
		"Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela ! Faire ceci puis cela !";
	const servings = 2;
	const prepTime = "20mn";
	const cookTime = "30mn";
	const tags = [
		"entrée",
		"plat",
		"dessert",
		"amuse-bouche",
		"boisson",
		"asiatique",
		"américain",
		"italien",
		"diététique",
		"végétarien",
		"rapide",
		"gastronomique",
		"recette de fête",
		"brunch",
	];
	const author = {
		username: "Test",
		token: "mgUDphTfzF-cbidoQw3oELP89TK9Jj0R",
	};
	const image = [
		"http://res.cloudinary.com/cloud022/image/upload/v1659521229/vbf6mpmtrgciynrjxldt.jpg",
		"http://res.cloudinary.com/cloud022/image/upload/v1659535480/erwazj8fekuu8jyxld25.jpg",
		"http://res.cloudinary.com/cloud022/image/upload/v1659541191/p8yg4da5nvs755ws779o.jpg",
		"https://res.cloudinary.com/cloud022/image/upload/v1659520138/default-placeholder_ddf2uy.png",
		"http://res.cloudinary.com/cloud022/image/upload/v1659543413/mrztdjsmkhdc8as30gfj.jpg",
		"http://res.cloudinary.com/cloud022/image/upload/v1659544251/eib4cwazsb8eocsmmqfk.jpg",
		"http://res.cloudinary.com/cloud022/image/upload/v1659544857/vvdxzw8axpdfiof1bkxp.jpg",
	];
	const privateStatus = [true, false];

	//creation des recettes dans la BDD

	for (let i = 0; i < name.length; i++) {
		let newRecipe = new recipeModel({
			name: name[Math.floor(Math.random() * 11)],
			ingredients: ingredients,
			directions: directions,
			servings: servings,
			prepTime: prepTime,
			cookTime: cookTime,
			tags: [tags[Math.floor(Math.random() * 14)]],
			author: author,
			image: image[Math.floor(Math.random() * 7)],
			comments: [],
			likeCount: 1,
			privateStatus: privateStatus[Math.floor(Math.random() * 2)],
		});
		let recipeSaved = await newRecipe.save();
	}

	res.json({});
});

module.exports = router;

//ROUTE SHOPP
