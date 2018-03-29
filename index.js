$(function(){

	 //saveing dom variables
	var container = $('#container');
	var bird = $('#bird');
	var pole = $('.pole');
	var pole_1 = $('#pole_1');
	var pole_2 = $('#pole_2');
	var score = $('#score');
	var speed_span = $('#speed');
	var restart = $('#restart_btn');
	
	//initial set up for animation
	var container_width = parseInt(container.width());
	var container_height = parseInt(container.height());
	var pole_int_pos = parseInt(pole.css('right'));
	var pole_int_height = parseInt(pole.css('height'));
	var bird_left = parseInt(bird.css('left'));
	var bird_height = parseInt(bird.css('height'));
	var speed = 10;
	var upscore =0;
	//other diclarations
	var go_up = false;
	var game_over = false;
	
	//game control
	var the_game = setInterval(function(){
		if ( collision(pole_1,bird) || collision(pole_2, bird) || (parseInt(bird.css('top')) <= 0 )|| parseInt(bird.css('top')) > (container_height - bird_height)  ){
			stop_the_game();
		}
		else{
		
		var pole_current_position = parseInt(pole.css('right'));
		
		//to count the score
			if (pole_current_position > container_width-bird_left) {
				if (speed < 20){
					score.text(speed*10);
				} else{score.text(speed*20);}
				
			}
			
		// to keep poles inside the container
		if (pole_current_position > container_width){
			
			// generation of random height
			var new_height = parseInt(Math.random() * 100);
			
			//CHANGE THE POLE HEIGHT
			pole_1.css('height', pole_int_height+new_height);
			pole_2.css('height', pole_int_height-new_height);
			
			// increase the speed
			speed = speed + 1;
			//display speed
			speed_span.text(speed);
			
			//to move the poles
			pole_current_position = pole_int_pos;
			
 
		}
		
		//move pole
		pole.css('right',pole_current_position + speed);
		
		//move bird
		if (go_up === false){
			go_down();
		}
		}
		
	},40);
	
	$(document).on('keydown' , function(e){
		var key = e.keyCode;
		if (key === 32 && go_up === false && game_over === false){
			go_up = setInterval(up,50);  	
		}
	});

	$(document).on('keyup' , function(e){
		var key = e.keyCode;
		if (key === 32){
			clearInterval(go_up);
			go_up = false;	
		}
	});

	//to move bird down
	function go_down(){
	bird.css('top', parseInt(bird.css('top'))+5);
	}
     //to move bird up
	function up(){
	bird.css('top', parseInt(bird.css('top'))-10);
	}
	
	//stop the game
	function stop_the_game(){
		game_over=true;
		restart.slideDown();
		$(function(){
			$('body').css("background-color","black");
			$('#container').css("background-color","black");
			$('#scoreBox').css("background-color","white");
		});
	}
	// restart the game
	restart.click(function(){
		location.reload();
	});
	
	//collision conditions
	function collision($div1,$div2) {
		var x1 = $div1.offset().left;
		var y1 = $div1.offset().top;
		var h1 = $div1.outerHeight(true);
		var w1 = $div1.outerWidth(true);
		var b1 = y1 + h1 ;
		var r1 = x1 + w1 ;
		var x2 = $div2.offset().left;
		var y2 = $div2.offset().top;
		var h2 = $div2.outerHeight(true);
		var w2 = $div2.outerWidth(true);
		var b2 = y2 + h2 ;
		var r2 = x2 + w2   ;
	
		
		if (b1 < y2 ||y1 > b2 || r1 < x2 || r2 < x1) return false;
		return true;
	}
});


