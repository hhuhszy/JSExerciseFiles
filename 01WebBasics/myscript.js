//query dom element
const myElementbytag = document.querySelector('p')
const myElementbytid = document.querySelector('#idone')
const myElementbyclass = document.querySelector('.classone')
console.log(`${myElementbytag.textContent},\n${myElementbytid.textContent},\n${myElementbyclass.textContent}`);

// alert('this is from javascript!')

//change dom element
document.querySelectorAll('p').forEach(value => value.textContent = 'changed by js')