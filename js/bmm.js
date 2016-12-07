//Frame Rate Calculation
var frameRate = {
    startTime: 0,
    frameNumber: 0,
    getFPS: function() {
        this.frameNumber++;
        var d = new Date().getTime(),
            currentTime = (d - this.startTime) / 1000,
            result = Math.floor((this.frameNumber / currentTime));
        if (currentTime > 1) {
            this.startTime = new Date().getTime();
            this.frameNumber = 0;
        }
        return result;
    }
};


//next animation frame polyfill
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

var counter = 0;

img1 = new Image();
img1.src = "images/img1.jpg";

var averageFps = 0;
var currentavFps = 0;

//game object
var bmm = {
    //currentGameState is going to determine which game state the game is in, to change the game state, change the currentGameState
    currentGameState: 'playerAttack',



    //setup function sets all objects and arrays prior to the game running
    setup: function() {

    },

    //reset function resets values to allow the game to siwtch back to previous gameState
    reset: function() {

    },

    //the gameState is a where the game values are updated and images drawn

    //startingScreen
    startingScreen: function() {
        console.log('I am in start');

        counter >= 100 ? (bmm.currentGameState = 'settingScreen', counter = 1) : (bmm.currentGameState = bmm.currentGameState, ++counter);

        function update() {

        };

        function draw() {

        };

        //next frame is requested and calls the GameState method equal to currentGameState
        requestAnimationFrame(bmm.gameState[bmm.currentGameState]);
    },

    //settingScreen where all settings are determined
    settingScreen: function() {
        console.log('I am in settings');


        counter >= 100 ? (bmm.currentGameState = 'villainCast', counter = 1) : (bmm.currentGameState = bmm.currentGameState, ++counter);


        function update() {

        };

        function draw() {

        };

        //next frame is requested and calls the GameState method equal to currentGameState
        requestAnimationFrame(bmm.gameState[bmm.currentGameState]);
    },

    //villainCast, the villain casts his spell
    villainCast: function() {
        console.log('I am in villain cast');

        counter >= 100 ? (bmm.currentGameState = 'playerAttack', counter = 1) : (bmm.currentGameState = bmm.currentGameState, ++counter);


        function update() {

        };

        function draw() {

        };

        //next frame is requested and calls the GameState method equal to currentGameState
        requestAnimationFrame(bmm.gameState[bmm.currentGameState]);
    },

    //playerAttack, the player can attack 
    playerAttack: {
        loop: function() {




            //console.log('I am in playerAttack');

            //counter >= 100 ? (bmm.currentGameState = 'startingScreen', counter = 1) : (bmm.currentGameState = bmm.currentGameState, ++counter);
            var fps = frameRate.getFPS();


            averageFps += fps;
            counter++;
            //console.log(counter + ' '+ averageFps + ' '+ currentavFps);

            if (counter > 200) {

                currentavFps = averageFps / counter;
                counter = 0;
                averageFps = 0;

            }


            bmm.playerAttack.update(fps);
            bmm.playerAttack.draw(fps);


            //next frame is requested and calls the GameState method equal to currentGameState
            requestAnimationFrame(bmm[bmm.currentGameState].loop);

        },
        update: function(fps) {
            //canvas.width = window.innerWidth * window.devicePixelRatio;
            //canvas.height = window.innerHeight * window.devicePixelRatio;
            //g.cw = canvas.width;
            //g.ch = canvas.height;
            hero.update(fps);
            villain.update();
            staff.update(fps);
            catchSpell.update(fps);
            moveRight.update();
            moveLeft.update();
            currentOperation.update();
            AuraHandler.update();
            if (!catchSpell.hit) {
                AuraHandler.collision(g.arrObjCollision);
            }
            AuraSpells["update" + AuraSpells.updateNum](spellCircle.points, AuraHandler.rightAuraHit);
            if (AuraHandler.rightAuraHit) {
                //angle, x, y
                spellCircle.update(1.571 - staff.angle, staff.prototype.location.x + staff.width / 2, staff.prototype.location.y + staff.height / 2);
            }
            //var k = new PVector(0.1,0.1);

            //par.update(k);


        },
        log: false,
        draw: function(fps) {
            ctx.clearRect(0, 0, g.cw, g.ch);
            ctx.beginPath();
            //ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
        //ctx.drawImage(img1, 0, 0, img1.width, img1.height, 0, 0, g.cw, g.ch);
            //ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, g.cw, g.ch);
            //ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, g.cw, g.ch);
            //ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, g.cw, g.ch);
            //ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, g.cw, g.ch);
            //ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, g.cw, g.ch);
            //ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, g.cw, g.ch);
            //ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, g.cw, g.ch);

            //moveRight.draw();
            //moveLeft.draw();
            hero.draw();
            villain.draw();
            staff.draw();
            catchSpell.draw();
            mouse.draw();
            currentOperation.draw();
            AuraHandler.draw();

            AuraSpells.draw(AuraHandler.rightAuraHit);

            //spellCircle.draw();

            ctx.save();
            ctx.beginPath();
            ctx.font = (24 * g.cw / 1440) + "px Arial";
            ctx.fillStyle = "black";
            ctx.fillText('FPS: ' + fps + '  ;  Average FPS: ' + (currentavFps).toFixed(2) + ', in bmm', 0.03 * g.cw, 0.15 * g.ch);
            ctx.fillText
            ctx.closePath();
            ctx.restore();
            ctx.closePath();
        }



    }





}


function setup() {
    g.cw = window.innerWidth; // / window.devicePixelRatio;
    g.ch = window.innerHeight; // / window.devicePixelRatio;
    //console.log('Setup: g.cw = '+ g.cw + ' : g.ch = ' + g.ch);
    img_mage = new Image();
    img_mage.src = "images/mage.png";
    hero.prototype = new Mover(null, 5, hero.oX(), hero.oY(), 0, 0, hero.width(), hero.height(), img_mage.width, img_mage.height, g.cw, g.ch);
    staff.setup();
    staff.prototype = new Mover(null, 1, staff.oX, staff.oY, 0, 0, staff.width, staff.height);
    catchSpell.prototype = new Mover(null, 1, catchSpell.oX(), catchSpell.oY(), 0, 0, catchSpell.width(), catchSpell.height());
    villain.setup();
    villain.prototype = new Mover(null, 5, villain.oX, villain.oY, 0, 0, villain.width, villain.height);

    moveRight = new Button('Right', 0.60 * g.cw, 0.65 * g.ch, 0.40 * g.cw, 0.35 * g.ch, '#325868', '#325868', '#002f43', '#7f9999', '#7f9999', '#7f9999', function() {
        keyState.value = keyState.value | 1;
    }, function() {
        keyState.value = keyState.value & ~1;
    }, undefined, true);

    moveLeft = new Button('Left', 0.0 * g.cw, 0.65 * g.ch, 0.40 * g.cw, 0.35 * g.ch, '#325868', '#325868', '#002f43', '#7f9999', '#7f9999', '#7f9999', function() {
        keyState.value = keyState.value | 2;
    }, function() {
        keyState.value = keyState.value & ~2;
    }, undefined, true);
    catchSpellRotation = new TrigRotation(catchSpell);

    //operation.reset() always follows the make current operation function
    makeCurrOp(true, false, false, false, 1, 1, [5, 6, 7, 8, 9, 10, 11, 12], [5, 6, 7, 8, 9, 10, 11, 12])
    operation.reset();

    currentOperation.setup();
    currentOperation.prototype = new Mover(null, 0, currentOperation.oX, currentOperation.oY, 0, 0, currentOperation.width, currentOperation.height);
    //createAuras: function(num, range, solution, boxW, space, y1, y2, auraW, auraH, sourceX, sourceY, sourceW, sourceH, img)
    AuraHandler.createAuras(6, currentOperation.operation.range, currentOperation.operation.solution, g.cw * 0.17, g.cw * 0.02, g.ch * 0.2, g.ch * 0.5, g.cw * 0.07, g.cw * 0.07);
    g.arrObjCollision.push(catchSpell);

    // set ASX and ASY to the right aura's coordinates
    // for the spells to use
    var ASX, ASY;
    for (var i = AuraHandler.array.length - 1; i >= 0 ; --i) {
        if (AuraHandler.array[i].rightAura) {
            ASX = AuraHandler.array[i].prototype.location.x + AuraHandler.array[i].prototype.width / 2;
            ASY = AuraHandler.array[i].prototype.location.y + AuraHandler.array[i].prototype.height / 2;
        }
    }
    //(num, color, image, mass, x, y, dx, dy, width, height, sx, sy, swidth, sheight, parentwidth, parentheight, alpha)
    var numOfSpells = 15;
    spellCircle.create(numOfSpells, g.cw * 0.025, staff.prototype.location.x + staff.width / 2, staff.prototype.location.y + staff.height / 2);
    //(num, color, image, mass, x, y, dx, dy, width, height, sx, sy, swidth, sheight, parentwidth, parentheight, alpha, points)
    AuraSpells.create(numOfSpells, 'black', null, 0.1, ASX, ASY, 10, 10, g.cw * 0.005, g.cw * 0.005, 1, spellCircle.points);
    //num, rad, Cx, Cy

}

window.onload = function() {
    setup();
    //console.log('After: g.cw = '+ g.cw + ' : g.ch = ' + g.ch);
    bmm[bmm.currentGameState].loop();
};



//the game loop depending on the currentGameState runs here
//bmm[bmm.currentGameState].loop();


function gameloop() {
    ctx.clearRect(0, 0, g.cw, g.ch);


    averageFps += frameRate.getFPS();
    counter++;

    if (counter > 200) {

        currentavFps = averageFps / counter;;
        counter = 0;
        averageFps = 0;
    }

    //ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, g.cw, g.ch);
    //ctx.drawImage(img,0, 0, img.width, img.height, 0, 0, g.cw, g.ch);
    //ctx.drawImage(img,0, 0, img.width, img.height, 0, 0, g.cw, g.ch);
    //ctx.drawImage(img,0, 0, img.width, img.height, 0, 0, g.cw, g.ch);
    //ctx.drawImage(img,0, 0, img.width, img.height, 0, 0, g.cw, g.ch);
    //ctx.drawImage(img,0, 0, img.width, img.height, 0, 0, g.cw, g.ch);
    //ctx.drawImage(img,0, 0, img.width, img.height, 0, 0, g.cw, g.ch);
    //ctx.drawImage(img,0, 0, img.width, img.height, 0, 0, g.cw, g.ch);
    //ctx.drawImage(img,0, 0, img.width, img.height, 0, 0, g.cw, g.ch);
    hero.draw();

    ctx.font = "24px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(currentavFps + '      gameloop', 50, 50);

    requestAnimationFrame(gameloop);

}

//gameloop();