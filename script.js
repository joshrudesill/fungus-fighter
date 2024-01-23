// State Variables can be declared outside of the onReady
// Feel free to make this to what you want!
// Example:
let fungusHP = 100;
let myAP = 100;
let attacks = {
  as: { cost: 12, dmg: 14 },
  e: { cost: 23, dmg: 9 },
  db: { cost: 38, dmg: 47 },
  sf: { cost: 33, dmg: 25 },
};
let interval;
function onReady() {
  console.log("Ready to go!");

  // Make sure you check the index.html file!
  // There are lots of buttons and things ready for you to hook into here!

  // 🧠 Remember
  // - Handle events that ->
  // - Updates state which is ->
  // - Rendered to the DOM
  document.querySelector(".ap-text").innerText = `${myAP} AP`;
  document.querySelector(".hp-text").innerText = `${fungusHP} HP`;
  document.querySelector("#ap-meter").value = myAP;
  document.querySelector("#hp-meter").value = fungusHP;
}

onReady();

function attack(event, type) {
  if (myAP - attacks[type].cost <= 0) {
    myAP = 0;
    document.querySelector(".freaky-fungus").classList.replace("walk", "jump");
    document
      .querySelectorAll(".attack-btn")
      .forEach((b) => (b.disabled = true));
  } else {
    myAP -= attacks[type].cost;
    fungusHP -= attacks[type].dmg;
  }

  if (fungusHP <= 0) {
    fungusHP = 0;
    document.querySelector(".freaky-fungus").classList.replace("walk", "dead");
    clearInterval(interval);
  }

  if (fungusHP < 50) {
    if (!interval) {
      interval = setInterval(() => {
        fungusHP++;
        if (fungusHP >= 50) {
          clearInterval(interval);
        }
        render();
      }, 1000);
    }
  }

  render();
}
function render() {
  document.querySelector(".ap-text").innerText = `${myAP} AP`;
  document.querySelector(".hp-text").innerText = `${fungusHP} HP`;
  document.querySelector("#ap-meter").value = myAP;
  document.querySelector("#hp-meter").value = fungusHP;
}
