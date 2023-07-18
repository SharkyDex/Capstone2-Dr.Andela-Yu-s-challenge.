var tiles = ["red", "green", "yellow", "blue"];
var gamePattern = [];
var clickedPattern = [];
var level = 0;
var started = false;

function sequence (){
    clickedPattern.length = 0;
    level++;
    $("h1").text("Level "+level);
    var randomColor = tiles[Math.round(Math.random()*3)];
    gamePattern.push(randomColor);

    $("."+randomColor).fadeIn(100).fadeOut(200).fadeIn(100);
    

    var audio = new Audio ("sounds/"+randomColor+".mp3");
    audio.play();
}

$(".btn").on("click", function(event){
    var clickedColor = event.target.id;
    clickedPattern.push(clickedColor);
    var audio = new Audio ("sounds/"+clickedColor+".mp3");
    audio.play();
    $("."+clickedColor).fadeIn(100).fadeOut(200).fadeIn(100);
    checkAnswer();
});

$(document).on("keypress", function(){
    if (!started){
        $("h1").text("The Game has started");
        setTimeout(function(){
             
            sequence();  
            }, 2000);

    }
    started = true;
    
});

function checkAnswer(){
    if(clickedPattern.length === level){
        if(clickedPattern[level-1] === gamePattern[level-1]){
            success();
        }
        else{
            setTimeout(function(){failure();}, 500);
        }
}
}

function success(){
    setTimeout(function(){
            sequence();
    }, 1000)
}

function failure(){
    var audiowrong = new Audio ("./sounds/wrong.mp3");
    audiowrong.play();
    $("body").addClass("game-over");
    $("h1").text("Game over. Press any key to restart!");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },500);
    startover();
}

function startover(){
    gamePattern.length = 0;
    level = 0;
    started = false;
}
