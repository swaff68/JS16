$(document).on('ready', function() {
  
});

var itemsArr = [];

var itemsArrDrinkPlate = [];

var tempDietArray = [];

// var itemsArrOrderMenu = [];


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
		var plateJqueryObject = $('<div class="drink-plate"><div class="item-name"><strong>' + this.name + '</strong></div>' + '<div class="item-price">Price: $ ' + this.price + '</div>' + '<div>' + this.ingrediants.join(', ') + '</div><div>Calories: ' + calorieCount +  '</div></div>16');
		
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
		this.resturantList = [];
		this.resturantList.push(this);


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

var newArray = function(inArray) {
	
    var baseArray = [], numberOfValuesArray = [], prev;

    inArray.sort();
    for ( var i = 0; i < inArray.length; i++ ) {
        if ( inArray[i] !== prev ) {
            baseArray.push(inArray[i]);
            numberOfValuesArray.push(1);
        } else {
            numberOfValuesArray[numberOfValuesArray.length-1]++;
        }
        prev = inArray[i];
    }

	var outArray = [];

	for(var i=0; i < baseArray.length; i++) {
		var foodItem = baseArray[ i ];
		var foodItemNumber = numberOfValuesArray[ i ];

		if (foodItemNumber > 1) {
			var tempString = foodItemNumber + 'x ' + foodItem;
		}
		else {
			var tempString = foodItem;
		}
		outArray.push(tempString);
	}
	return outArray;
};

var searchArrayForObjectProperty = function(inArray, inProp, inId) {
	var outputArray = $.grep(inArray, function(el) { return el[ inProp ] === inId; });
	return outputArray;
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
var mainMenuCreate = function(inRestaurant) {
	$('body').empty();
	var headerObject = $('<div class="header"><h1>Miguel\'s Resturant</h1><h3>South of the Border Goodness</h3><button class="dietary-buttons vegan">Vegan Meals</button><button class="dietary-buttons gluten">Gluten Free Meals</button><button class="dietary-buttons citrus">Citrus Free Meals</button><button class="reset">Reset Menu Preferences</button></div>');

	$('body').append($('<div id="main">'));
	$('#main').append(headerObject);

	var submitObject = $('<div class="final-order"><p id="item-total-list">Total Items: ' + newArray(totalPlatesOrdered).join(', ') + '</p><p id="item-total-price">Total Price: $ ' + totalPlatesPrice + '</p><button class="order-submit" type="submit">Submit Order</button></div>');

	$('#main').append(submitObject);
	var tempDOMElement = inRestaurant.createDOM();
	$('#main').append(tempDOMElement);

};

var outputDietaryMenu = function(inProp, inValue) {

	tempDietArray.length = 0;
	for(var i=0; i<itemsArrDrinkPlate.length; i++) {
		var tempArray = itemsArrDrinkPlate[ i ].ingrediants;
		var tempFoodItems = searchArrayForObjectProperty(tempArray, inProp, inValue);
		console.log('')
		console.log('tempFoodItems: ' + tempFoodItems);
		if(tempFoodItems.length === tempArray.length) {
			tempDietArray.push(itemsArrDrinkPlate[ i ]);
			console.log('tempDietArray: ' + tempDietArray);
		}
	}
	var tempMenu = new OrderMenu(tempDietArray);
	var tempMiguels = new Resturant("Miguels", "South of the Border Goodeness", tempMenu);
	mainMenuCreate(tempMiguels);	
};

$(document).on('click', '.vegan', function() {
	outputDietaryMenu('vegan', true);
});

$(document).on('click', '.citrus', function() {
	outputDietaryMenu('citrusFree', true);
});

$(document).on('click', '.gluten', function() {
	outputDietaryMenu('glutenFree', true);
});

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

	var outArray = newArray(totalPlatesOrdered);
	$('#item-total-list').text('Total Items: ' + outArray.join(', '));
	console.log('pricePlateValue: ' + pricePlateValue);


});

$(document).on('click', '.reset', function() {
	mainMenuCreate(Miguels);
	alert('reset fired');

});

mainMenuCreate(Miguels);



