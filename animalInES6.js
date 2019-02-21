class Animal{
  constructor(name){
    this.name = name;
  }
  poop(){
    console.log(this);
    console.log("animal can poop");
  }
}

class Whale extends Animal{
  constructor(name, inWater){
    super(name);
    this.inWater = inWater;
  }
  swim(){
    console.log("I can swim");
  }
}

let whale= new Animal("whe");

let poop = whale.poop;
poop();
whale.poop();