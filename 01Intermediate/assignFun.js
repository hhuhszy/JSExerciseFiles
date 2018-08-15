//assign grade according to the percentage to the totalgrade
let getMyGrade = function (currentgrade,totalgrade) {
    let percentage = currentgrade / totalgrade * 100;

    let myGrade = '';

    if (percentage >= 90) {
        myGrade = 'A';
    } else if (percentage >= 80) {
        myGrade = 'B';
    } else if (percentage >= 70) {
        myGrade = 'C';
    } else if (percentage >= 60) {
        myGrade = 'D';
    } else {
        myGrade = 'F';
    }

    return console.log(`Your grade is ${myGrade}, the percentage is ${percentage}`);
    
}
getMyGrade(92,100);
getMyGrade(92,150);
getMyGrade(60,70);