
let heightDiff = (document.body.scrollHeight);
// 4 equals comments div, 1 equals margin on how id and 3 is just space
let newHeight = parseInt((heightDiff / 16) + 5 + 3);	
let updatedHeight = newHeight + "rem";
document.getElementById("brickWall").style.height = updatedHeight;
