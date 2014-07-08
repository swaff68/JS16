$(document).on('ready', function() {
  
});

var itemsArr = [];

var itemsArrDrinkPlate = [];

// var itemsArrOrderMenu = [];

var itemsArrResturant = [];

// var itemsArrCustomer = [];

var totalPlatesOrdered = [];
var totalPlatesPrice = 0;

var FoodItem = function(name, calories, vegan, glutenFree, citrusFree ) {


	this.name = name
	this.calories = calories
	this.vegan = vegan
	this.glutenFree = glutenFree
	this.citrusFree = citrusFree
	itemsArr.push(this);


	this.toString = function(){
		var outputString = this.name;
		

		// if(this.vegan){
		// 	outputString += "Yes  ";
		// }

		// else {
		// 	outputString += "No  ";
		// }		

		// outputString += " Gluten Free? ";

		// if(this.glutenFree){
		// 	outputString += "Yes  ";
		// }

		// else {
		// 	outputString += "No  ";
		// }		

		// outputString += " Citrus Free? ";

		// if(this.citrusFree){
		// 	outputString += "Yes  ";
		// }

		// else {
		// 	outputString += "No  ";
		// }



		return outputString;

	}; 

	this.createDOM = function(){
		 return $('<div class="food-item">').text(this.name);

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
		var outputString = this.name + " Description: " + this.description + " Price: $" + this.price + "  Ingrediants: " + this.ingrediants.toString() ;
		return outputString;
	}; 

	this.createDOM = function(){

		var calorieCount = 0;
		var glutenStatus = true;
		var veganStatus = true;
		var citrusStatus = true;

		for(var i=0; i < this.ingrediants.length; i++) {
			var tempIngrediants = this.ingrediants[i];
			calorieCount += tempIngrediants.calories;
			var gluten = tempIngrediants.glutenFree;
			var vegan = tempIngrediants.vegan;
			var citrus = tempIngrediants.citrusFree;

			if(gluten === false) {glutenStatus = false}
			if(vegan === false) {veganStatus = false}
			if(citrus === false) {citrusStatus = false}
		}
		this.calorieCount = calorieCount;
		var plateJqueryObject = $('<div class="drink-plate"><div class="item-name">' + this.name + '</div>' + '<div class="item-price">Price: $ ' + this.price + '</div>' + '<div>' + this.ingrediants.join(', ') + '</div><div>Calories: ' + calorieCount +  '</div></div>');
		
		// if(veganStatus) {
		// 	outputString = "Yes";
		// }
		// else {
		// 	outputString = "No";
		// }

		var glutenString = dietaryFixing(glutenStatus);
		var veganString = dietaryFixing(veganStatus);
		var citrusString = dietaryFixing(citrusStatus);
		plateJqueryObject.append('<div>Gluten Free: ' + glutenString + '</div>');
		plateJqueryObject.append('<div>Vegan: ' + veganString + '</div>');
		plateJqueryObject.append('<div>Citrus Free: ' + citrusString + '</div>');
		plateJqueryObject.append('<button class="order-button">Order</button>');
		return plateJqueryObject;

	};

	this.isVegan = function(){
		for (var i =0; i< this.ingrediants.length; i++) {
		console.log(this.ingrediants[i].toString());
		}

	};

};

var dietaryFixing = function(inBoolean) {
	var outputString = '';
	if(inBoolean) {
		outputString = "Yes";
	}
	else {
		outputString = "No";
	}
	return outputString;
};

var OrderMenu = function(plates){
	this.plates = plates;
	
	this.toStringMenu = function(){
		var outputString = '';
		for (var i=0; i<this.plates.length; i++){
			var plateObject = this.plates[i];
			outputString = outputString + '\n' + plateObject.toStringPlate();
		}
		
		return outputString;

	}; 

	this.createDOM = function() {
		var returnJqueryObject = $('<div class="menu">');

		for(var i=0; i < this.plates.length; i++){
			var tempJqueryObject = this.plates[i].createDOM();
			returnJqueryObject.append(tempJqueryObject);
		}
		return returnJqueryObject;
	};

};

var Resturant = function(name, description, menu){
		this.name = name
		this.description = description
		this.menu = menu
		itemsArrResturant.push(this);


	this.toString = function(){
		var outputString = this.name + " Description: " + this.description + ", " + this.menu.toStringMenu();
		return outputString;

	}; 

	this.createDOM = function(){
		 var returnJqueryObject = $('<div class="resturant">');
		 return returnJqueryObject.append(this.menu.createDOM());
	};
};

var Customer = function (dietaryPreference){
	this.dietaryPreference = dietaryPreference
	itemsArrCustomer.push(this);

	this.toString = function(){
		return this.dietaryPreference;
	}
};
var Beef = new FoodItem('Beef', 100, false, true, true);
var Lettuce = new FoodItem('Lettuce', 110, true, true, true);
var WheatCake = new FoodItem('WheatCake', 120, true, false, true);
var Tortillas = new FoodItem('Tortillas', 200, true, false, true);
var Guacamole = new FoodItem('Guacamole', 100, true, true, false);
var Alcohol = new FoodItem('Alcohol', 400, true, true, false);
var beans = new FoodItem('Beans', 75, true, false, true);
var chicken = new FoodItem('Chicken', 50, false, true, true);
var cheese = new FoodItem('Cheese', 125, false, true, true);
var rice = new FoodItem('Rice', 200, false, true, true);


// var PrimeRib = new DrinkPlate("Prime Rib", "expensive meat", 21.00, [Beef, Lettuce, WheatCake]);
// var SalmonHeads = new DrinkPlate("Salmon Heads", "tastes like chicken", 12, [Beef, Alcohol, WheatCake]);
// var RugalaSalad = new DrinkPlate("Rugala Salad", "gots red stuff", 120, [Beef, Lettuce, WheatCake]);
// var ArtichokeHearts = new DrinkPlate("Artichoke Hearts", "chokes ya", 1, [Beef, Lettuce, WheatCake]);
var crazyBurrito = new DrinkPlate("Crazy Burro Burrito", "Its a gas", 15, [Beef, Lettuce, Tortillas, chicken, cheese, beans, rice, Guacamole, Alcohol]);
var GuacamoleDip = new DrinkPlate("Guacamole Dip", "Green stuff", 3, [Lettuce, Guacamole]);
var Margarita = new DrinkPlate("Margarita", "Makes you feel good", 5, [Alcohol]);
var chickenTaco = new DrinkPlate("Chicken Taco", "Makes you feel good", 8, [Tortillas, chicken, cheese, Lettuce, Guacamole]);
var cheeseEnchilida = new DrinkPlate("Cheese Enchilida", "Makes you feel good", 8, [Tortillas, cheese, beans, rice]);
var chickenBurrito = new DrinkPlate("Chicken Burrito", "Makes you feel good", 12, [Tortillas, cheese, chicken, Lettuce, rice, beans]);
var beefTaco = new DrinkPlate("Beef Taco", "Makes you feel good", 9, [Tortillas, cheese, Beef, Guacamole]);
var beefBurrito = new DrinkPlate("Beef Burrito", "Makes you feel good", 12, [Tortillas, cheese, Beef, Lettuce, rice, beans]);
var cheeseBurrito = new DrinkPlate("Cheese Burrito", "Makes you feel good", 6, [Tortillas, cheese, Lettuce, rice, beans]);

// PrimeRib.isVegan();
// var meatMenu = new OrderMenu( [ PrimeRib, SalmonHeads ]);
// meatMenu.toStringMenu();

// var veggieMenu = new OrderMenu([RugalaSalad, ArtichokeHearts]);
// veggieMenu.toStringMenu();

var dinnerMenu = new OrderMenu([crazyBurrito, chickenBurrito, beefBurrito, cheeseBurrito, chickenTaco, beefTaco, cheeseEnchilida, GuacamoleDip, Margarita]);

var Miguels = new Resturant("Miguel's", "South of the Border Goodness", dinnerMenu)

// var Wendys = new Resturant("Wendy's", "better than Booger King", veggieMenu);

// console.log(Wendys.toString());

// console.log(Miguels.toString());

var headerObject = $('<div class="header"><h1>Miguel\'s Resturant</h1><h3>South of the Border Goodness</h3><button class="dietary-buttons">Vegan Meals</button><button class="dietary-buttons">Gluten Meals</button><button class="dietary-buttons">Citrus Free Meals</button></div>');

$('body').append(headerObject);

var submitObject = $('<div class="final-order"><p id="item-total-list">Total Items: ' + totalPlatesOrdered.join(', ') + '</p><p id="item-total-price">Total Price: $ ' + totalPlatesPrice + '</p><button type="submit">Submit Order</button></div>');

$('body').append(submitObject);
$('body').append(Miguels.createDOM());

$(document).on('click', '.order-button', function() {
	var numberPlates = prompt("Number to order: ");

	var pricePlate = $(this).siblings('.item-price').text();
	var namePlate = $(this).siblings('.item-name').text();

	var pricePlateValue = parseInt(pricePlate.slice(9));
	totalPlatesPrice += pricePlateValue * numberPlates;
	$('#item-total-price').text('Total Price: $ ' + totalPlatesPrice);

	for(var i=0; i < numberPlates; i++) {
		totalPlatesOrdered.push(namePlate);
	}

	$('#item-total-list').text('Total Items: ' + totalPlatesOrdered.join(', '));
	console.log('pricePlateValue: ' + pricePlateValue);


});



