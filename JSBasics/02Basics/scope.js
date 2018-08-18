// let iAmGlobal = 'globalValue';

// if (true) {
//     var iAmLocal = 'localValue';
//     console.log(iAmGlobal);
//     iAmGlobal = 'changedGlobalValue';
//     console.log('Change: ');
//     console.log(iAmGlobal);
//     console.log(iAmLocal);
// }
// console.log(iAmGlobal);
// console.log(iAmLocal);
let p0 = 'p0';
if (true) {
    // console.log(p0);
    let p0 = 'p1';
    console.log(p0);
}
console.log(p0);