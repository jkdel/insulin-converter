var el = document.querySelectorAll('input');
for (var i=0; i<el.length; i++) {
  el[i].addEventListener("keyup", function(event) {
    if(event.key !== "Enter") return;
    document.querySelector("#convert").click();
    event.preventDefault();
  });
}

var validNumber = new RegExp(/^\d*(\.|,)?\d*$/);
var lastValid = {advia: document.getElementById("advia").value,
                 beckman: document.getElementById("beckman").value,
                 cornell: document.getElementById("cornell").value,
                 mercodia: document.getElementById("mercodia").value,
                 immulite1000: document.getElementById("immulite1000").value};
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

function conv() {
  console.log(lastActive);
  // get all pairs of conversion depending on lastActive
  // check if value within input range (depends on assay)
  // convert to all other assays and write to corresponding to inputs
}
