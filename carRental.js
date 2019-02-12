(function cars(exports) {

  let CarRepo = function () {
    this.repo = [];
  }
  CarRepo.prototype.save = function (car) { this.repo.push(car); };
  CarRepo.prototype.find = function (fid) { return this.repo.filter(x => x.id === fid)[0]; };
  CarRepo.prototype.show = function () { console.log("\n**CARS**\n", this.repo); };
  CarRepo.prototype.getAll = function() {return this.repo;};

  let Car = function (make, model) {
    this.id = (Math.random() + "_").replace(".", "");
    this.make = make;
    this.model = model;
  }
  Car.prototype.describe = function () { console.log(this); };

  let Van = function (make, model, capacity) {
    Car.call(this, make, model);                       // connection 1 like super()
    this.capacity = capacity;
  }
  Van.prototype = Object.create(Car.prototype)  // connection 2 like extends
  Van.prototype.constructor = Van;                 // fix, broken by connection 2
  Van.prototype.attachTrailer = function () { console.log(this, " attaches trailer "); };

  let PassengerCar = function (make, model, fuelEff) {
    Car.call(this, make, model);
    this.fuelEff = fuelEff;
  }
  PassengerCar.prototype = Object.create(Car.prototype);
  PassengerCar.prototype.constructor = PassengerCar;
  PassengerCar.prototype.canTravelFar = function () { console.log(this, "can travel far"); return true; }

  let SportCar = function (make, model, horsePower) {
    Car.call(this, make, model);
    this.horsePower = horsePower;
  }

  SportCar.prototype = Object.create(Car.prototype);
  SportCar.prototype.constructor = SportCar;
  SportCar.prototype.driveFast = function () { console.log(this, "Drive very fast"); }

  exports.Van = Van;
  exports.PassengerCar = PassengerCar;
  exports.SportCar = SportCar;
  exports.CarRepo = CarRepo;

})(this.cars = {});

(function persons(exports){
  let Person = function(name, lastName){
    this.name = name;
    this.lastName = lastName;
    this.currentCarId = "NONE";
  }
  Person.prototype.describe = function(){ console.log(this); };
  Person.prototype.rent = function(carId){this.currentCarId = carId; }; 

  let PersonRepo = function(){
    this.repo = [];
  }
  PersonRepo.prototype.save = function(p){ this.repo.push(p); };
  PersonRepo.prototype.show = function(){ console.log("\n**PEOPLE**\n", this.repo); };
  PersonRepo.prototype.getAll = function(){return this.repo;};

  exports.Person = Person;
  exports.PersonRepo = PersonRepo;

})(this.persons = {});

let testCars = () => {
  let van = new cars.Van('Honda', 'Odyssey', 8);
  van.attachTrailer();
  let passenger = new cars.PassengerCar('Honda', 'Civic', 500);
  passenger.canTravelFar();
  let sportcar = new cars.SportCar("Ferrilari", "Gustal", 800);
  sportcar.describe();
  sportcar.driveFast();
  let carRepo = new cars.CarRepo();
  carRepo.save(van);
  carRepo.show();
  let foundCar = carRepo.find(van.id);
  console.log(foundCar);
}

let testRent = function(){
  let van = new cars.Van('Honda', 'Odyssey', 8);
  let user1 = new persons.Person("John", "Travolta");
  user1.rent(van.id);
  user1.describe();

}
testRent();
// testCars();

let testPersons = () => {
  let user1 = new persons.Person("John", "Travolta");
  user1.describe();
  let personRepo = new persons.PersonRepo();
  personRepo.save(user1);
  personRepo.show();
}

// testPersons();


let UI = function(cars, persons){
  
  let carRepo = new cars.CarRepo();
  let personRepo = new persons.PersonRepo();
  let van = new cars.Van('Honda', 'Odyssey', 8);
  let passenger = new cars.PassengerCar('Honda', 'Civic', 500);
  carRepo.save(van);
  carRepo.save(passenger);
   let user1 = new persons.Person("John", "Travolta");
   let user2 = new persons.Person("John 2", "Travolta 2");
   personRepo.save(user1);
   personRepo.save(user2);
  let menu = {
    mainOptions : [{c:1, d:"rent"}, {c:2, d:"return"}, {c:3, d:"manager cars"}, {c:4, d:"manage users"}, {c:5, d:"show all"}],
    carOptions : [{c:1, d:"register"}, {c:2, d:"remove"}],
    userOptions : [{c:1, d:"register"}, {c:2, d:"remove"}],  
  }

  function showMain(){
    printOptions(menu.mainOptions);
    let response = window.prompt("enter your selection");
    switch(response){
      case "1": processRent(); break;
      case "2": processReturn(); break;
      case "3": showCars(); break;
      case "4": showPersons(); break;
      case "5": showAll(); break;
      default: console.log("bye bye");
    }
  }

  function showAll(){
    carRepo.show();
    personRepo.show();
  }
  
  function processReturn(){
    let users = personRepo.getAll().filter(x=> x.currentCarId !=="NONE");
    let userMap = users.map( (x,i) => {  return {c:i+1, d : x.name +  x.lastName } });
    printOptions(userMap);
    let response = window.prompt("enter your selection");
    let personSelected = users[parseInt(response)-1];
    personSelected.currentCarId = "NONE";
    showMain();
  }




  function processRent(){
    let users = personRepo.getAll();
    let userMap = users.map( (x,i) => {  return {c:i+1, d : x.name +  x.lastName } });
    printOptions(userMap);
    let response = window.prompt("enter your selection");
    let personSelected = users[parseInt(response)-1];

    let cars = carRepo.getAll();
    let carMap = cars.map( (x,i) => {  return {c:i+1, d : x.make + x.model} });
    printOptions(carMap);
    let carResponse = window.prompt("enter your selection");
    let carSelected = cars[parseInt(carResponse)-1];
    console.log("carSelected", carSelected);

    personSelected.rent(carSelected.id);
    showMain();

  }

  function showCars(){
    printOptions(menu.carOptions);
    let response = window.prompt("enter your selection");

    switch(response){
        case "1": createCar(); break;
        case "2": removeCar(); break;
    }
    function createCar(){
      let types = ["VAN", "PASSENGER", "SPORT"];
      let type = window.prompt("car type: ", types);
      let make = window.prompt("make:");
      let model = window.prompt("model:");

      switch(type){
        case types[0]: {
          let capacity = window.prompt("capacity of "+ types[0]);
          carRepo.save(new cars.Van(make, model, parseInt(capacity)));
          } break;

        case types[1]: {
          let fuelEff = window.prompt("fuelEff of "+ types[1]);
          carRepo.save(new cars.PassengerCar(make, model, parseInt(fuelEff)));
        } break;

        case types[2]: {
          let horsePower = window.prompt("horse power:")
          carRepo.save(new cars.SportCar(make, model, parseInt(horsePower)));
        } break;
      }
    }
   function removeCar(){
     console.log("remove not supported");
   }
  
    showMain();
  }
  

  function showPersons(){
    printOptions(menu.userOptions);
    let response = window.prompt("enter your selection");

    switch(response){
        case "1": createUser(); break;
        case "2": removeUser(); break;
    }
    function createUser(){
      let name = window.prompt("Name :");
      let lastName = window.prompt("Last Name :");
      personRepo.save(new persons.Person(name, lastName));

    }
    function removeUser(){
      console.log("removed");
    }
    showMain();
  }

  function printOptions(options){
    console.log("\n*-----------------------------------*");
    for( opt of options){ console.log(opt.c + " - " + opt.d);}
    console.log("*--------Leave empty to exit----------*\n");
  }

  showMain();
}

UI(cars, persons);
