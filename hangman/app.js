const wrong_letters = document.getElementById("wrong-letters");
const word = document.getElementById("word");
const popup = document.getElementById("popup-container");
const final_msg = document.getElementById("final-msg");
const playBtn = document.getElementById("play-button");
const notificationCont = document.getElementById("notification-container");

const figureParts = document.querySelectorAll(".figure-part");

const words = ['apple', 'banana', 'guava', 'pineapple'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

// console.log(selectedWord);

const correctLetters = [];

const wrongLetters = [];

//Show hidden word
const displayWord = () => {
    word.innerHTML = `
    ${selectedWord
    .split('') //split() converts the selectedWord string to array in order to be able to use map function on it
    .map(
        letter => 
        `<span class="letter">
        ${correctLetters.includes(letter) ? letter : ''} 
        </span>` 
    ) 
    .join('')}`;  // ternary operator - if letter is there in correctLetters array then return letter else return an empty string
    
    // join() converts it back into a string from array

    const innerWord = word.innerText.replace(/[ \n]/g, ''); //removing the new line character

    if(innerWord == selectedWord) {
        final_msg.innerText = 'Congratulations! You Won';
        popup.style.display = 'flex';
    }

    // console.log(word.innerText, innerWord);
}


//Update wrong letters - 3 things to be done inside it
const updateWrongLetters = () => {
    // Display wrong letters
	wrong_letters.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

//Display parts

figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if(index < errors) {
        part.style.display = 'block';
    } else {
        part.style.display = 'none';
    }
});

//Check if lost

if(wrongLetters.length === figureParts.length) {
    final_msg.innerText = 'You lost!';
    popup.style.display = 'flex';
}

}

//Show notification
const showNotification = () => {
    notificationCont.classList.add('show');

    setTimeout(() => {
        notificationCont.classList.remove('show')
    }, 2000);
}


//Keydown letter press
window.addEventListener('keydown', e => {
    // console.log(e.keyCode);
    if(e.keyCode >=65 &&  e.keyCode <=90) 
    {
        const letter = e.key;

        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification(); 
            }
        } else {
                if(!wrongLetters.includes(letter)) {
                    wrongLetters.push(letter);
                    updateWrongLetters();
                } else {
                    showNotification(); 
                }
            }
        }
    }
);


//Restart game

playBtn.addEventListener('click', () => {
    //Empty the correct and wrong arrays
    correctLetters.splice(0); 
    wrongLetters.splice(0); 

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLetters();

    popup.style.display = 'none';
})



displayWord();