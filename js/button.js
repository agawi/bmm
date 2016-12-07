function Button(s, x, y, w, h, bckgc, hc, cdc, fontColor, cdfc, bc, action, unAction, img, controls) {
    this.height = h;
    this.width = w;
    this.posX = x;
    this.posY = y;
    this.action = action;
    this.unAction = unAction;
    this.fontColor = fontColor;
    this.fontSize = 24;
    this.font = this.fontSize + "px Arial";
    this.backgroundColor = bckgc;
    this.string = s;
    this.hoverColor = hc;
    this.clickDownColor = cdc;
    this.clickDownFontColor = cdfc;
    this.border = bc;
    this.currentFontColor = this.fontColor;
    this.currentColor = this.backgroundColor;
    this.clicked = false;
    this.controls = controls;
    this.update = function() {
        if (mouse.x < this.posX + this.width && mouse.x > this.posX && mouse.y > this.posY && mouse.y < this.posY + this.height && mouse.down == true) {
            this.currentColor = this.clickDownColor;
            this.clicked = true;
            this.currentFontColor = cdfc;
        } else if (mouse.x < this.posX + this.width && mouse.x > this.posX && mouse.y > this.posY && mouse.y < this.posY + this.height) {
            this.currentColor = this.hoverColor;
        } else {
            this.currentColor = this.backgroundColor;
        }
        if (controls) {
            if (mouse.down && this.clicked) {
                this.action();
            }
            if (mouse.up && this.clicked) {
                mouse.down = false;
                this.clicked = false;
                this.unAction();
            }
        } else
        if (mouse.up && this.clicked) {
            this.action();
        }
    };
    this.draw = function() {
        ctx.save();
        //ctx.beginPath();
        ctx.globalAlpha = 0.05;

        ctx.strokeStyle = this.border;
        ctx.fillStyle = this.currentColor;
        ctx.rect(this.posX, this.posY, this.width, this.height);

        ctx.stroke();
        ctx.fill();

        ctx.textAlign = "center";
        ctx.font = this.font;
        ctx.fillStyle = this.currentFontColor;
        ctx.fillText(this.string, this.posX + this.width / 2, this.posY + this.height / 2 + 9);

        //ctx.closePath();
        ctx.restore();

    };

}


function RadioButton(x, y, w, h) {
    this.height = h;
    this.width = w;
    this.posX = x;
    this.posY = y;
    this.fontSize = 24;
    this.font = this.fontSize + "px Arial";
    this.string = "";
    this.fontColor = "black";
    this.backgroundColor = "#5ed7d2";
    this.currentColor = this.backgroundColor;
    this.currentFontColor = this.fontColor;
    this.hoverColor = "#4cb2b4";
    this.clickDownColor = "#05878a";
    this.border = "black";
    this.clickedDown = false;
    this.checked = false;
    this.action;
    this.update = function() {
        if (this.checked) {
            this.action();
            this.currentFontColor = "white";
            this.currentColor = this.clickDownColor;
        } else
        if (mouse.x < this.posX + this.width && mouse.x > this.posX && mouse.y > this.posY && mouse.y < this.posY + this.height && mouse.down == true) {
            this.currentColor = this.clickDownColor;
            this.clickedDown = true;
        } else if (mouse.x < this.posX + this.width && mouse.x > this.posX && mouse.y > this.posY && mouse.y < this.posY + this.height && !this.checked) {
            this.currentColor = this.hoverColor;
        } else if (!this.checked) {
            this.currentColor = this.backgroundColor;
            this.currentFontColor = "black";
        }
        if (mouse.up && this.clickedDown) {
            this.clickedDown = false;
        }
    };
    this.draw = function() {
        ctx.save();
        //ctx.beginPath();


        ctx.fillStyle = this.currentColor;
        ctx.strokeStyle = this.border;
        ctx.rect(this.posX, this.posY, this.width, this.height);

        ctx.stroke();
        ctx.fill();


        ctx.textAlign = "center";
        ctx.font = this.font;
        ctx.fillStyle = this.currentFontColor;
        ctx.fillText(this.string, this.posX + this.width / 2, this.posY + this.height / 2 + 9);

        //ctx.closePath();
        ctx.restore();

    };
}

function RadioButtons() {
    this.arrayOfButtons = [];


    this.updateChecked = function() {

        for (var i = this.arrayOfButtons.length - 1; i >= 0; --i) {
            if (this.arrayOfButtons[i].clickedDown && mouse.down && !mouse.up && !this.arrayOfButtons[i].checked) {
                this.arrayOfButtons[i].checked = true;
                for (var j = this.arrayOfButtons.length - 1; j >= 0; --j) {
                    if (i === j) {} else {
                        this.arrayOfButtons[j].checked = false;
                    }
                }
            }
        }
    };
    this.updateButtons = function() {
        for (var i = this.arrayOfButtons.length - 1; i >= 0; --i) {
            this.arrayOfButtons[i].update();
        }
    };
    this.drawButtons = function() {
        for (var i = this.arrayOfButtons.length - 1; i >= 0; --i) {
            this.arrayOfButtons[i].draw();
        }


    };
}

function CheckButton(x, y, w, h) {
    this.height = h;
    this.width = w;
    this.posX = x;
    this.posY = y;
    this.fontSize = 24;
    this.font = this.fontSize + "px Arial";
    this.string = "";
    this.fontColor = "black";
    this.backgroundColor = "#5ed7d2";
    this.currentColor = this.backgroundColor;
    this.currentFontColor = this.fontColor;
    this.hoverColor = "#4cb2b4";
    this.clickDownColor = "#05878a";
    this.border = "black";
    this.clickedDown = false;
    this.checked = false;
    this.action;
    this.update = function() {


        if (this.checked) {
            //this.action();
            this.currentFontColor = "white";
            this.currentColor = this.clickDownColor;
        } else {
            this.currentColor = this.backgroundColor;
            this.currentFontColor = "black";
        }
        if (mouse.x < this.posX + this.width && mouse.x > this.posX && mouse.y > this.posY && mouse.y < this.posY + this.height && !this.checked) {
            this.currentColor = this.hoverColor;
        }
        if (mouse.x < this.posX + this.width && mouse.x > this.posX && mouse.y > this.posY && mouse.y < this.posY + this.height && mouse.down) {
            this.clickedDown = true;

        } else if (mouse.up && this.clickedDown) {
            this.clickedDown = false;
            if (this.checked) {
                this.checked = false;
            } else {
                this.checked = true;
            }
        }

    };
    this.draw = function() {
        ctx.save();
        //ctx.beginPath();


        ctx.fillStyle = this.currentColor;
        ctx.strokeStyle = this.border;
        ctx.rect(this.posX, this.posY, this.width, this.height);

        ctx.stroke();
        ctx.fill();


        ctx.textAlign = "center";
        ctx.font = this.font;
        ctx.fillStyle = this.currentFontColor;
        ctx.fillText(this.string, this.posX + this.width / 2, this.posY + this.height / 2 + 9);

        //ctx.closePath();
        ctx.restore();

    }

}


function TextBox(x, y, w, h, s, bckgc) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.string = s;
    this.backgroundColor = bckgc;
    this.update = function() {

    };
    this.draw = function() {

    };
}