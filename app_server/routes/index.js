var express = require('express');
var router = express.Router();
var homeCtrl = require('../controllers/homeCtrl');
var ctrlRecipes = require('../controllers/recipesCtrl');
/* GET home page. */
router.get('/',homeCtrl.startPage);
//get list of works
router.get('/works',homeCtrl.worksList);
//recipeBook links
router.get('/works/recipe', ctrlRecipes.recipesList);
router.get('/works/recipe/:recipeid/history',ctrlRecipes.historyList);
router.post('/works/recipe',ctrlRecipes.newRecipe);
router.get('/works/recipe/:recipeid/edit',ctrlRecipes.editRecipe);
router.post('/works/recipe/:recipeid/edit',ctrlRecipes.doEditRecipe);
router.delete('/works/recipe/:recipeid/history/:recipe_id',ctrlRecipes.deleteItem);
router.delete('/works/recipe/:recipeid/delete',ctrlRecipes.deleteRecipe);

module.exports = router;
