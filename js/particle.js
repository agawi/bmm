function Particle(color, alpha, image, mass, x, y, dx, dy, width, height, sx, sy, swidth, sheight, parentwidth, parentheight, CPX, CPY) {

  this.prototype = new Mover(image, mass, x, y, dx, dy, width, height, sx, sy, swidth, sheight, parentwidth, parentheight);
  this.pulled = false;
  this.update = function() {
    this.prototype.applyForce(this.fireForce);
    this.prototype.moverUpdate();

    if (this.pulled || this.forceApplied || this.fired) {
      this.prototype.velocity.div2(1.005);
    } else {
      this.prototype.velocity.div2(1.07);
    }
    this.fireForce.div2(2);
  };
  this.draw = function() {
    drawEllipse((this.prototype.location.x + this.prototype.width / 2), (this.prototype.location.y + this.prototype.height / 2), this.prototype.width / 2, this.prototype.height / 2, color, true, alpha);
    drawEllipse((this.prototype.location.x + this.prototype.width / 2), (this.prototype.location.y + this.prototype.height / 2), this.prototype.width / 3, this.prototype.height / 3, 'aqua', true, alpha);
  };
  this.reset = function() {

  };
  this.fireForce = new PVector(0, 0);
  this.timer;
  this.cirlcePointX = CPX;
  this.circlePointY = CPY;
}

AuraSpells = {
  arr: [],
  number: undefined,
  timers: [],
  //when the spells are pulled to the staff, it is true
  pulled: false,
  create: function(num, color, image, mass, x, y, dx, dy, width, height, alpha, points, sx, sy, swidth, sheight, parentwidth, parentheight) {
    this.number = num;
    var time = 300;
    var time2 = 0;
    var time3 = 1000;
    for (var i = this.number - 1; i >= 0; --i) {
      dx = getRandomArbitrary(-10, 10);
      dy = getRandomArbitrary(-15, 10);
      this.arr.push(new Particle(color, alpha, image, mass, x, y, dx, dy, width, height, sx, sy, swidth, sheight, parentwidth, parentheight));

    }

    for (var i = this.arr.length - 1; i >= 0; --i) {
      this.arr[i].timer = new Timer(time, false);
      this.arr[i].timer2 = new Timer(time2, false);
      this.arr[i].timer3 = new Timer(time3, false);
      this.arr[i].divisor = 1000;
      //original distance between point and spell
      this.arr[i].oDistSpellPoint = Math.sqrt(Math.pow(this.arr[i].prototype.location.x - points[i].x, 2) + Math.pow(this.arr[i].prototype.location.y - points[i].y, 2));
      time += 125 / (i * 0.05 + 1);
      time2 += 125 / (i * 0.05 + 1);
    }


  },
  divisor: 1000,
  updateNum: 1,
  fired: false,
  mag: 5,
  fireForce: new PVector(0, 0),
  reducer: undefined,
  flying: false,
  distSpellMouse: undefined,
  setOffTime: 300,
  sOX: undefined,
  sOY: undefined,
  setOffDirX: undefined,
  setOffDirY: undefined,
  allSetOff: 0,
  clicked: false,
  commenceSetOff: false,
  spellSetOffInd: 0,
  spray: -15,
  calcSetOffDir: function(spell, fire) {
    this.distSpellMouse = Math.sqrt(Math.pow(mouse.x - spell.prototype.location.x, 2) + Math.pow(mouse.y - spell.prototype.location.y, 2));
    this.reducer = this.mag / this.distSpellMouse;
    this.sOX = (this.mouseX - spell.prototype.location.x) * this.reducer;
    this.sOY = (this.mouseY - spell.prototype.location.y) * this.reducer;
    this.setOffDirX = getRandomArbitrary(this.sOX - this.sOX * 0, this.sOX + this.sOX * 0);
    this.setOffDirY = getRandomArbitrary(this.sOY - this.sOY * 2, this.sOY + this.sOY * 2);
    spell.prototype.velocity.set(this.setOffDirX, this.setOffDirY);

  },
  calcFireDir: function(spell) {
    this.distSpellMouse = Math.sqrt(Math.pow(mouse.x - spell.prototype.location.x, 2) + Math.pow(mouse.y - spell.prototype.location.y, 2));
    this.reducer = this.mag / this.distSpellMouse;
    this.sOX = (this.mouseX - spell.prototype.location.x) * this.reducer / 2;
    this.sOY = (this.mouseY - spell.prototype.location.y) * this.reducer / 2;
    this.setOffDirX = getRandomArbitrary(this.sOX - this.sOX * 0.05, this.sOX + this.sOX * 0.05);
    this.setOffDirY = getRandomArbitrary(this.sOY - this.sOY * 0.05, this.sOY + this.sOY * 0.05);
    this.fireForce.set(this.setOffDirX, this.setOffDirY);
  },

  update2: function(points) {

    if (mouse.down) {
      this.clicked = true;
      this.mouseX = mouse.x;
      this.mouseY = mouse.y;
    }
    if (this.clicked && mouse.up) {
      this.clicked = false;
      this.commenceSetOff = true;
    }
    if (this.commenceSetOff) {
      for (var i = this.arr.length - 1; i >= 0; i--) {

        this.arr[i].update();
        this.arr[i].timer2.timer();
        if (this.arr[i].timer2.done) {
          this.arr[i].timer3.timer();
        }
        if (this.arr[i].timer2.done && !this.arr[i].setOff) {
          this.arr[i].setOff = true;
          this.calcSetOffDir(this.arr[i]);

        }
        if (!this.arr[i].setOff) {
          this.arr[i].prototype.location.x = points[i].x - this.arr[i].prototype.width / 2;
          this.arr[i].prototype.location.y = points[i].y - this.arr[i].prototype.width / 2;
        }
        if (this.arr[i].timer3.done && !this.arr[i].fired) {
          this.arr[i].fired = true;
          this.calcFireDir(this.arr[i]);
          this.arr[i].prototype.applyForce(this.fireForce);
          //console.log("fired");
        }

      }
    } else {
      for (var i = this.arr.length - 1; i >= 0; i--) {
        this.arr[i].prototype.location.x = points[i].x - this.arr[i].prototype.width / 2;
        this.arr[i].prototype.location.y = points[i].y - this.arr[i].prototype.width / 2;
      }

    }


  },

  update1: function(points, hit) {
    if (hit) {
      this.allAttached = 0;
      for (var i = this.arr.length - 1; i >= 0; --i) {

        this.arr[i].timer.timer();

        if (this.arr[i].timer.done) { //&& !this.arr[i].pulled) {

          //calculate distance between point and spell
          this.arr[i].distSpellPoint = Math.sqrt(Math.pow(this.arr[i].prototype.location.x - points[i].x, 2) + Math.pow(this.arr[i].prototype.location.y - points[i].y, 2));
          //divisor is relative to distance
          this.arr[i].divisor = 1250 * this.arr[i].distSpellPoint / (600 * g.cw / 1440) * 5;


          this.calcPull(this.arr[i].prototype.location.x, this.arr[i].prototype.location.y, points[i].x, points[i].y, this.arr[i].divisor);

          //console.log('spell #' + i + " pulled with a force of " + this.pull.y);
          if (this.arr[i].distSpellPoint < 1 || this.arr[i].attached) {

            this.arr[i].prototype.location.x = points[i].x - this.arr[i].prototype.width / 2;
            this.arr[i].prototype.location.y = points[i].y - this.arr[i].prototype.width / 2;
            this.arr[i].attached = true;

          }
          if (!this.arr[i].attached) {
            this.arr[i].prototype.applyForce(this.pull);
          }

          //this.arr[i].pulled = true;
        }

        this.arr[i].update();
        this.allAttached += this.arr[i].attached ? 0 : 1;

      }
      //this.updateNum = this.allAttached === 0 ? 2 : 1;
      if (this.allAttached === 0) {
        this.updateNum = 2;
        for (var i = this.arr.length - 1; i >= 0; --i) {
          this.arr[i].timer.reset();
        }
      }
    }
  },
  allAttached: 0,
  draw: function(hit) {
    if (hit) {
      for (var i = this.arr.length - 1; i >= 0; --i) {
        this.arr[i].draw();
      }
    }
  },
  calcPull: function(x, y, x1, y1, div) {
    this.pull.set(-(x - x1) / div, -(y - y1) / div);
  },
  //PVector force
  pull: new PVector(0, 0),
}

function FalseAuraParticles() {
  this.arr = [];
  this.number = undefined;
  this.create = function(num, color, image, mass, x, y, dx, dy, width, height, sx, sy, swidth, sheight, parentwidth, parentheight) {
    this.number = num - 1;
    for (var i = this.number; i >= 0; --i) {
      arr.push(new Particle(color, image, mass, x, y, dx, dy, width, height, sx, sy, swidth, sheight, parentwidth, parentheight));
    }
  };
  this.update = function() {
    for (var i = arr.length - 1; i >= 0; --i) {
      arr[i].update();
    }
  };
  this.draw = function() {
    for (var i = arr.length - 1; i >= 0; --i) {
      arr[i].draw();
    }
  };
}

function Point(x, y, angle) {
  this.x = x;
  this.y = y;
  this.angle = angle;
}

var spellCircle = {
  points: [],

  angle: undefined,
  rotationAngle: undefined,
  center: undefined,
  rad: undefined,
  pX: undefined,
  pY: undefined,
  //rad of distance from staff center for rotation with staff
  bigRad: undefined,
  create: function(num, rad, Cx, Cy) {
    this.angle = 0;
    var angleChange = Math.PI * 2 / num;
    this.rotationAngle = angleChange / 15;
    var x, y;
    this.center = new Point(Cx, Cy);
    this.rad = rad;
    this.bigRad = g.ch * 0.17;

    for (var i = num - 1; i >= 0; --i) {

      x = Math.cos(this.angle) * this.rad + this.center.x;
      y = Math.sin(this.angle) * this.rad + this.center.y;
      this.points.push(new Point(x, y, this.angle));
      this.angle += angleChange;
    }
    //this.points = shuffle(this.points);
  },
  rotation: function(point) {
    point.angle += this.rotationAngle;
    //console.log("point.angle = " + point.angle + " ; this.rotationAngle = " + this.rotationAngle);
    this.pX = Math.cos(point.angle) * this.rad + this.center.x;
    this.pY = Math.sin(point.angle) * this.rad + this.center.y;
    point.x = this.pX;
    point.y = this.pY;
    //console.log(this.points[0].x);

  },
  update: function(angle, x, y) {
    // rotation of the center of the cercle with the staff
    this.center.x = Math.cos(angle) * this.bigRad + x;
    this.center.y = Math.sin(-angle) * this.bigRad + y;
    for (var i = this.points.length - 1; i >= 0; --i) {
      this.rotation(this.points[i]);
    }
  },
  draw: function() {
    drawEllipse(this.center.x, this.center.y, this.rad, this.rad, 'black', false, 1);
    drawEllipse(this.center.x, this.center.y, 1, 1, 'black', true, 1);
    //console.log(this.points);
    for (var i = this.points.length - 1; i >= 0; --i) {
      drawEllipse(this.points[i].x, this.points[i].y, 0.5, 0.5, 'black', true, 1);

    }
  }
};