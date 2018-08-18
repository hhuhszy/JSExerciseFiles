//get the btn of add and remove
let btnAdd = document.querySelector('#btnAdd');
let btnRemove = document.querySelector('#btnRemove');
//addeventlistener
btnAdd.addEventListener('click',addItem);
btnRemove.addEventListener('click',removeItem);
//Implementate the callback function
function addItem() {
    //get the input text node
    let inputText = document.querySelector('#inputTodo');
    //parse the input data
    if (inputText.value === '') {
        //error , create a tag p to prompt the user to input valid data
        if (!document.querySelector('#promptErr')) {
            p = document.createElement('p');
            p.textContent = 'Please input a todo!';
            p.id = 'promptErr';
            inputText.parentElement.insertBefore(p,btnAdd);
            //del the p 
            setTimeout(() => {
                p.parentElement.removeChild(p);
            }, 2000);
        }

    } else {
        //pass the validation then addItem
        //get the ul
        let ul = document.querySelector('#todoList');
        //create a li inputCheckbox label
        let li = document.createElement('li');
        let inputCheckbox = document.createElement('input');
        let label = document.createElement('label');
        //set attr
        setTimeout(() => {
            li.className = 'todoItem';
        }, 0);
        inputCheckbox.setAttribute('type','checkbox');
        inputCheckbox.setAttribute('id',`check${ul.children.length+1}`);
        label.setAttribute('for',inputCheckbox.id);
        label.textContent = inputText.value;
        //appendchild
        li.appendChild(inputCheckbox);
        li.appendChild(label);
        ul.insertBefore(li,ul.children[0]);
        //clear the input text
        inputText.value = '';
    }
}

function removeItem() {
    //get ul
    let ul = document.querySelector('#todoList');
    //map the checked todoItem
    const checkedItems = [];
    for (const item of ul.children) {
        if (item.querySelector(`input[type='checkbox']`).checked) {
            checkedItems.push(item);
        }
    }
    //removeItem
     checkedItems.forEach((e)=>ul.removeChild(e));
}