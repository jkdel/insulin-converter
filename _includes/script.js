var el = document.querySelectorAll('input');
for (var i = 0; i < el.length; i++) {
    el[i].addEventListener("keyup", function (event) {
        if (event.key !== "Enter") return;
        document.querySelector("#convert").click();
        event.preventDefault();
    });
}

var validNumber = new RegExp(/^\d*(\.|,)?\d*$/);
var lastValid = {
    "advia": document.getElementById("advia").value,
    "beckman": document.getElementById("beckman").value,
    "cornell": document.getElementById("cornell").value,
    "mercodia": document.getElementById("mercodia").value,
    "immulite1000": document.getElementById("immulite1000").value
};
var lastActive = "";

function validateNumber(elem) {
    if (validNumber.test(elem.value)) {
        lastValid[elem.id] = elem.value;
        document.getElementById("advia").style.color = "#999";
        document.getElementById("beckman").style.color = "#999";
        document.getElementById("cornell").style.color = "#999";
        document.getElementById("mercodia").style.color = "#999";
        document.getElementById("immulite1000").style.color = "#999";
        document.getElementById(elem.id).style.color = "#000";
        lastActive = elem.id;
    } else {
        elem.value = lastValid[elem.id];
    }
}

var rmText = new RegExp(/N\/A|Out of range|< LOQ/);
function removeText(elem) {
    if (rmText.test(elem.value)) {
        elem.value = "";
    }
}

var convfuns = {
    "advia": {
        "beckman": function (x) {return null},
        "cornell": function (x) {return null},
        "mercodia": function (x) {return 2.66362+3.0048*x},
        "immulite1000": function (x) {return -15.22353+2.96904*x}
    },
    "beckman": {
        "advia": function (x) {return null},
        "cornell": function (x) {return null},
        "mercodia": function (x) {return -4.72917+0.54074*x},
        "immulite1000": function (x) {return 4.39105+0.16639*x}
    },
    "cornell": {
        "advia": function (x) {return null},
        "beckman": function (x) {return null},
        "mercodia": function (x) {return -0.21056+0.29988*x+0.01877*Math.pow(x,2)},
        "immulite1000": function (x) {return 4.7403-0.17753*x+0.01029*Math.pow(x,2)}
    },
    "mercodia": {
        "advia": function (x) {return 2.08757+0.28026*x},
        "beckman": function (x) {return 14.65172+1.76144*x},
        "cornell": function (x) {return 15.37257+0.46423*x-0.00035*Math.pow(x,2)},
        "immulite1000": function (x) {return 8.79184+0.34718*x}
    },
    "immulite1000": {
        "advia": function (x) {return 5.94859+0.3151*x},
        "beckman": function (x) {return 16.8987+4.69321*x},
        "cornell": function (x) {return 16.57309+1.03986*x-0.00161*Math.pow(x,2)},
        "mercodia": function (x) {return 5.88014+2.02806*x}
    }
};

var convranges = {
    "advia": {
        "beckman": [-1, -1],
        "cornell": [-1, -1],
        "mercodia": [1, 153],
        "immulite1000": [1, 82]
    },
    "beckman": {
        "advia": [-1, -1],
        "cornell": [-1, -1],
        "mercodia": [1, 1098],
        "immulite1000": [1, 1098]
    },
    "cornell": {
        "advia": [-1, -1],
        "beckman": [-1, -1],
        "mercodia": [1, 183],
        "immulite1000": [1, 183]
    },
    "mercodia": {
        "advia": [1, 531],
        "beckman": [1, 560],
        "cornell": [1, 654],
        "immulite1000": [1, 654]
    },
    "immulite1000": {
        "advia": [1, 247],
        "beckman": [1, 214],
        "cornell": [1, 402],
        "mercodia": [1, 247]
    }
};

function conv() {
    var x = parseFloat(document.getElementById(lastActive).value.replace(",", "."));
    var funs = convfuns[lastActive];
    Object.getOwnPropertyNames(funs).forEach(function (val, idx, array) {
        var nval = funs[val](x);
        if (nval === null) {
            document.getElementById(val).value = "N/A";
        } else {
            if (x < convranges[lastActive][val][0] || x > convranges[lastActive][val][1]) {
                document.getElementById(val).value = "Out of range";
            } else {
                if (nval < 0) {
                    document.getElementById(val).value = "< LOQ";
                } else {
                    document.getElementById(val).value = Math.round(nval);
                    document.getElementById(val).style.color = "green";
                }
            }
        }
    });
}

