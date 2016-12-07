var round_multiplier;

function round(num, places) {
    round_multiplier = Math.pow(10, places);
    return Math.round(num * round_multiplier) / round_multiplier;
}

function drawLine(x1, y1, x2, y2, color) {

    ctx.save();
    ctx.strokeStyle = color ? color : "black";
    ctx.beginPath();

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}

function drawEllipse(centerX, centerY, width, height, color, fill, alpha) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color ? color : "black";
    ctx.globalAlpha = alpha;
    ctx.arc(centerX, centerY, width, 0, 2 * Math.PI, true);
    if (fill) {
        ctx.fillStyle = color;
        ctx.fill();
    }
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}


function drawTrigCircle(angle, rad, x, y, x1, y1) {
    this.trig_y1 = y1;
    this.trig_x1 = x1;
    if (y1 === undefined && x1 === undefined) {
        this.trig_y1 = rad * Math.sin(angle);
        this.trig_x1 = rad * Math.cos(angle);
        drawLine(x, y, x + this.trig_x1, y);
        drawLine(x, y, x + this.trig_x1, y - this.trig_y1);
        drawLine(x + this.trig_x1, y - this.trig_y1, x + this.trig_x1, y);
        drawEllipse(x, y, rad, rad);
    }
}

function drawText(str, x, y, size, color, angle, center, alpha) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = color ? color : "black";
    ctx.font = size + "px Arial";
    ctx.textAlign = center;
    ctx.globalAlpha = alpha ? alpha : 1;
    ctx.translate(x, y);
    if (angle) {
        ctx.rotate(angle);
    }
    ctx.fillText(str, 0, 0);
    ctx.closePath();
    ctx.restore();
}

function TrigRotation(obj) {
    this.obj = obj;
}
TrigRotation.prototype = {
    x1: undefined,
    y1: undefined,
    update: function(angle, rad, x, y) {
        this.x1 = Math.cos(angle) * rad;
        this.y1 = Math.sin(angle) * rad;
        this.obj.prototype.location.x = this.x1 + x;
        this.obj.prototype.location.y = -this.y1 + y;
    }
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min, max) //random floating point
{
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) //random int
{
    return Math.floor((Math.random() * max) + min);
}

function getMax(num1, num2) {
    if (num1 == num2) {
        return num1;
    }
    if (num1 > num2) {
        return num1;
    } else {
        return num2;
    }
}

function getMin(num1, num2) {
    if (num1 == num2) {
        return num2;
    }
    if (num1 > num2) {
        return num2;
    } else {
        return num1;
    }
}

function shuffle(array) {
    var m = array.length,
        t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

function Timer(timeBetween, repeat) {
    this.timeBetween = timeBetween;
    this.repeat = repeat;
    this.start = false;
    this.startTime;
    this.now;
    this.done = false;
    this.set = function(timeBetween, repeat) {
        this.timeBetween = timeBetween;
        this.repeat = repeat;
    };
    this.timer = function() {
        this.now = new Date();
        if (!this.start) {
            this.startTime = new Date();
            this.start = true;
        }
        
        if (timeBetween < this.now - this.startTime) {
            if (repeat) {
                this.startTime = new Date();
                this.start = false
            } else {
                this.done = true;
            }

        }
    };
    this.reset = function() {
        this.start = false;
        this.done = false;
    };
}


var operation = {

    num1: undefined,
    num2: undefined,
    mulTables: [],
    divTables: [],
    op: {
        solution: undefined,
        str: undefined,
        range: []
    },
    opArr: [],
    setNumbers: function(min, max) {
        this.num1 = getRandomIntInclusive(min, max);
        this.num2 = getRandomIntInclusive(min, max);
    },
    //tArr is array of multiplication Tables selected in the settings screen
    setMulTables: function(tArr) {
        for (var i = tArr.length - 1; i >=0 ; --i) {
            this.mulTables.push(tArr[i]);
        }
    },
    setDivTables: function(tArr) {
        for (var i = tArr.length - 1; i >=0 ; --i) {
            this.divTables.push(tArr[i]);
        }
    },
    createRange: function() {
        var count = 0;
        var s = this.op.solution;
        if (this.op.solution < 3) {
            for (var i = 0; i < 5; ++i) {
                if (this.op.solution === count) {
                    ++count;
                }
                this.op.range.push(count);
                ++count;
            }
        } else {
            this.op.range = [s - 2, s - 1, s + 1, s + 2, s + 3];
        }
        this.op.range = shuffle(this.op.range);
    },
    createOp: function(add, sub, mult, div) {
        if (add) {

            this.opArr.push(function() {
                operation.op.solution = operation.num1 + operation.num2;
                operation.op.str = operation.num1 + "  +  " + operation.num2;
            });
        }
        if (sub) {
            this.opArr.push(function() {
                operation.op.solution = getMax(operation.num1, operation.num2) - getMin(operation.num1, operation.num2);
                operation.op.str = getMax(operation.num1, operation.num2) + "  -  " + getMin(operation.num1, operation.num2);
            });
        }
        if (mult) {
            this.opArr.push(function() {
                var num = getRandomIntInclusive(0, 12);
                var mulTablesInd = getRandomInt(0, operation.mulTables.length);
                //console.log(mulTablesInd);
                //console.log(operation.mulTables[mulTablesInd])
                operation.op.solution = operation.mulTables[mulTablesInd] * num;
                operation.op.str = operation.mulTables[mulTablesInd] + '  x  ' + num;
            });
        }
        if (div) {
            this.opArr.push(function() {
                var divisor = operation.divTables[getRandomInt(0, operation.divTables.length)];
                var quotient = divisor * getRandomIntInclusive(0, 12);
                operation.op.solution = quotient / divisor;
                operation.op.str = quotient + '  /  ' + divisor;
            });
        }

        this.opArr[getRandomInt(0, this.opArr.length)]();

    },
    getOp: function() {
        return this.op;
    },
    reset: function() {
        this.num1 = undefined;
        this.num2 = undefined;
        this.mulTables = [];
        this.solution = undefined;
        this.str = undefined;
        this.op = {
            solution: undefined,
            str: undefined,
            range: []
        },
        this.opArr = [];
    }
};

var min = 25,
    max = 50,
    mtab = [7, 8, 9, 10, 11, 12],
    dtab = [4, 6, 7, 10, 11, 12],
    add = true,
    sub = true,
    mult = false,
    div = false,
    op = {};


//operation.reset() always follows the make current operation function
//first call of the function in setup() in bmm.js
function makeCurrOp(add, sub, mult, div, min, max, mtab, dtab) {
    if (min != null && max != null) {
        operation.setNumbers(min, max);
    }
    if (mtab) {
        operation.setMulTables(mtab);
    }
    if (dtab) {
        operation.setDivTables(dtab);
    }
    operation.createOp(add, sub, mult, div);
    operation.createRange();
    currentOperation.operation = operation.getOp();
}