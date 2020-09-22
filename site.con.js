/*! DO NOT EDIT step10 2017-04-20 */
/**
 * Created by X on 4/20/2017.
 */
function Buttons() {
    this.on = 1;
    var that = this;

    this.update(1);

    for(var b=1;  b<=3;  b++) {
        this.configButton(b);
    }
}

Buttons.prototype.configButton = function(b) {
    var c = (b == 3 ? 1 : b + 1);
    var that = this;

    $("#b" + b).click(function() {
        if(that.on == b) {
            that.update(c);
        }
    });
}

Buttons.prototype.update = function(a) {
    this.on = a;
    $("#b1").css("background-color", this.on == 1 ? "red" : "green");
    $("#b2").css("background-color", this.on == 2 ? "red" : "green");
    $("#b3").css("background-color", this.on == 3 ? "red" : "green");
    $("#b1").html(this.on == 1 ? "Press Me" : "&nbsp;");
    $("#b2").html(this.on == 2 ? "Press Me" : "&nbsp;");
    $("#b3").html(this.on == 3 ? "Press Me" : "&nbsp;");
}
/**
 * Created by X on 4/20/2017.
 */
function Simon(sel) {

    // Get a reference to the form object
    this.form = $(sel);
    var that = this;

    this.state = "initial";
    this.sequence = [];
    this.sequence.push(Math.floor(Math.random() * 4));
    this.current = 0;


    console.log('Simon started');
    this.configureButton(0,"red");
    this.configureButton(1,"green");
    this.configureButton(2,"blue");
    this.configureButton(3,"yellow");

    this.play();
}

Simon.prototype.configureButton = function(ndx, color) {
    var button = $(this.form.find("input").get(ndx));
    var that = this;

    button.click(function(event) {

        if(ndx != that.sequence[that.current]){
            document.getElementById("buzzer").play();
            that.state = "fail";
            that.sequence = [];
            that.sequence.push(Math.floor(Math.random() * 4));
            window.setTimeout(function() {
                that.play();
            }, 1000);
        }
        else{
            document.getElementById(color).currentTime = 0;
            document.getElementById(color).play();

            if(that.current == that.sequence.length - 1){
                that.sequence.push(Math.floor(Math.random() * 4));
                window.setTimeout(function() {
                    that.play();
                }, 1000);

            } else{
                that.current++;
            }
        }
    });

    button.mousedown(function(event){
        button.css("background-color",color);
    });

    button.mouseup(function (event) {
        button.css("background-color","lightgrey");
    });
}

Simon.prototype.playCurrent = function(){
    var that = this;

    if(this.current < this.sequence.length){
        var colors = ["red","green","blue","yellow"];
        document.getElementById(colors[this.sequence[this.current]]).play();

        var button = $(this.form.find("input").get(this.sequence[this.current]));
        var color = colors[this.sequence[this.current]];
        this.buttonPress(button,color);
        this.current++;

        window.setTimeout(function() {
            that.playCurrent();
        }, 1000);
    }
    else{
        this.current = 0;
        this.state = "enter";
    }
}

Simon.prototype.buttonPress = function(button, color){
    var that = this;
    button.css("background-color",color);
    window.setTimeout(function() {
        $("input[type=button]").css("background-color" , "lightgrey");
    }, 1000);

}

Simon.prototype.play = function(){
    var that = this;
    this.state = "play";
    this.current = 0;
    that.playCurrent();
}