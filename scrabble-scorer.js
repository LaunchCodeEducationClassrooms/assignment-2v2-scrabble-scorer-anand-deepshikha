// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");
let word;
const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const simplePointStaructure={
  1: ['A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
};

const vowelBonusPointStructure={
  3: ['A', 'E', 'I', 'O', 'U'],
  1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z']
}
let newPointStructure=transform(oldPointStructure);
newPointStructure[" "]=0;

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
  let points=0;
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      points+=Number(pointValue);
		 }
 
	  }
	}
  return points;
	//return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  
  word=input.question(`Let's play some scrabble! Enter a word:`);
  // let scores=oldScrabbleScorer(word);
 // console.log(`Total Scores:${scores}`);
  //console.log(simpleScabbleScorer(word));
  //console.log(vowelBonusScabbleScorer(word));
};





let simpleScore=function(word)
  {
  word = word.toUpperCase();
	let points=0;
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in simplePointStaructure) {
 
		 if (simplePointStaructure[pointValue].includes(word[i])) {
			    points+=Number(pointValue);
		 }
	  }
	}
  return points;
}
let vowelBonusScore=function(word)
{
  word = word.toUpperCase();
	let points=0;
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in vowelBonusPointStructure) {
		 if (vowelBonusPointStructure[pointValue].includes(word[i])) {
		      points+=Number(pointValue);
		 }
	  }
	}
  return points;
}

let scrabbleScore=function(word)
{
  let points=0;
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in newPointStructure) {
      if(word[i]===pointValue)
 			  points+=Number(newPointStructure[pointValue]);
		 }
 
	  }
  return points;
}

scoringAlgorithm1={
  name: "Simple Score",
  description: "Each letter is worth 1 point",
  scorerFunction: simpleScore
};

scoringAlgorithm2={
  name: "Bonus Vowel",
  description: "Vowels are 3pts, consonants are 1 pt",
  scorerFunction: vowelBonusScore
};

scoringAlgorithm3={
  name: "Scrabble",
  description: "The traditional scoring algorithm",
  scorerFunction: scrabbleScore
};

const scoringAlgorithms = [scoringAlgorithm1,scoringAlgorithm2,scoringAlgorithm3];

function scorerPrompt() {
let choice;
console.log("Which scoring algorithm would you like to use?\n");
console.log("0 - Simple: One point per character");
console.log("1 - Vowel Bonus: Vowels are worth 3 points");
console.log("2 - Scrabble: Uses scrabble point system");
do
{
  choice=input.question(`Enter 0, 1, or 2:`);
}while(choice>3 || choice<0);

console.log(`Algorithm Name: ${scoringAlgorithms[choice].name}`);
console.log(`Score for ${word}: ${scoringAlgorithms[choice].scorerFunction(word)}`);
return scoringAlgorithms[choice];
}

function transform(oldPointStructure) {
let newScore={};
for(let item in oldPointStructure)
{
  for(let i=0;i<oldPointStructure[item].length;i++)
  {
    newScore[oldPointStructure[item][i].toLowerCase()]=item;
    //console.log(item+oldPointStructure[item]);
  }
}
return newScore;
};

//let newPointStructure=transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

