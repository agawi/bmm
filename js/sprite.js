//Mover uses vectors to move a sprite
function Mover(image, mass, x, y, dx, dy, width, height, sx, sy, swidth, sheight, parentwidth, parentheight) //object definition for sprite
{
    this.location = new PVector(x, y);
    this.velocity = new PVector(dx, dy); //change of x and change of y
    this.acceleration = new PVector(0, 0); //change of the change of x and y
    this.mass = mass;
    this.image = image;
    this.width = width; //sprite width and height
    this.height = height;
    this.radius = this.width / 2;
    this.sx = sx; //source image location x and y
    this.sy = sy;
    this.swidth = swidth //source image height and width
    this.sheight = sheight;
    this.parentwidth = parentwidth; //canvas heigth and width
    this.parentheight = parentheight;
    this.currentrow = 0; //current column and row of spritesheet
    this.currentcolumn = 0;
}

Mover.prototype = {
    //all movers will use the moverUpdate function to update position of the mover
    moverUpdate: function() {
        this.velocity = this.velocity.add(this.acceleration);
        this.location = this.location.add(this.velocity);
        this.acceleration.set(0, 0);
    },
    log: false,
    moverDraw: function(rotate, x, y) {


        if (!rotate) {
            if (this.image === null) {
                ctx.save();
                var border = 2;
                //ctx.beginPath();
                ctx.fillRect(Math.floor(this.location.x), Math.floor(this.location.y), this.width, this.height); //(this.location.x, this.location.y, this.width, this.height);
                ctx.fillStyle = "grey";
                ctx.fillRect(Math.floor(this.location.x + border), Math.floor(this.location.y + border), this.width - border * 2, this.height - border * 2);
                //ctx.closePath();
                ctx.restore();

            } else { //(this.location.x + border, this.location.y + border, this.width - border * 2, this.height - border * 2 );
                //ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
                ctx.drawImage(this.image, Math.floor(this.currentcolumn) * this.swidth, this.currentrow * this.sheight, this.swidth, this.sheight, this.location.x, this.location.y, this.width * 4, this.height * 1.5);
                //console.log("drawing hero img");

                //console.log('x: ' + this.location.x + '; y: ' + this.location.y + '; width: ' + this.width + '; height: ' + this.height);

            }

        } else {
            var border = 2
            ctx.save();
            ctx.fillRect(Math.floor(x - this.width / 2), Math.floor(y - this.height / 2), this.width, this.height);
            ctx.fillStyle = "grey";
            ctx.fillRect(Math.floor(x + border - this.width / 2), Math.floor(y + border - this.height / 2), this.width - border * 2, this.height - border * 2);
            ctx.restore();
        }
    },
    applyForce: function(force) {

        //console.log(this.mass);
        force.div2(this.mass); //scale vector down by mass of mover
        //console.log(force);
        this.acceleration = this.acceleration.add(force);
        //console.log(this.acceleration);
    },
    reset: function(x, y, dx, dy, width, height, sx, sy, swidth, sheight, parentwidth, parentheight) {
        this.location.x = x; //location x and y
        this.location.y = y;
        this.dx = dx; //change of x and y
        this.dy = dy;
        this.width = width; //sprite width and height
        this.height = height;
        this.radius = this.width / 2;
        this.sx = sx; //source image location x and y
        this.sy = sy;
        this.swidth = swidth //source image height and width
        this.sheight = sheight;
        this.parentwidth = parentwidth; //canvas heigth and width
        this.parentheight = parentheight;
        this.currentrow = 0; //current column and row of spritesheet
        this.currentcolumn = 0;
    }
}

//player 
hero = {
    runX: 10,
    running: new PVector(this.runX, 0),
    update: function(fps) {

        //if reaching the walls, veolcity is 0
        if (this.prototype.location.x < 0.5 && (keyState.value & 2 || keyState.up || mouse.up) || this.prototype.location.x + this.width() > g.cw - 0.5 && (keyState.value & 1 || keyState.up || mouse.up)) {
            this.prototype.velocity.x = 0;
            this.prototype.location.x = this.prototype.location.x < g.cw / 2 ? 0 : g.cw - this.width();
        } else {
            //move right
            if (keyState.value & 1) {
                //to move right, the x value of running is positive
                this.running.x = this.runX;
                this.prototype.applyForce(this.running);
            }
            //move left
            if (keyState.value & 2) {
                //to move left, the x value of running is negative
                this.running.x = -this.runX;
                this.prototype.applyForce(this.running);
            }
        }
        //velocity needs to go down over time
        this.prototype.velocity.div2(1.2);

        //if velocity is low enough, it becomes 0
        if (this.prototype.velocity.x < 0.6 && this.prototype.velocity.x > -0.6 && keyState.up) {
            this.prototype.velocity.x = 0;
        }


        //the mover acceleration, velocity, and location are updated
        this.prototype.moverUpdate();

    },

    draw: function() {
        //draws the updated mover
        //this.drawAnchorPoint();
        //rotation of wizard is false
        this.prototype.moverDraw(false);
    },

    reset: function() {
        //hero is back at the original point
        this.prototype.reset(hero.oX(), hero.oY(), 0, 0, hero.width, hero.height);
    },

    width: function() {
        return g.cw * 0.054;
    },
    height: function() {
        return g.ch * 0.2;
    },
    oX: function() {
        return g.cw * 0.9;
    },
    oY: function() {
        return g.ch * 0.77;
    },
    //anchor width percentage
    achorPos: 1.204,
    //the staff anchor point 
    staffAnchorX: function() {
        return this.prototype.location.x + this.achorPos * this.width();
    },
    drawAnchorPoint: function() {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.strokeStyle = 'white';
        ctx.moveTo(this.staffAnchorX(), staff.prototype.location.y + staff.height() / 2);
        ctx.lineTo(staff.prototype.location.x + staff.width() / 2, staff.prototype.location.y + staff.height() / 2);
        ctx.stroke();
        ctx.fillRect(this.staffAnchorX() - 2, staff.prototype.location.y + staff.height() / 2 - 2, 4, 4);
        ctx.closePath();
        ctx.restore();

    }
};

staff = {
    update: function() {
        //calc force of pull between staff and wizard
        this.calcPull();

        if (this.pullToAnchor.x < 0.05 && this.pullToAnchor.x > -0.05) {
            this.pullToAnchor.x = 0;
        }

        //apply pull to staff
        this.prototype.applyForce(this.pullToAnchor);

        //calculate the angle of the staff

        this.angle = round(-(staff.prototype.location.x + staff.width / 2 - hero.staffAnchorX()) / 120, 2); //Math.PI / 180 *  - (staff.prototype.location.x + staff.width() / 2 - hero.staffAnchorX()) / 2;

        //velocity needs to go down over time
        // to create smoother straightening of the staff when
        // wizard is immobile, the velocity of the staff
        //is decreased more
        if (keyState.up) {
            this.prototype.velocity.div2(1.4);
        } else {
            this.prototype.velocity.div2(1.2);
        }

        this.prototype.moverUpdate();
        // keep comment below for calculation of anchor point if it needs to be changed
        //console.log('x: ' + ((this.oX() - hero.oX() + this.width() / 2) /hero.width() ) );

    },
    angle: undefined,
    draw: function() {
        ctx.save();
        ctx.translate(this.prototype.location.x + this.width / 2, this.prototype.location.y + this.height / 2); //+ g.ch * 0.015);
        ctx.rotate(this.angle);
        //rotation of staff is true
        this.prototype.moverDraw(true, 0, 0);
        //this.drawSpellAnchor();
        //catchSpell.draw();
        ctx.restore();


        //console.log("staff drawn at x:" + this.prototype.location.x + ', and y: ' + this.prototype.location.y + ', width: ' + this.width() + ', height: ' + this.height());
    },
    reset: function() {

    },
    setup: function() {
        this.width = g.cw * 0.01;
        this.height = g.ch * 0.2;
        this.oX = g.cw * 0.96;
        this.oY = g.ch * 0.67;
    },

    spellAnchorX: function() {
        return this.prototype.location.x; // + this.width() / 2;
    },

    //polar coordinates for the spell
    spellAnchorY: function() {
        return this.prototype.location.y - this.height * 0.05;
    },

    drawSpellAnchor: function() {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(this.spellAnchorX - 2, this.spellAnchorY() - 2, 4, 4);
        //console.log( this.spellAnchorX() + ' ' + (this.prototype.location.y + 0.2 * this.height() - 5));
        ctx.closePath();
        ctx.restore();
    },

    // pulling force attracting the staff to the wizard's anchor point
    pullToAnchor: new PVector(0, 0),
    // calculation of the pullToAnchor force
    calcPull: function() {
        this.pullToAnchor.x = (hero.staffAnchorX() - this.prototype.location.x - this.width / 2) / 30;
        //this.pullToAnchor.y = hero.prototype.location.y - this.prototype.location.y;
    },
    width: undefined,
    height: undefined,
    oX: undefined,
    oY: undefined
};



catchSpell = {

    update: function() {


        if (mouse.down && !this.casted && mouse.y < g.ch * 0.6) {
            this.casted = true;
        }
        if (mouse.up && this.casted) {
            this.castSpell();
            this.casted = false;
            this.flying = true;
        }
        if (!this.flying) {

            //this.distSSchange = this.distSSchange < 0 ? -getRandomArbitrary(0.0003, 0.0007) : getRandomArbitrary(0.0003, 0.0006);//getrandom
            //distance from center of staff to center of spell
            //will be multiplied by canvas height
            this.distSpellStaff += this.distSSchange;


            this.distSSchange *= this.distSpellStaff < 0.119 || this.distSpellStaff > 0.131 ? -1 : 1;

            catchSpellRotation.update(1.571 - staff.angle, this.distSpellStaff * g.ch, staff.prototype.location.x + staff.width / 2 - this.width() / 2, staff.prototype.location.y + staff.height / 2);


            //console.log('staff = ' + staff.prototype.location.x + ' ; spell = ' + this.prototype.location.x);
        } else {
            this.prototype.applyForce(this.force);
        }

        //console.log(this.prototype.location.x + ' ' + this.prototype.location.y);
        //console.log(this.oX() + ' ' + this.oY());
        //console.log(this.prototype.location.x + this.prototype.location.y);

        //this.prototype.location.x = this.oX();
        //this.prototype.location.y = this.oY();

        //velocity needs to go down over time
        this.prototype.velocity.div2(1.1);
        this.prototype.moverUpdate();



    },
    draw: function() {
        //ctx.save();

        //rotation of staff is false
        drawEllipse(Math.floor(this.prototype.location.x + this.width() / 2), Math.floor(this.prototype.location.y + this.height() / 2), this.width() / 2, this.width() / 2, "black", true, 1);
        drawEllipse(Math.floor(this.prototype.location.x + this.width() / 2), Math.floor(this.prototype.location.y + this.height() / 2), this.width() / 2 - 2, this.width() / 2 - 2, "aqua", true, 1);
        //this.prototype.moverDraw(false);
        //drawTrigCircle(1.571 - staff.angle, this.distSpellStaff * g.ch, staff.prototype.location.x + staff.width() / 2, staff.prototype.location.y + staff.height() / 2, undefined, undefined);
        //this.drawSpellAnchor();
        //catchSpell.draw();
        //ctx.restore();


    },
    reset: function() {

    },
    casted: false,
    oX: function() {
        return staff.spellAnchorX() + this.width() / 2;
    },
    oY: function() {
        return staff.spellAnchorY() + this.height() / 2;
    },
    width: function() {
        return g.cw * 0.007;
    },
    height: function() {
        return g.cw * 0.007;
    },
    // calculates direction of spell and apply force to spell
    castSpell: function() {
        this.x1 = mouse.x;
        this.x2 = this.prototype.location.x + this.width() / 2;
        this.y1 = mouse.y;
        this.y2 = this.prototype.location.y + this.height() / 2;
        this.distance = Math.sqrt(Math.pow(this.x1 - this.x2, 2) + Math.pow(this.y2 - this.y1, 2));
        this.reducer = this.mag / this.distance;
        this.dirX = (this.x1 - this.x2) * this.reducer;
        this.dirY = (this.y1 - this.y2) * this.reducer;
        this.force.set(this.dirX, this.dirY);
    },
    x1: undefined,
    x2: undefined,
    y1: undefined,
    flying: false,
    mag: 2,
    distance: undefined,
    dirX: undefined,
    dirY: undefined,
    reducer: undefined,
    force: new PVector(0, 0),
    distSpellStaff: 0.125,
    distSSchange: 0.0005,
    hit: false

};

villain = {
    update: function() {
        this.prototype.moverUpdate();

    },
    draw: function() {
        //rotation of villain is false
        this.prototype.moverDraw(false);

    },
    reset: function() {

    },
    setup: function() {
        this.width = g.cw * 0.06;
        this.height = g.ch * 0.2;
        this.oX = g.cw * 0.05;
        this.oY = g.ch * 0.035;
    },
    width: undefined,
    height: undefined,
    oX: undefined,
    oY: undefined
};

badSpell = {
    update: function() {
        this.prototype.moverUpdate();

    },
    draw: function() {
        this.prototype.moverDraw();

    },
    reset: function() {

    }
};

goodSpell = {
    update: function() {
        this.prototype.moverUpdate();

    },
    draw: function() {
        this.prototype.moverDraw();

    },
    reset: function() {

    }
};

village = {
    update: function() {
        this.prototype.moverUpdate();

    },
    draw: function() {
        this.prototype.moverDraw();

    },
    reset: function() {

    }
};

currentOperation = {
    operation: {},
    oX: undefined,
    oY: undefined,
    width: undefined,
    height: undefined,
    update: function() {
        this.prototype.moverUpdate();

    },
    draw: function() {
        //this.prototype.moverDraw();
        //drawText(str, x, y, size, color, angle, center)

        drawText(this.operation.str, Math.floor(this.prototype.location.x + this.width / 2), Math.floor(this.prototype.location.y + this.height / 2 - 50), (100 * g.cw / 1440), "#325868", 0, 'center', 0.3);
        drawText(this.operation.str, Math.floor(this.prototype.location.x + this.width / 2), Math.floor(this.prototype.location.y + this.height / 2 - 50), (102 * g.cw / 1440), "#2d4e5c", 0, 'center', 0.2);
    },
    reset: function() {

    },
    setup: function() {
        this.width = g.cw * 0.3;
        this.height = g.ch * 0.1;
        this.oX = g.cw * 0.5 - this.width / 2;
        this.oY = g.ch * 0.25 - this.height / 2;
    }
};

function Aura(image, mass, x, y, dx, dy, width, height, sx, sy, swidth, sheight, parentwidth, parentheight) {
    this.prototype = new Mover(image, mass, x, y, dx, dy, width, height, sx, sy, swidth, sheight, parentwidth, parentheight);
    this.update = function() {
        this.prototype.moverUpdate();
    };
    this.draw = function() {
        drawEllipse(Math.floor(this.prototype.location.x + this.prototype.width / 2), Math.floor(this.prototype.location.y + this.prototype.height / 2), this.prototype.width / 2, this.prototype.height / 2, 'black', true, 0.5);
        drawEllipse(Math.floor(this.prototype.location.x + this.prototype.width / 2), Math.floor(this.prototype.location.y + this.prototype.height / 2), this.prototype.width / 2 - 2, this.prototype.height / 2 - 2, 'grey', true, 0.5);
        //this.prototype.moverDraw();
        drawText(this.string, Math.floor(this.prototype.location.x + this.prototype.width / 2), Math.floor(this.prototype.location.y + this.prototype.height / 1.6), 40 * (g.cw / 1440), '#7f9999', null, 'center', 1);
        //console.log(this.prototype.location.x + this.prototype.width / 2);
    };
    this.reset = function() {};
    this.rightAura = false;
    this.string;
    this.hit = false;
}

var AuraHandler = {
    array: [],
    rightAuraHit: false,
    createAuras: function(num, range, solution, boxW, space, y1, y2, auraW, auraH, sourceX, sourceY, sourceW, sourceH, img) {
        var Ax1, Ax2;
        for (var i = num - 1; i >= 0; --i) {
            Ax1 = i * boxW + (i + 1) * space - i * auraW / 2;
            Ax2 = Ax1 + boxW - auraW;
            this.array.push(new Aura(null, 0, getRandomIntInclusive(Ax1, Ax2), getRandomIntInclusive(y1, y2 - auraH), 0, 0, auraW, auraH, sourceX, sourceY, sourceW, sourceH, g.cw, g.ch));
        }
        //a random index is selected for the array of aura to make a 
        // random aura the correct one
        var trueAuraInd = getRandomInt(0, this.array.length);
        this.array[trueAuraInd].rightAura = true;
        this.array[trueAuraInd].string = solution + '';
        var count = 0;
        for (var i = range.length - 1; i >= 0; --i) {
            //range is a shuffled array of numbers
            //if the right aura is reached, skip it

            if (this.array[count].rightAura) {
                ++count;
            }
            //assign the values of range to the str of this.array
            this.array[count].string = range[i] + '';
            //console.log(this.array[i].str);
            ++count;
        }
    },
    //can only pass an array containing only movers
    collision: function(arrM) {
        for (var i = this.array.length - 1; i >= 0; --i) {
            for (var j = arrM.length - 1; j >= 0; --j) {
                if (this.calcDist(this.array[i].prototype.location.x + this.array[i].prototype.width / 2, this.array[i].prototype.location.y + this.array[i].prototype.width / 2, arrM[j].prototype.location.x + arrM[j].prototype.width / 2, arrM[j].prototype.location.y + arrM[j].prototype.width / 2) < this.array[i].prototype.width / 2.3 + arrM[j].prototype.width / 2.3) {
                    if (this.array[i].rightAura) {
                        this.rightAuraHit = true;
                    }
                    this.array[i].hit = true;
                    arrM[j].hit = true;
                }
            }
        }
    },
    calcDist: function(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    },
    update: function() {
        for (var i = this.array.length - 1; i >= 0; --i) {
            if (!this.array[i].hit) {
                this.array[i].update();
            }
        }
    },
    draw: function() {
        for (var i = this.array.length - 1; i >= 0; --i) {
            if (!this.array[i].hit) {
                this.array[i].draw();
            }
        }
    },
    reset: function() {

    }

}

//Mover(image, mass, x, y, dx, dy, width, height, sx, sy, swidth, sheight, parentwidth, parentheight)

//place object's setup function before assignment of new mover



badSpell.prototype = new Mover();
goodSpell.prototype = new Mover();
village.prototype = new Mover();