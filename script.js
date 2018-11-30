function Proceed(){
    var call = document.getElementById("name").value;
    var message = "This is website that will help you calculate your grades so you can ensure you're doing your very best!";
    var button1 = "<button id='start' onclick=addTo()>Enter a category</button>";
    var textbox = "<input type='text' id='typename'>";
    document.getElementById("text").innerHTML = "Welcome " + call + "<br>" + message + "<br><br>" + textbox + "<br>" + button1 + "<br>";
    document.getElementById("submit").innerHTML = "<br>" + "<button onclick=mathStart()>I have no more categories</button>";
}
var rowCount = 0;

function addTo() {
    if(rowCount < 6){
        var nameofcat = document.getElementById("typename").value;
        if(nameofcat.length == 0){
            nameofcat = "Homework";
        }
        var tabler = document.createElement("tr");
        var tabled = document.createElement("td");
        var tabled2 = document.createElement("td");
        var inline = document.createElement("input");
        var inline2 = document.createElement("input");
        document.getElementById("table").appendChild(tabler);
        tabler.appendChild(tabled);
        tabler.appendChild(tabled2);
        tabled.innerHTML = "  "  + nameofcat + " Points  ";
        tabled2.innerHTML = "  " + nameofcat + " Weight  ";
        tabled.appendChild(inline);
        tabled2.appendChild(inline2);
        inline.setAttribute("id", "points" + rowCount);
        inline2.setAttribute("id", "weight" + rowCount);
        inline.setAttribute("placeholder", '70,80,90');
        inline2.setAttribute("placeholder", "20");
        rowCount++;
        color(tabler, tabled);
    }

}

function color(x, y) {
    if (rowCount % 3 == 0) {
        c = "white";
    }
    if (rowCount % 3 == 1) {
        c = "blue"
    }
    if (rowCount % 3 == 2) {
        c = "yellow"
    }

    x.setAttribute("class", c);
    y.setAttribute("class", c);
}

function mathStart(){
    var finalReturn = math();
    if(finalReturn == false){
        document.getElementById("final").innerHTML = "<h2> Weights must add up to 100%. Correct your error and try again. </h2>"
    }else{
        if(finalReturn == "oops"){
            document.getElementById("final").innerHTML = "<h2>" + "Your grade seems to be an impossible number. Please check you seperated your point values by commas and that they are all correct" + "</h2>";
            document.getElementById("nextstep").innerHTML = "";
        }else{
            document.getElementById("final").innerHTML = "<h2>" + "Congrats! You're Earning A:" + "<br>" + "<span id='cur'>" + finalReturn + "</span>" + "%" + "</h2>" + "<br>";
            document.getElementById("nextstep").innerHTML = "<h1>" + "Now to figure out what you need on your final" + "</h1>" + "<br>" + "<input type-='text' id='want' placeholder='Enter the grade you want'>" + "<input type-='text' id='weightFinal' placeholder='Enter your finals weight'>" + "<button onclick='FinalCalc()'>Show Me What I Need</button>";
        }
    }
}

function math(){
    var oops = "oops";
    var totalWeight = 0;
    for(var i = 0; i < rowCount; i++){
        var weight = document.getElementById("weight" + i).value;
        var weight2 = parseInt(weight);
        totalWeight = totalWeight + weight2;
    }
    if(totalWeight != 100){
        return false;
    }
    var Final = 0;
    var tempGrade = 0;
    for(var i = 0; i < rowCount; i++){
        var points = document.getElementById("points" + i).value;
        var points2 = points.split(",");
        tempGrade = 0;
        for(var j = 0; j < points2.length; j++){
            tempGrade += parseInt(points2[j]);
        }
        tempGrade = tempGrade / points2.length;
        var weight3 = document.getElementById("weight" + i).value;
        weight3 = weight3 / 100;
        tempGrade = tempGrade * weight3;
        Final = Final + tempGrade;
    }
    if(Final > 200 || Final < 0){
        return oops;
    }else{
        return Final;
    }
}

function FinalCalc(){
    var curgrade = parseInt(document.getElementById("cur").innerHTML);
    var want = parseInt(document.getElementById("want").value);
    var weightFinal = document.getElementById("weightFinal").value;
    var curWeight = 1 - (weightFinal/100);
    var weightedCurrent = curgrade * curWeight;
    var need = (want - weightedCurrent) / (weightFinal/100);
    if(need > 100){
        document.getElementById("finaloutput").innerHTML = "<br>" + "You need a " + need + "%" + " oh no looks like you need more than 100% on your final, oops better luck next time";
    }else{
        if(need == 100){
            document.getElementById("finaloutput").innerHTML = "<br>" + "You need a " + need + "%" + " Better start studying for that perfect score";
        }else{
            if(need < 100 && need > 90){
                document.getElementById("finaloutput").innerHTML = "<br>" + "You need a " + need + "%" + " Start studying soon";
            }else{
                if(need < 90 && need > 70){
                    document.getElementById("finaloutput").innerHTML = "<br>" + "You need a " + need + "%" + " Very doable with a little effort";
                }else{
                    if(need < 70 && need > 0){
                        document.getElementById("finaloutput").innerHTML = "<br>" + "You need a " + need + "%" + " easy for a smart person like you";
                    }else{
                        if(need < 0){
                            document.getElementById("finaloutput").innerHTML = "<br>" + "You need a " + need + "%" + " its impossible not to get higher than that grade";
                        }
                    }
                }
            }
        }
    }
}