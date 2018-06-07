var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

function Circle(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;

    this.draw = (outline, fill) => {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
        c.strokeStyle = outline;
        c.stroke();
        c.fillStyle = fill;
        c.fill();
    }   
}

var key;

var redinflight = false;
var blueinflight = false;

var bluescore = 0;
var redscore = 0;

var g = 1;

var gameover = false;

setworld();

window.addEventListener("keydown", (event) => {
    key = event.key;

    if(key == "a") {
        if(bluepos > 0) {
            c.clearRect(0, 0, window.innerWidth, window.innerHeight);
            setworld();
            setblue(bluepos - 2);
            bluepos = bluepos - 2;
            setred(redpos);
        }
    }

    if((key == "d") && (bluepos + 25 < window.innerWidth/2 - 125)) {
        c.clearRect(0, 0, window.innerWidth, window.innerHeight);
        setworld();
        setblue(bluepos + 2);
        bluepos = bluepos + 2;
        setred(redpos);
    }

    if((key == "ArrowLeft") && (redpos > window.innerWidth/2 + 125)) {
        c.clearRect(0, 0, window.innerWidth, window.innerHeight);
        setworld();
        setred(redpos - 2);
        redpos = redpos - 2;
        setblue(bluepos);
    }

    if((key == "ArrowRight") && (redpos + 25 < window.innerWidth)) {
        c.clearRect(0, 0, window.innerWidth, window.innerHeight);
        setworld();
        setred(redpos + 2);
        redpos = redpos + 2;
        setblue(bluepos);
    }

    if(key == "w") {       
        var b_x = bluepos + 12.5, b_y = window.innerHeight/2 - 25, b_dx = 15, b_dy = -20;
        
        function blueanimate() {
            blueinflight = true;
            if(redinflight == false) requestAnimationFrame(blueanimate);
            c.clearRect(0, 0, window.innerWidth, window.innerHeight);
            setworld();
            setblue(bluepos);
            setred(redpos);

            if(b_y < window.innerHeight/2 - peak(window.innerHeight/4, window.innerWidth/2, 50, b_x)) {
                var bluecircle = new Circle(b_x, b_y, 6);
                bluecircle.draw("blue", "blue");
            }
            else {
                blueinflight = false;
                cancelAnimationFrame(blueanimate);

                if(bluescore == 3) {
                    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
                    setworld();
                    gameover = true;
                    c.font = "32pt Arial";
                    c.strokeStyle = "blue";
                    c.fillStyle = "blue";
                    c.strokeText("Blue wins!", window.innerWidth/2 - 125, window.innerHeight/2);
                    c.fillText("Blue wins!", window.innerWidth/2 - 125, window.innerHeight/2);
                    cancelAnimationFrame(blueanimate);
                    return;
                }
                return;
            }

            b_x += b_dx;

            b_y += b_dy;
            b_dy += g;

            if((b_x > redpos) && (b_x < redpos + 25) && (b_y > window.innerHeight/2 - 25) && (b_y < window.innerHeight/2)) {
                bluescore += 1;
                displaybluescore(bluescore);
            }
        }
        if(redinflight == false) {
            blueanimate();
        } 
    }

    if(key == "ArrowUp") {
        var r_x = redpos + 12.5, r_y = window.innerHeight/2 - 25, r_dx = -15, r_dy = -20;

        function redanimate() {
            redinflight = true;
            if((blueinflight == false) && (redinflight == true)) requestAnimationFrame(redanimate);
            c.clearRect(0, 0, window.innerWidth, window.innerHeight);
            setworld();
            setblue(bluepos);
            setred(redpos);

            if(r_y < window.innerHeight/2 - peak(window.innerHeight/4, window.innerWidth/2, 50, r_x)) {
                var redcircle = new Circle(r_x, r_y, 6);
                redcircle.draw("red", "red");
            }
            else {
                redinflight = false;
                cancelAnimationFrame(redanimate);

                if(redscore == 3) {
                    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
                    setworld();
                    gameover = true;
                    c.font = "32pt Arial";
                    c.strokeStyle = "red";
                    c.fillStyle = "red";
                    c.strokeText("Red wins!", window.innerWidth/2 -125, window.innerHeight/2);
                    c.fillText("Red wins!", window.innerWidth/2 - 125, window.innerHeight/2);
                    cancelAnimationFrame(redanimate);
                    return;
                }
                return;
            }

            r_x += r_dx;

            r_y += r_dy;
            r_dy += g;

            if((r_x > bluepos) && (r_x < bluepos + 25) && (r_y > window.innerHeight/2 - 25) && (r_y < window.innerHeight/2)) {
                redscore += 1;
                displayredscore(redscore);
            }
        }
        
        if(blueinflight == false) {
            redanimate();
        }
    }
});

function setworld() {
    c.fillStyle = "#00ffff";
    c.fillRect(0, 0, window.innerWidth, window.innerHeight);
    for(var i=0; i<=window.innerWidth; i++) {
        c.beginPath();
        c.moveTo(i, window.innerHeight/2 - peak(window.innerHeight/4, window.innerWidth/2, 50, i));
        c.lineTo(i+1, window.innerHeight/2 - peak(window.innerHeight/4, window.innerWidth/2, 50, i+1));
        c.strokeStyle = "black";
        c.stroke();
        c.fillStyle = "green";
        c.fillRect(i, window.innerWidth/4 - 7 - peak(window.innerHeight/4, window.innerWidth/2, 50, i), 1, peak(window.innerHeight/4, window.innerWidth/2, 50, i) + window.innerHeight/2);
        displaybluescore(bluescore);
        displayredscore(redscore);   
    }
}

function setblue(pos) {
    c.clearRect(pos, window.innerHeight/2 - 25, 25, 25);
    c.fillStyle = "blue";
    c.fillRect(pos, window.innerHeight/2 - 25, 25, 25);
}
var bluepos = window.innerWidth/4 - 25

function setred(pos) {
    c.clearRect(pos, window.innerHeight/2 - 25, 25, 25);
    c.fillStyle = "red";
    c.fillRect(pos, window.innerHeight/2 - 25, 25, 25);
}
var redpos = 3*window.innerWidth/4

function peak(A, a, b,  x) {
    // y = Ae^{(x-a)^2}
    y = A*Math.pow(Math.E,(-Math.pow((x-a)/b, 2)));
    return y;
}

function displaybluescore(score) {
    c.font = "16pt Arial";
    c.strokeStyle = "blue";
    c.fillStyle = "blue";
    c.strokeText(score, 5, 20);
    c.fillText(score, 5, 20);
}

function displayredscore(score) {
    c.font = "16pt Arial";
    c.strokeStyle = "red";
    c.fillStyle = "red";
    c.strokeText(score, window.innerWidth - 50, 20);
    c.fillText(score, window.innerWidth - 50, 20);
}

setblue(bluepos);
setred(redpos);