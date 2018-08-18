//test
// alert('connected!')
//1.verify the input of <input> and check the input to
//determine whether change the content of specific <p> by class
function myValidation() {
    //get the dom element
    let dom = document.getElementById('myformId');
    let value = dom.value;
    if (isNaN(value) || value < 1 || value  > 20) {
        console.log(`The input:${value} is invalid!`)
    } else {
        console.log(`The input:${value} is OK!`)
        document.querySelector('.classone').textContent = 'changed by js'
    }
}
//2.track the input
document.getElementById('myformId').addEventListener("change",(ev)=>console.log(ev.target.value))