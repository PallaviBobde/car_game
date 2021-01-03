let road = document.querySelector(".road");
let score_card = document.querySelector(".score_card");
let instructions = document.querySelector(".instructions");

let player = {speedy:0.1 ,speedx:0.05 , start:false, score:0};

instructions.addEventListener("click",()=>{
    start_game();
})

// console.log(road.getBoundingClientRect());

// ***********************                 game starts                      ***********************
let start_game = () => {
    player.start = true;
    instructions.classList.add("hide");
    getlines();
    enemycars();
    window.requestAnimationFrame(play_game);
    create_car();
    // play_game();
}


// ***********************                 create car                       ***********************
let create_car = () => {
    let car = document.createElement("div");
    car.setAttribute("class","car");
    road.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
}

// ***********************            play -- movements of car                    ***********************
let play_game = () => {
    let car = document.querySelector(".car");

    document.addEventListener("keydown",(e)=>{

        if(player.start){
        if(e.key == "ArrowUp" && player.y >150){
            player.y -= player.speedy;
        }
        if(e.key == "ArrowDown" && player.y < 488){
            player.y += player.speedy;
        }
        if(e.key == "ArrowLeft" && player.x >0){
            player.x -= player.speedx;
        }
        if(e.key == "ArrowRight" && player.x < 280){
            player.x += player.speedx;
        }
    }
    })
    document.addEventListener("keyup",(e)=>{
    })
    car.style.top = player.y + "px";
    car.style.left = player.x + "px";
    
    player.score++;
    score_card.innerText = `Score: ${player.score}`
    window.requestAnimationFrame(play_game);
}

// ***********************            lines start                    ***********************
let getlines = () =>{
    for(let i=0 ; i<5 ; i++){
        let line = document.createElement("div");
        line.setAttribute("class","line");
        let settop = (120*i)+10;
        line.style.top = settop+"px";
        road.appendChild(line);
    }
    window.requestAnimationFrame(movelines);
}

let movelines = () =>{
    for(let i=0 ; i<5 ; i++){
        let line = document.querySelectorAll(".line")[i];
        let top = line.offsetTop;
        if(top == 560){
            top = -30;
        }
        top += 5;
        line.style.top = top + "px";
    }
    window.requestAnimationFrame(movelines);
}

// ***********************            lines end                    ***********************

// ***********************              enemy cars start                    ***********************
 
let enemycars = () => {
    for(let i=0 ; i<3 ; i++){
        let enemy_car = document.createElement("div");
        enemy_car.setAttribute("class","enemy");
        let top = -(180*i);
        enemy_car.style.top = top + "px";
        // enemy_car.style.left = left + "px"; 
        enemy_car.style.backgroundImage = `url('enemy${i}.png')`;
        road.appendChild(enemy_car);
    }
    window.requestAnimationFrame(move_enemy);
}

let move_enemy = () =>{
    let car = document.querySelector(".car");
    for(let i=0 ; i<3 ; i++){
        let enemy = document.querySelectorAll(".enemy")[i];
        let top = enemy.offsetTop;
        let left = enemy.offsetLeft;
        if(top == 500){
            top = 0;
            left = Math.floor(Math.random()*300);
        // console.log(left);
        }
        top += 5;
        enemy.style.left = left + "px";
        enemy.style.top = top + "px";
        if(iscollide(car,enemy)){
            end_game();
            console.log("Ended");
        }
    }
    window.requestAnimationFrame(move_enemy);
}

// ***********************              enemy cars end                    ***********************

// ***********************              collision                    ***********************
let iscollide = (aa,bb) =>{
    let a = aa.getBoundingClientRect();
    let b = bb.getBoundingClientRect();
    return !((a.bottom < b.top) || (a.top > b.bottom) || (a.left > b.right) || (a.right < b.left));
}
//  ***********************              collision ended                    ***********************

//  ***********************              end_game                    ***********************
let end_game = () =>{
    player.start = false;
    road.innerHTML = "";
    instructions.classList.remove("hide");
    instructions.innerHTML = `Game Over <br> Your score is:${player.score} <br> Press to play again`
}