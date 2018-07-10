var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var anchor = document.createElement("a");
  var txt = document.createTextNode("\u00D7");
  anchor.className = "closeClass";
  anchor.appendChild(txt);
  myNodelist[i].appendChild(anchor);
}
var close = document.getElementsByClassName("closeClass");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement.parentElement;
    div.style.display = "none";
  }
}
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

function makeRadioButton(name, value, text) {
  var label = document.createElement("label");
  var radio = document.createElement("input");
  radio.type = "radio";
  radio.name = name;
  radio.value = value;

  label.appendChild(radio);

  label.appendChild(document.createTextNode(text));
  return label;
}
function newHardSkillElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("hardSkillInput").value;
  var t = document.createTextNode(inputValue);
  var div1,div2,div3;
  li.id = "listItem";
  div1 = document.createElement("div");
  div1.className = "col-md-6";
  div1.style.display = "inline";
  div1.style.position = "relative";
  div1.id = "div1";  
  div2 = document.createElement("div");
  div2.className = "col-md-1";
  div2.style.display = "inline";
  div3 = document.createElement("div");
  div3.className = "col-md-5";
  div3.style.display = "inline";
  if (inputValue === '') {
    alert("Skill can't be empty!");
  } else {
    document.getElementById("hardSkillList").appendChild(li);
  }
  document.getElementById("hardSkillInput").value = "";

  var anchor = document.createElement("a");
  var txt = document.createTextNode("\u00D7");
  anchor.appendChild(txt);
  anchor.className = "closeClass";
  anchor.href = "#";
  div1.appendChild(t);
  div2.appendChild(anchor);
  div3.appendChild(makeRadioButton("radioButton","High","High"));
  div3.appendChild(makeRadioButton("radioButton","Medium","Medium"));
  div3.appendChild(makeRadioButton("radioButton","Low","Low"));

  li.appendChild(div1);
  li.appendChild(div2);
  li.appendChild(div3);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement.parentElement;
      div.style.display = "none";
    }
  }
}
function newSoftSkillElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("softSkillInput").value;
  var t = document.createTextNode(inputValue);
  var div1,div2,div3;
  li.id = "listItem";
  div1 = document.createElement("div");
  div1.className = "col-md-4";
  div1.style.display = "inline";
  div1.style.width = "100%";
  div2 = document.createElement("div");
  div2.className = "col-md-1";
  div2.style.display = "inline";
  div3 = document.createElement("div");
  div3.className = "col-md-7";
  div3.style.display = "inline";
  if (inputValue === '') {
    alert("Skill can't be empty!");
  } else {
    document.getElementById("softSkillList").appendChild(li);
  }
  document.getElementById("softSkillInput").value = "";

  var anchor = document.createElement("a");
  var txt = document.createTextNode("\u00D7");
  anchor.appendChild(txt);
  anchor.className = "closeClass";
  anchor.href = "#";
  div1.appendChild(t);
  div2.appendChild(anchor);
  div3.appendChild(makeRadioButton("radioButton","High","High"));
  div3.appendChild(makeRadioButton("radioButton","Medium","Medium"));
  div3.appendChild(makeRadioButton("radioButton","Low","Low"));

  li.appendChild(div1);
  li.appendChild(div2);
  li.appendChild(div3);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement.parentElement;
      div.style.display = "none";
    }
  }
}