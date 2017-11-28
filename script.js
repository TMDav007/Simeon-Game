userSeq = [];
simonSeq = [];
var id ,color, level = 0;
var boardSound = [
    'http://www.soundjay.com/button/sounds/button.4.mp3', //green
    'http://www.soundjay.com/button/sounds/button.09.mp3', //red
    'http://www.soundjay.com/button/sounds/button.10.mp3', //yellow
    'http://www.soundjay.com/button/sounds/button.7.mp3' //blue
];

$(document).ready(function () {
//variables

console.log(level);
$(".button-wrap").on("click", function(){
    $(this).toggleClass("button-active");
});
//board seqence
$("#startbtn").on("click",function(){
    level++;
    startSequence();
});
});

 //simon seq
function startSequence(){
    console.log(level);
    $("#counter").text(level);
    getRandomNum();
    var i =0;
    var myInterval = setInterval(function () {
        id = simonSeq[i];
        color = $("#seg"+id).attr("class").split(' ')[1];
        console.log(id + " " +color);
        addClassSound(id, color);
        i++;
        if (i == simonSeq.length){
        clearInterval(myInterval);
    }
    }, 1000);
    
    
}

function getRandomNum(){
    var random = Math.floor(Math.random() * 4);
    simonSeq.push(random);
}

//add tempoary class and soundjay
function addClassSound(id, color){
    $("#seg"+id).addClass(color+":active");
    //playSound();
    setTimeout(function() {
        $("#seg"+id).removeClass(color+":active");
        
    }, 500);
}

function playSound(id){
    
}