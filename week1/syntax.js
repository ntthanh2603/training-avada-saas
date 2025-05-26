// Map
const myTechStack = ["NodeJs", "ReactJs"];
const myTechStatus = myTechStack.map((stack) => {
  return {
    name: stack,
    status: "true",
  };
});
console.log(myTechStatus);
// Result
// [
//   { name: 'NodeJs', status: 'true' },
//   { name: 'ReactJs', status: 'true' }
// ]

// Filter
const list = [11, 24, 31, 24, 11, 56, 34];
const onlyUnique = (value, index, self) => {
  return self.indexOf(value) >= 2 && value <= 40;
};
const filterList = list.filter(onlyUnique);
console.log(filterList);
// Result: [ 31, 34 ]

// Destructoring
const getMySelf = () => {
  const mySelf = {
    name: "Tuan Thanh",
    age: 21,
  };
  return mySelf;
};

const { name, age } = getMySelf();
console.log(`Name: ${name} - Age: ${age}`);
// Result: Name: Tuan Thanh - Age: 21

// Spread
const myTech = ["NodeJs", "ReactJs"];
const myTechNew = [...myTech, "NextJs"];
console.log(myTechNew);
// Result: [ 'NodeJs', 'ReactJs', 'NextJs' ]
