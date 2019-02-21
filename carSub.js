function Car(name){
  this.name = name;
}
Car.prototype.run=function(){console.log("I can run")};

let SportCar= function (name, horsepower){
  Car.call(this, name);
  this.horsepower=horsepower;
}
SportCar.prototype= Object.create(Car.prototype);
SportCar.prototype.constructor=SportCar;
SportCar.prototype.driveFast=function(){console.log("giong fast")};


let LuxuryCar = function (name, horsepower, highprice){
  SportCar.call(this, name, horsepower);
  this.highprice = highprice;
}
LuxuryCar.prototype=Object.create(SportCar.prototype);
LuxuryCar.prototype.constructor=LuxuryCar;
LuxuryCar.prototype.sellHighPrice= function(){console.log("this is expensive");}

let a = new LuxuryCar("Lambogini","700","100billion");