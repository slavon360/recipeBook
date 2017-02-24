var express = require('express');
var router = express.Router();
var homeCtrl = require('../controllers/homeCtrl');
var apiRecipes = require('../controllers/recipesCtrl');

router.get('/',homeCtrl.startPage);

router.get('/works',homeCtrl.worksList);
//recipesBook app links

router.get('/works/recipes', apiRecipes.recipesList);
router.get('/works/recipes/:recipeid/history',apiRecipes.historyRecipe);
router.post('/works/newRecipe',apiRecipes.newRecipe);
router.get('/works/recipes/:recipeid/edit',apiRecipes.editRecipe);
router.post('/works/recipes/:recipeid/edit',apiRecipes.doEditRecipe);
router.delete('/works/recipes/:recipeid/history/:recipe_id',apiRecipes.deleteItem);
router.delete('/works/recipes/:recipeid/delete',apiRecipes.deleteRecipe);

router.get('/links/:filename',homeCtrl.getLinks);

module.exports=router;