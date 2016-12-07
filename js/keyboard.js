/*function keyState(e) {
    this.value = 0;
    this.number = "";

}*/

keyState = {
    //left: A
    'd65': function(){
        this.value = this.value | 2;
        
    },
    //right: D
    'd68': function(){
        this.value = this.value | 1;
        
    },
    //space bar
    'd32': function(){
        this.value = this.value | 3;
    },

    'u65': function(){
        this.value = this.value & ~2;
    }, 
    'u68': function(){
        this.value = this.value & ~1;
    },
    'u32': function(){
        this.value = this.value & ~16;
    },
    down: null,
    up: null
};


function doKeyDown(e) {

    keyState.down = true;
    keyState.up = false;
    /*//the A key or left arrow key
    if (e.keyCode == 65 || e.keyCode == 37) {
        mykeyState.value = mykeyState.value | 2;
    }
    //the D key or right arrow key
    if (e.keyCode == 68 || e.keyCode == 39) {
        mykeyState.value = mykeyState.value | 1;
    }

    //the space key
    if (e.keyCode == 32) {
        mykeyState.value = mykeyState.value | 16;
    }
    if (e.keyCode === 49) {
        this.number = "1";
    }
    if (e.keyCode === 50) {
        this.number = "2";
    }
    if (e.keyCode === 51) {
        this.number = "3";
    }
    if (e.keyCode === 52) {
        this.number = "4";
    }
    if (e.keyCode === 53) {
        this.number = "5";
    }
    if (e.keyCode === 54) {
        this.number = "6";
    }
    if (e.keyCode === 55) {
        this.number = "7";
    }
    if (e.keyCode === 56) {
        this.number = "8";
    }
    if (e.keyCode === 57) {
        this.number = "9";
    }
    if (e.keyCode === 48) {
        this.number = "0";
    }*/
    keyState['d' + e.keyCode]();
}

function doKeyUp(e) {
    keyState.down = false;
    keyState.up = true;
    /*//the A key or left arrow key
    if (e.keyCode == 65 || e.keyCode == 37) {
        mykeyState.value = mykeyState.value & ~2;
    }
    //the D key or right arrow key
    if (e.keyCode == 68 || e.keyCode == 39) {
        mykeyState.value = mykeyState.value & ~1;
    }
    //the space key
    if (e.keyCode == 32) {
        mykeyState.value = mykeyState.value & ~16;
    }
    mykeyState.number = "boo";*/
    keyState['u' + e.keyCode]();
}

document.addEventListener('keydown', doKeyDown, true);
document.addEventListener('keyup', doKeyUp, true);
