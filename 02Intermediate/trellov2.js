let myMeeting = {
    meetingtodo:0,
    meetingdone:0,
    addmeeting:function (num=0) {
        this.meetingtodo += num
    },
    completemeeting:function (num=0) {
        this.meetingdone += num 
    },
    leftmeeting:function () {
        return console.log(this.meetingtodo - this.meetingdone);
        
    },
}
myMeeting.addmeeting(5);
myMeeting.addmeeting(7);
myMeeting.completemeeting(10);
myMeeting.leftmeeting();
console.log(myMeeting);
