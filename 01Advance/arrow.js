//use arrow function (lambda expression or block) to 
//filter the array of objects
const myTodos = [
    {title:'Eat',isDone:false},
    {title:'drink',isDone:false},
    {title:'household',isDone:true},
    {title:'transport',isDone:true},
    {title:'study',isDone:false},
    {title:'play',isDone:true},
]

const filterByisDone = (todos) => {
   let res = todos.filter((value,index) => value.isDone == true).map(
        (value,index) => {return value.title;}
    );
    return `Your done things are:\n${res}`; 
};
console.log(filterByisDone(myTodos));
