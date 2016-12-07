/*function Point(x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype = {
    relative: function (to) {
        return new PVector(to.x - this.x, to.y - this.y);
    },
    distance: function (to) {
        return Math.sqrt(Math.pow(this.x - to.x, 2) + Math.pow(this.y - to.y, 2));
    }
};
*/
function PVector(x, y) {
    this.x = x;
    this.y = y;
}

PVector.prototype = {
    reverse: function(other) {
        var tmp = new PVector((this.x * -1), (this.y * -1));
        return tmp;
    },
    set: function(x, y) {
        this.x = x;
        this.y = y;
    },
    add: function(other) {
        var tmp = new PVector((this.x + other.x), (this.y + other.y));
        return tmp;
    },
    add2: function(other) {
        //var tmp=new PVector((this.x + other.y), (this.x + other.y));

        //this=tmp;
        this.x += other.x;
        this.y += other.y;

    },
    sub: function(other) {
        var tmp = new PVector((this.x - other.x), (this.y - other.y));
        return tmp;
    },
    sub: function(other) {
        this.x -= other.x;
        this.y -= other.y;
    },
    get_x_from_angle: function(angle) {
        return Math.cos(this.toRad(angle));
    },
    get_y_from_angle: function(angle) {

        return Math.sin(this.toRad(angle));
    },
    toRad: function(Value) {
        /** Converts numeric degrees to radians */
        return Value * this.pi / 180;
    },
    get_vector_from_angle: function(angle) {

        var tmp = new PVector(Math.cos(this.toRad(angle)), Math.sin(this.toRad(angle)));
        return tmp;

    },
    div: function(by) {
        var tmp = new PVector((this.x / by), (this.y / by));
        return tmp;
    },
    div2: function(by) {

        this.x = this.x / by;
        this.y = this.y / by;
    },
    scale: function(by) {
        return new PVector(this.x * by, this.y * by);
    },
    get: function() {
        return new PVector(this.x, this.y);
    },
    mag: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    mult: function(by) {

        this.x *= by;
        this.y *= by;
    },
    limit: function(topspeed) {
        if (this.x > topspeed) {
            this.x /= topspeed;
            return true;
        }
        if (this.y > topspeed) {
            this.y /= topspeed;
            return true;
        }
        return false;
    },
    normalize2: function() {
        m = this.mag();
        if (m != 0) {
            this.div2(m);
        }

    },

    normalize: function() {
        function norm(value) {
            return value > 0 ? 1 : value < 0 ? -1 : 0;
        }
        return new PVector(norm(this.x), norm(this.y));
    }
};
PVector.div = function(force, mass) {
    var tmp = new PVector((force.x / mass), (force.y / mass));
    return tmp;
}

PVector.add = function(v1, v2) {

    var v3 = new PVector(v1.x + v2.x, v1.y + v2.y);
    return v3;
}

PVector.toRad = function(value) {
    var pi = 3.14159265358979323846264;
    return value * pi / 180;
}

PVector.toDegrees = function(value) {
    var pi = 3.14159265358979323846264;
    return value * 180 / pi;
}
PVector.rotatevector = function(x, y, rad) {
    ca = Math.cos(rad);
    sa = Math.sin(rad);
    return new PVector(ca * x - sa * y, sa * x + ca * y);
}

PVector.angle_between_two_points = function(x, y, otherx, othery) {
    var arc = Math.atan2(x - otherx, y - othery);
    var degrees = PVector.toDegrees(arc);
    degrees = Math.abs(degrees);
    //   if (degrees < 0) degrees += 360;
    //   else if (degrees > 360)
    //   degrees -= 360;
    return degrees;
}
