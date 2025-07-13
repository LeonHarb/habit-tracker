const habits = [
  { name: "Exercise", color: "#2196F3" },
  { name: "Journal", color: "#9C27B0" },
  { name: "Alcohol", color: "#E91E63" },
  { name: "Cold Shower", color: "#03A9F4" },
  { name: "Floss", color: "#4CAF50" },
  { name: "Meditate", color: "#FF9800" },
  { name: "eBook", color: "#00BCD4" }
];


const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let progress= 0;
const gridData= {};
const tracking= {};

function buildGrid(){

    const grid= document.getElementById("habit-grid");
    grid.innerHTML= "";

    const emptyCell= document.createElement("div");
    emptyCell.className= "habit-label";
    grid.append(emptyCell);

    days.forEach(day =>{
        const dayLaybel= document.createElement("div");
        dayLaybel.className= "habit-label";
        dayLaybel.textContent= day;
        grid.append(dayLaybel);
    });


    habits.forEach((habit , habitIndex) =>{
        const label= document.createElement("div");
        label.className= "habit-label";
        label.textContent= habit.name;
        grid.append(label);

        


        for(let i=0; i<7; i++){
            const key= `${habitIndex} - ${i}`;
            const cell= document.createElement("div");
            cell.className= "grid-cell";
            cell.dataset.habitIndex= habitIndex;
            cell.dataset.dayIndex= i;

            cell.addEventListener("click" , ()=> toggleCell(cell, habit, key));
            grid.append(cell);
        }
    });


    days.forEach((day, dayIndex) =>{
        const label= document.createElement("div");
        label.className= "habit-label";
        label.textContent= day.name;

        grid.append(label);
    })


    

}


function toggleCell(cell, habit, key){
    gridData[key] = !gridData[key];
    cell.classList.toggle("completed", gridData[key]);

    updateProgress();
    updateSidebar();

}



function updateProgress(){
    const total= habits.length * 7;
    const completed= Object.values(gridData).filter(v => v).length;
    progress= Math.floor((completed / total) * 100);

    document.getElementById("progress-fill").style.width= `${progress}%`;
    document.getElementById("summary-text").textContent = `${progress}% achieved`;

}



function updateSidebar(){
    const cardList= document.getElementById("habitCardList");
    cardList.innerHTML= "";

    for(let i=0; i<habits.length; i++){
        const habit= habits[i];
        const key= `${i}-1`;
        const completed= !!gridData[key];

        const card= document.createElement("div");
        card.className= "habit-card";
        card.innerHTML=`
            <strong>${habit.name}</strong><br>
            Status: ${completed ? "✅ Completed" : "❌ Incomplete" }
        `;

        cardList.append(card);
    }
}


buildGrid();
updateProgress();
updateSidebar();



document.querySelector(".add-habit").addEventListener("click", ()=>{
    document.getElementById("habitModal").style.display= "flex";
});


document.querySelector(".create-account-button").addEventListener("click", ()=>{
    document.getElementById("accountModal").style.display= "flex";
});

document.getElementById("closeModal").addEventListener("click", ()=>{
    document.getElementById("habitModal").style.display= "none";
});
document.getElementById("accountCloseModal").addEventListener("click", ()=>{
    document.getElementById("accountModal").style.display= "none";
});


document.getElementById("habitForm").addEventListener("submit", function(e){

    e.preventDefault();

    const name= document.getElementById("habitName").value.trim();


    if(!name) return;

    habits.push({name});

    this.reset();
    document.getElementById("habitModal").style.display= "none";

    buildGrid();
    updateProgress();
    updateSidebar();

});



document.addEventListener('DOMContentLoaded', ()=>{

    const dayBtn= document.querySelectorAll('.day-button');
    const presetBtn= document.querySelectorAll('.preset-button');

    dayBtn.forEach(button =>{
        button.addEventListener("click", ()=>{
            button.classList.toggle('selected');


            if(button.classList.contains('selected')){
                presetBtn.forEach(presetButton =>{
                    presetButton.classList.remove('selected');
                });
            }
        });
    });


    presetBtn.forEach(button =>{
        button.addEventListener("click", ()=>{
            dayBtn.forEach(dayButton =>{
                dayButton.classList.remove('selected');
            });


            presetBtn.forEach(presetButton =>{
                presetButton.classList.remove('selected');
            });

            button.classList.add('selected');

            if(button.dataset.preset === 'weekdays'){
                dayBtn.forEach(dayBtn =>{
                    const day= dayBtn.dataset.day;

                    if(['mon', 'tue', 'wed', 'thu', 'fri'].includes(day)){
                        dayBtn.classList.add('selected');
                    }
                });
            }else if(button.dataset.preset === 'everyday'){
                dayBtn.forEach(dayButton =>{
                    dayButton.classList.add('selected');
                });
            }



        });
    });


    habitForm.addEventListener('submit', (e)=>{
        e.preventDefault();

        const habitName= document.getElementById('habitName').value;
        const selectedDays= [];

        dayBtn.forEach(button =>{
            if(button.classList.contains('selected')){
                selectedDays.push(button.dataset.day);
            }
        });

        console.log('Habit Name:', habitName);
        console.log('Selected Days:', selectedDays);

        // Here you would typically send this data to a server or store it locally



        habitModal.style.display = 'none';
        habitForm.reset();
        dayBtn.forEach(btn => btn.classList.remove('selected'));
        presetBtn.forEach(btn => btn.classList.remove('selected'));
    });

});



accountForm.addEventListener('submit', (e)=>{
        e.preventDefault();

        const username= document.getElementById('username').value;
        const password= document.getElementById('password').value;

        console.log('Username:', username);
        console.log('Pass:', password);


        accountForm.reset();

        
});