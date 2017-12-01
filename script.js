

userSeq = [];
	simonSeq = [];
	const NUM_OF_LEVELS = 20;
	var id ,color, level = 0;
	var boardSound = [
		'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', //green
		'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3', //red
		'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', //yellow
		'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3' //blue
	];
	
$(document).ready(function () {
	console.log(level);
	$('input[type="checkbox"]'). click(function(){
		if($(this). prop("checked") == true){
		startGame();
		}
		else {
			$("#startbtn").attr("disabled","disabled");
			$("#counter").text("- -");
			document.getElementById("strict_indicator").style.backgroundColor = "rgb(58, 20, 20)";
			$("#startbtn").on("click",function(){	
				$("#counter").text("- -");
			level = 0;
			simonSeq = [];
			userSeq= [];
			});
		}
	});
});

	//board seqence
	//add an click event listener to the start button
	function startGame(){
		$("#startbtn").on("click",function(){
			level++;
			simonSequence();
		});
	
		$("#strictbtn").on("click", function(){
			if ($("#strict_indicator").css("background-color") == "rgb(245, 18, 18)")
			{
				document.getElementById("strict_indicator").style.backgroundColor = "rgb(58, 20, 20)";
			}
			else {
				document.getElementById("strict_indicator").style.backgroundColor = "#f51212";
			}
			
		});
	
		//users click
		$(".seg").click(function (){
			id = $(this).attr("id");
			color = $(this).attr("class").split(' ')[1];
			userSeq.push(id);
			console.log(id+ " " +color);
			addClassSound(id, color);
			
			//check for user sequence
			if (!checkUserSequence()){
				displayError();
				userSeq = [];
			}
			//check length of seqence 
			if (userSeq.length == simonSeq.length && userSeq.length < NUM_OF_LEVELS)
			{
				level++;
				userSeq = [];
				simonSequence();
			}
		   
			//check for winner
			if (userSeq.length == NUM_OF_LEVELS)
			{
				$("#counter").text("WIN!");
			}
		});
	}
	

	function checkUserSequence(){
		for (var i = 0; i<userSeq.length; i++)
		{
			if (userSeq[i] != simonSeq[i])
			{
				return false;
			}
		}
		return true;
	}

	//display error
	function displayError(){
		console.log("Error");
		var count = 0;
		var myError = setInterval(function(){
			$("#counter").text("Error!");
			count++;
			if ($("#strict_indicator").css("background-color") == "rgb(245, 18, 18)")
			{
				level = 0;
				$("#counter").text(level);
				clearInterval(myError);
				userSeq= [];
				simonSeq=[];
				count = 0;
			}
			if (count === 20)
			{
				$("#counter").text(level);
				clearInterval(myError);
				userSeq= [];
				count = 0;
		
			}
		}, 500);
	}

	function checkStrictMode(){

	}

     //simon sequence
	function simonSequence(){
		console.log(level);
		//display the level in the counter
		$("#counter").text(level);
		//get random number btw 0-4
		getRandomNum();
		var i =0;
		//set an interval of 1s for each color to come on
		var myInterval = setInterval(function () {
			id = simonSeq[i];
			color = $("#"+id).attr("class").split(' ')[1];
			console.log(id + " " + color);
			addClassSound(id, color);
			i++;
			//stop the color when display timer = number of times the color blink 
			if (i == simonSeq.length){
			clearInterval(myInterval);
		}
		}, 1000);
		
		
	}
	
		//random function
	function getRandomNum(){
		var random = Math.floor(Math.random() * 4);
		simonSeq.push(random);
	}
	
	//add tempoary class and soundjay
	function addClassSound(id, color){
		$("#"+id).addClass(color+" active");
		playSound(id);
		setTimeout(function() {
			$("#"+id).removeClass(" active");		
		}, 500);
	}
	
	function playSound(id){
		var sound = new Audio(boardSound[id]);
		sound.play();
	}