    
const screen = document.getElementById("screen");
function In(obj) {
    var str = screen.value;
    var array = str.split(' ');
    var lastVal = array[array.length - 1];
    var regex = /^([+]|[-]|[x]|[÷])$/g;
    if (str === "0" || str === "Error" || str === "Infinity") {
        str = "";
    }
    if(obj === '.' && lastVal.includes('.')){
        return;
    }
    if (lastVal.match(regex) !== null) {
        screen.value += ` ${obj}`;
    }
    else {
        screen.value = Decimal(str, obj);
    }
}

function Operator(obj) {
    var str = screen.value;
    var array = str.split(' ');
    var lastVal = array[array.length - 1];
    if (obj !== lastVal) {
        if (lastVal === "+" || lastVal === "-" || lastVal === "x" || lastVal === "÷") {
            str = str.slice(0, str.length - 2);
        }
        screen.value = str + ` ${obj}`;
    }
}
function Decimal(str, obj) {
    str += obj;
    var b = str.replace(/[0-9]+/g,",");
    for (let i = 0; i < b.length; i++) {
            if (b[i] === b[i + 1]) {
            str = str.substring(0, str.length -1);
        }      
    }
    return str;
}

function Equal() {
    var a = screen.value;
    var array = a.split(' ');
    var Result = 0;
    Result = array.reduce((Number, Operater, Index) => {
        var Result;
        var NextValue = array[Index + 1];
        switch (Operater) {
            case "x":
                Result = +Number * +NextValue;
                return Result;
                break;
            case "÷":
                Result = +Number / +NextValue;
                return Result;
                break;
            case "+":
                Result = +Number + +NextValue;
                return Result;
                break;
            case "-":
                Result = +Number - +NextValue;
                return Result;
                break;        
            default:
                return Number;
                break;
        }
        return Number + Operator;
    })
    if (isNaN(Result)) {
        return screen.value = "Error";
    }
    else {
        screen.value = Math.round(Result * 1000) / 1000;
    }
}
function Check(){}
function Clear() {
    var a = document.getElementById("screen");
    a.value = 0;
}

function ClearOne(){
    var str = screen.value;
    var a = str.split('');
    var lastVal = a[a.length - 1];    
    console.log(str);
    if(lastVal === str ){         
       str = 0;
       console.log(str)
    }
    else {
        if(lastVal === " "){
            str = str.slice(0,str.length - 3);
        }
        else if(lastVal === "+" || lastVal === "-" || lastVal === "x" || lastVal === "÷"){
                str = str.slice(0,str.length - 2);
        }
        else{
            str = str.slice(0,str.length - 1);
        }
    }
    screen.value = str;
}