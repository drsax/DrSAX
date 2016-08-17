
var DAX = new AudioContext();
   
   

(function() {



    var root = this;
    var version = '1.0';
    var DrSAX;
    var osc = DAX.createOscillator();

    if(typeof exports !== 'undefined') {
        DrSAX= exports;
    } else {
        DrSAX = root.DrSAX = {};


    }




  DrSAX.get = function() {
        return version;
    }
    
  


}());



/*

var clerk = (function() {
    var name = 'Teo';
    var sex = '남자';
    var position = '수석 엔지니어';
    // salary private
    var salary = 2000;
    var taxSalary = 200;
    var totalBonus = 100;
    var taxBonus = 10;
 
    var payBonus = function() {
        totalBonus = totalBonus - taxBonus;
        return totalBonus;
    };
    var paySalary = function() {
        return salary - taxSalary;
    };
 
    // Public 속성, 메소드
    return {
        name : name,
        sex : sex,                 
        position : position,
        paySalary : paySalary,
        payBonus : payBonus
    };
}());
 
// name 속성은 public
console.log(clerk.name); // 'Teo' 출력
// salary 변수는 즉시실행함수 내부 변수이므로 private
console.log(clerk.salary); // undefined 출력
 
// paySalary 메소드는 public
console.log(clerk.paySalary()); // 1800 출력
 
// payBonus 메소드는 public
console.log(clerk.payBonus()); // 90 출력
console.log(clerk.payBonus()); // 80 출력



*/









