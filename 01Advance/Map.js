//class Map kinda similar to IDictionary<> in .NET
//asume array && function => const
let tony = { name: 'Tony', gender: 'Male' }
let sam = { name: 'Sam', gender: 'Female' }
let horry = { name: 'Horry', gender: 'Unknown' }
let people = new Map();
people.set('tony', tony)
people.set('sam', sam)
people.set('horry', horry)
// console.log(people);
// console.log(people.keys());
// console.log(people.values());

const arr = [['a', '1'], ['b', '2'], ['c', '3']]
let arrmap = new Map(arr);
console.log(arrmap);
