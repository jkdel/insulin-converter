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
  {% for assay in site.data.assays %}
    "{{ assay.id }}": document.getElementById("{{ assay.id }}").value,
  {% endfor %}
};
var lastActive = "";

function validateNumber(elem) {
    if (validNumber.test(elem.value)) {
        lastValid[elem.id] = elem.value;
      {% for assay in site.data.assays %}
        document.getElementById("{{ assay.id }}").style.color = "#999";
      {% endfor %}
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
  {% for assay in site.data.assays %}
    "{{ assay.id }}": {
      {% for formula in assay.formulae %}
        "{{ formula.target }}": function (x) {return {{ formula.pred }}},
      {% endfor %}
    },
  {% endfor %}
};

var convranges = {
  {% for assay in site.data.assays %}
    "{{ assay.id }}": {
      {% for formula in assay.formulae %}
        "{{ formula.target }}": [1, {{ formula.max }}],
      {% endfor %}
    },
  {% endfor %}
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

