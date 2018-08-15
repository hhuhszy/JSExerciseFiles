//use array.find(callback) and array.findindex(callback) to 
//find a specific object in [object] by title
//object array
let toDos = [
    {content:'Modify Revit',isDone:false,},
    {content:'Complete the code of C#',isDone:false},
    {content:'software patten',isDone:false},
]
//find method
let findTodoByFind = function (toDos,title) {
   return toDos.find(function (value,index) {
        return value.content.toLowerCase() == title.toLowerCase();
    })
}
//findindex method
let findTodoByFindIndex = function (toDos,title) {
    let index = toDos.findIndex(function (value,index) {
        return value.content.toLowerCase() == title.toLowerCase();
    });
    return toDos[index];
}
console.log(findTodoByFind(toDos,'complete the code of c#'));
console.log(findTodoByFindIndex(toDos,'modify revit'));

