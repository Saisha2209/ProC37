var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var hour1;
var response,response1,response2,response3
//create feed and lastFed variable here
var feed
var lastfed

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage('dog',sadDog);
  dog.scale=1

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  feedDog=createButton("Feed the dog")
  feedDog.position(700,95)
  feedDog.mousePressed(feedDogs)
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime=database.ref('FeedTime'); 
  fedTime.on("value",function(data){ 
    lastFed=data.val();
  })
   response= fetch("http://www.worldtimeapi.org/api/timezone/Asia/Kolkata")
  
  response1= response.json();
     response2=response1.datetime
     response3=response2.slice(11,13);
    hour1=response3;
    
  //write code to display text lastFed time here
  text("Last Fed: "+hour1,10,10)
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDogs(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
 food_val=foodObj.getFoodStock();
  if (food_val<=0){
    foodObj.updateFoodStock(food_val*0)
  }else {
    foodObj.updateFoodStock(food_val-1)
  }

 

  database.ref("/").update({
    food:foodObj.getFoodStock(),
  
    feedTime:hour(hour)
  })


}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}
async function hour(hour){
 var response= await fetch("http://www.worldtimeapi.org/api/timezone/Asia/Kolkata")
  
 var response1= await response.json();
  var   response2=response1.datetime
    hour=response2.slice(11,13);
  
}