const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const container = document.querySelector('.container');
const selectMovie = document.getElementById('movie');
const count = document.getElementById('count');
const total = document.getElementById('total');

let ticketPrice = +selectMovie.value; //used + to convert it into number from string

//update count and total
const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    //console.log(selectedSeats); //gives a nodelist

    const selectedSeatsCount = selectedSeats.length;
    //console.log(selectedSeatsCount);

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

    // const updatedTotal = selectedSeatsCount * ticketPrice;
};



//Event listeners

//Movie select event
selectMovie.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    updateSelectedCount();
})

// //Seat click event 
// container.addEventListener('click', e => {
//     if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) 
//     {
//         e.target.classList.toggle('selected');
//     }

//     updateSelectedCount();
// });


//Another way to capture the seat click event:
for (const sit of seats) {

    sit.addEventListener('click', () => {
        sit.classList.toggle('selected'); 
        
        updateSelectedCount();
    });
}

//Have not implemented local storage though it is there in the tutorial