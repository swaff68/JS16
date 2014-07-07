$(document).on('ready', function() {
  
});

var itemsArr = [];

var itemsArrDrinkPlate = [];

// var itemsArrOrderMenu = [];

var itemsArrResturant = [];

// var itemsArrCustomer = [];

var FoodItem = function(name, calories, vegan, glutenFree, citrusFree ) {


	this.name = name
	this.calories = calories
	this.vegan = vegan
	this.glutenFree = glutenFree
	this.citrusFree = citrusFree
	itemsArr.push(this);


	this.toString = function(){
		var outputString = "name is " + this.name + " has " + this.calories + " is vegan " ;
		

		if(this.vegan){
			outputString += "yes";
		}

		else {
			outputString += "no";
		}		

		outputString += " is gluten free ";

		if(this.glutenFree){
			outputString += "yes";
		}

		else {
			outputString += "no";
		}		

		outputString += " is citrus free ";

		if(this.citrusFree){
			outputString += "yes";
		}

		else {
			outputString += "no";
		}



		return outputString;

	}; 


};

var printMenu = function (arr){

	for (var i =0; i<arr.length; i++){
		console.log(arr[i].toString())

	}	


}

var Salad = new FoodItem("Chef Salad", 300, true, false, true )
var kidsSalad = new FoodItem("Bunny Food", 150, true, true, false)
var kidsDessert = new FoodItem("Clown Ice Cream", 600, false, false, false)

printMenu(itemsArr);



var DrinkPlate = function (name, description, price, ingrediants){

	this.name = name;
	this.description = description;
	this.price = price;
	this.ingrediants = ingrediants;
	itemsArrDrinkPlate.push(this);


	this.toStringPlate = function(){
		var outputString = this.name + " Description: " + this.description + ", Costs: $" + this.price + ", is comprised of the following ingrediants: " + this.ingrediants ;
		

		return outputString;

	}; 

	this.isVegan = function(){
		for (var i =0; i< this.ingrediants.length; i++) {
		console.log(this.ingrediants[i].toString());
		}

	};

};

var OrderMenu = function(plates){
	this.plates = plates;
	var outputString = '';

	this.toStringMenu = function(){
		for (var i=0; i<plates.length; i++){
			var plateObject = plates[i];
			outputString += '\n' + plateObject.toStringPlate();
		}
		
		return outputString;

	}; 

};

var Resturant = function(name, description, menu){
		this.name = name
		this.description = description
		this.menu = menu
		itemsArrResturant.push(this);


	this.toString = function(){
		var tempMenu = this.menu;
		var outputString = this.name + " Description: " + this.description + ", " + tempMenu.toStringMenu();
		return outputString;

	}; 
};

var Customer = function (dietaryPreference){
	this.dietaryPreference = dietaryPreference
	itemsArrCustomer.push(this);

	this.toString = function(){
		return this.dietaryPreference;
	}
};
var Beef = new FoodItem('beef', 100, false, true, true);
var Lettuce = new FoodItem('lettuce', 100, true, true, true);
var WheatCake = new FoodItem('WheatCake', 100, true, false, true);

var PrimeRib = new DrinkPlate("Prime Rib", "expensive meat", 21.00, [Beef, Lettuce, WheatCake]);
var SalmonHeads = new DrinkPlate("Salmon Heads", "tastes like chicken", 12, [Beef, Lettuce, WheatCake]);
var RugalaSalad = new DrinkPlate("Rugala Salad", "gots red stuff", 120, [Beef, Lettuce, WheatCake]);
var ArtichokeHearts = new DrinkPlate("Artichoke Hearts", "chokes ya", 1, [Beef, Lettuce, WheatCake]);

PrimeRib.isVegan();
// var meatMenu = new OrderMenu( [ PrimeRib, SalmonHeads ]);
// meatMenu.toStringMenu();

var veggieMenu = new OrderMenu([RugalaSalad, ArtichokeHearts]);
// veggieMenu.toStringMenu();

var Wendys = new Resturant("Wendy's", "better than Booger King", veggieMenu);

console.log(Wendys.toString());


