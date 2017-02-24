var mongoose = require( 'mongoose' );

var historySchema=new mongoose.Schema({
	name:{type:String, required:true},
	description:{type:String, required:true},
	createdOn:{type:Date, "default": Date.now}
});
var recipeSchema=new mongoose.Schema({
	name:{type:String, required:true},
	description:{type:String, required:true},
	createdOn:{type:Date, "default": Date.now},
	imgSrc:String,  
	history:[historySchema]
})
var techSchema=new mongoose.Schema({
	name:{type:String,required:true},
	points:{type:Number,required:true}
})
var rec=mongoose.model('Recipe',recipeSchema);

var myWorks=[{name:'Recipe Book',
              description:'recipe book editor with some functionality. for more info, check out links below.',
              background:'url("/images/worksPreview/recipeBook1.png")',
              liveLink:'/works/recipeBook',
              githubLink:''},
              {name:'Weather App',
               description:'some info',
               background:'url("/images/worksPreview/temperature.png")',
               liveLink:'/works/weatherApp',
               githubLink:'https://github.com/slavon360/openWeatherMap'}];

module.exports.myWorks=myWorks;


var portfolio = new mongoose.Schema({
	name:{type:String, required:true},
	position:{type:String, required:true},
	photoUrl:String,
	tech:[techSchema]
})

mongoose.model('Portfolio', portfolio);
