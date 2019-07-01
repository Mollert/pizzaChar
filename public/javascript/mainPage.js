
// Here I am setting the height of the brick wall to be responsive
let heightDiff = (document.body.scrollHeight);
// 4 equals comments div, 1 equals margin on how id and 3 is just space
let newHeight = parseInt((heightDiff / 16) + 5 + 3);	
let updatedHeight = newHeight + "rem";
document.getElementById("brickWall").style.height = updatedHeight;

// The following code dives the pizza slices to move
// Need a random number from 1 to 8
const randomN = () => Math.floor((Math.random() * 8) + 1)
// Array lists the pizza slice (one through eight) and the coordinates they are traveling to (at 30 deg increments)
const numTrav = [["one", 6.6, -16], ["two", 16, -6.6], ["three", 16, 6.6], ["four", 6.6, 16], ["five", -6.6, 16], ["six", -16, 6.6], ["seven", -16, -6.6], ["eight", -6.6, -16]];		
let randomGroup = [];

// Function creates array of 5 random non-duplicate numbers
const getGroup = () => {
	randomGroup = [];
	randomGroup.push(randomN());					
	while (randomGroup.length < 5) {
		let carrier = randomN();
		let flag = true;
		randomGroup.forEach(function(num) {
			if (carrier === num ) {
				flag = false;
			}
		});
		if (flag) {
			randomGroup.push(carrier);
		}
	};
	return randomGroup
};


let u = 0;
// First each piece is moved at a pace of 1 sec.  Then showing whole pizza after a pause and then starting again after 10 sec
const moveSlices = () => {
	getGroup();
	let p = 0;
	const eachSlice = () => {
		let whichOne = numTrav[randomGroup[p]-1][0];	
		let theX = numTrav[randomGroup[p]-1][1];
		let theY = numTrav[randomGroup[p]-1][2];
		let cssString = "animation-name: mover; --movingX: " + theX + "rem; --movingY: " + theY + "rem;";
		document.getElementById(whichOne).style.cssText = cssString;
		p++;
		if (p < 5) {
			setTimeout( eachSlice, 1000 );
		}
	};
	eachSlice();

	setTimeout(function() {
		for (let i = 0 ; i < randomGroup.length ; i++) {
			let whichOne = numTrav[randomGroup[i]-1][0];					
			document.getElementById(whichOne).style.cssText = "animation-name: seeThem;";
		}
	}, 8000);

	u++;
	if (u < 10) {
		setTimeout( moveSlices, 10000 );
	}
};

moveSlices();