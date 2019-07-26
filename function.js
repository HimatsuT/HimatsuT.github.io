const screen = document.getElementById("screen");
let result = "";

function In(obj) {
    var str = screen.value;
    var array = str.split(' ');
    var lastVal = array[array.length - 1];
    var regex = /^([+]|[x]|[÷])$/g;
    if (str === "0" || str === "Error" || str === "Infinity" || result !== "") {
        str = "";
        result = "";
    }
    if (obj === '.' && lastVal.includes('.')) {
        return;
    }
    if (lastVal.match(regex) !== null) {
        screen.value += ` ${obj}`;
    }
    else {
        screen.value = Decimal(str, obj);
    }
    screen.scrollLeft = screen.scrollWidth;
}
function Operator(obj) {
    var str = screen.value;
    var array = str.split(' ');
    var lastVal = array[array.length - 1];
    if (obj !== lastVal) {
        if (lastVal === "+" || lastVal === "x" || lastVal === "÷") {
            str = str.slice(0, str.length - 2);
        }
        screen.value = str + ` ${obj}`;
    }
    screen.scrollLeft = screen.scrollWidth;
}
function CheckDecimal(obj) {
    var str = screen.value;
    var array = str.split(' ');
    var lastVal = array[array.length - 1];
    if (lastVal != "-") {
        if (lastVal == "+" || lastVal == "x" || lastVal == "÷") {
            screen.value = str + ` ${obj}`;
        }
        else {
            screen.value = str + ` ${obj} `;
        }
    }
    screen.scrollLeft = screen.scrollWidth;
}
function Decimal(str, obj) {
    str += obj;
    var b = str.replace(/[0-9]+/g, ",");
    for (let i = 0; i < b.length; i++) {
        if (b[i] === b[i + 1]) {
            str = str.substring(0, str.length - 1);
        }
    }
    return str;
}

function Equal() {
    var a = screen.value;
    var array = a.split(' ');
    function bodmasNeeded(arr) {
        if ((arr.indexOf('x') !== -1 || arr.indexOf('÷') !== -1) &&
            (arr.indexOf('+') !== -1 || arr.indexOf('-') !== -1)) {
            return true;
        }
        return false;
    }
    function orderOperations(arr) {
        const cleanedArr = arr.map(function (value) { return value; });

        for (let i = 0; i < cleanedArr.length; i += 1) {
            let newVal;
            let cleanedVal;

            if (!bodmasNeeded(cleanedArr)) {
                return cleanedArr;
            }

            const val = cleanedArr[i];

            if (i % 2 !== 0 && (val === 'x' || val === '÷')) {
                switch (val) {
                    case 'x':
                        newVal = +cleanedArr[i - 1] * +cleanedArr[i + 1];
                        cleanedVal = newVal;
                        cleanedArr.splice(i - 1, 3, cleanedVal);
                        break;
                    case '÷':
                        newVal = +cleanedArr[i - 1] / +cleanedArr[i + 1];
                        cleanedVal = newVal;
                        cleanedArr.splice(i - 1, 3, cleanedVal);
                        break;
                    default: screen.value = 'Error';
                }

                i = -1;
            }
        }

        return cleanedArr;
    }
    if (bodmasNeeded(array)) {
        array = orderOperations(array);
    }
    var Result = 0;
    Result = array.reduce((Number, Operater, Index) => {
        var Result;
        var NextValue = array[Index + 1];
        let cleanedVal;
        switch (Operater) {
            case "x":
                Result = +Number * +NextValue;
                cleanedVal = Result;
                return cleanedVal;
                // return Result;
                break;
            case "÷":
                Result = +Number / +NextValue;
                cleanedVal = Result;
                return cleanedVal;
                // return Result;
                break;
            case "+":
                Result = +Number + +NextValue;
                cleanedVal = Result;
                return cleanedVal;
                // return Result;
                break;
            case "-":
                Result = +Number - +NextValue;
                cleanedVal = Result;
                return cleanedVal;
                // return Result;
                break;
            default:
                return Number;
                break;
        }
        return Number + Operater;
    })
    if (isNaN(Result)) {
        return screen.value = "Error";
    }
    else {
        screen.value = Math.round(Result * 1000) / 1000;
        result = 1;
    }
}
function Clear() {
    var a = document.getElementById("screen");
    a.value = 0;
}

function ClearOne() {
    var str = screen.value;
    var a = str.split('');
    var lastVal = a[a.length - 1];
    if (lastVal === str || str == "Error") {
        str = 0;
        console.log(str)
    }
    else {
        if (lastVal === " ") {
            str = str.slice(0, str.length - 3);
        }
        else if (lastVal === "+" || lastVal === "-" || lastVal === "x" || lastVal === "÷") {
            str = str.slice(0, str.length - 2);
        }
        else {
            str = str.slice(0, str.length - 1);
        }
    }
    screen.value = str;
}

var myVar;

function myFunction() {
    myVar = setTimeout(showPage, 800);
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}