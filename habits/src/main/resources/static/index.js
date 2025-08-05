const habits = [{title : "Gym" , description : "Every day"}];


const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let progress= 0;
const gridData= {};
const tracking= {};
let habitToEditIndex = null;
let habitToDeleteIndex = null;

//GET all habits
function loadHabits(){
    fetch("http://localhost:8080/api/habits")
        .then(response => response.json())
        .then(data =>{
            habits.push(...data);
            buildGrid();
            updateProgress();
            updateSidebar();
        })
        .catch(error =>{
            alert("Error loading habits:", error);
        });
}


function updateGreeting() {
    const greetingDiv = document.getElementById("greeting");
    const username = localStorage.getItem("loggedInUser");
    if (username) {
        greetingDiv.textContent = `Welcome, ${username}`;
        greetingDiv.style.display = "inline-block";
    } else {
        greetingDiv.textContent = "";
        greetingDiv.style.display = "none";
    }
}

window.onload = function() {
    loadHabits();   
    updateGreeting();
};

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
        const labelWrapper= document.createElement("div");
        labelWrapper.className= "habit-label habit-label-with-delete";
        
        const label= document.createElement("span");
        label.textContent= habit.title;

        const deleteBtn= document.createElement("button");
        deleteBtn.textContent= "🗑️";
        deleteBtn.className= "delete-habit-button";
        deleteBtn.title= "Delete Habit";
        deleteBtn.addEventListener("click", (e)=>{
            e.stopPropagation();
            deleteHabit(habitIndex);
        });


        const editBtn= document.createElement("button");
        editBtn.innerHTML= "✏️";
        editBtn.className= "edit-habit-button";
        editBtn.title= "Edit Habit";
        editBtn.addEventListener("click", (e)=>{
            e.stopPropagation();
            updateHabit(habitIndex);
            
        });


        labelWrapper.appendChild(label);
        labelWrapper.appendChild(editBtn);
        labelWrapper.appendChild(deleteBtn);
        grid.appendChild(labelWrapper);


        for(let i=0; i<7; i++){
            const key= `${habit.id} - ${i}`;
            const cell= document.createElement("div");
            cell.className= "grid-cell";
            cell.dataset.habitId= habit.id;
            cell.dataset.dayIndex= i;

            if (gridData[key]) {
                cell.classList.add("completed");
            }

            cell.addEventListener("click" , ()=> toggleCell(cell, habit, key));
            grid.append(cell);
        }

    });


    // days.forEach((day, dayIndex) =>{
    //     const label= document.createElement("div");
    //     label.className= "habit-label";
    //     label.textContent= day.name;

    //     grid.append(label);
    // })
}


function toggleCell(cell, habit, key){
    gridData[key] = !gridData[key];
    cell.classList.toggle("completed", gridData[key]);

    updateProgress();
    updateSidebar();

}


function deleteHabit(index){
    habitToDeleteIndex = index;
    document.getElementById("deleteConfirmModal").style.display = "block";
}


//DELETE habit
document.getElementById("confirmDeleteBtn").addEventListener("click", async function() {
    const habit= habits[habitToDeleteIndex];
    const id= habit.id;

    try {
        const response= await fetch(`http://localhost:8080/api/habits/${id}`, {
            method: "DELETE"
        });

        if(response.ok){
            habits.splice(habitToDeleteIndex, 1);

            // Clean up gridData for deleted habit
            Object.keys(gridData).forEach(key => {
                if (key.startsWith(`${id}-`)) {
                    delete gridData[key];
                }
            });

            buildGrid();
            updateProgress();
            updateSidebar();
        }else{
            alert("Failed to delete habit");
        }
    } catch (error) {
        console.error("Error deleting habit:", error);
        alert("Error deleting habit");
    }
    document.getElementById("deleteConfirmModal").style.display = "none";
});


document.getElementById("cancelDeleteBtn").addEventListener("click", function() {
    document.getElementById("deleteConfirmModal").style.display = "none";
});


function updateHabit(index){
    habitToEditIndex= index;
    const habit= habits[index];

    document.getElementById("editHabitName").value = habit.title;
    document.getElementById("editHabitDesc").value = habit.description || "";
    document.getElementById("editHabitModal").style.display = "block";
}


function updateProgress(){
    const total= habits.length * 7;
    const completed= Object.values(gridData).filter(v => v).length;
    progress= Math.floor((completed / total) * 100);

    document.getElementById("progress-fill").style.width= `${progress}%`;
    document.getElementById("summary-text").textContent = `${progress}% achieved`;

}


//PUT UPDATE habit
document.getElementById("editHabitForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("editHabitName").value.trim();
    const description = document.getElementById("editHabitDesc").value.trim();

    if (!name || !description) return;

    const habit = habits[habitToEditIndex];

    try {
        const response= await fetch(`http://localhost:8080/api/habits/${habit.id}`,{
            method: "PUT",
            headers:{
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title: name,
                description: description
            })
        });


        if(response.ok){
            const updateHabit= await response.json();
            habits[habitToEditIndex]= updateHabit;

            buildGrid();
            updateProgress();
            updateSidebar();
        }else{
            alert("Failed to update habit");
        }
    } catch (error) {
        alert("Error while updating habit.");
    }

    document.getElementById("editHabitModal").style.display = "none";

});

document.getElementById("cancelEditHabit").addEventListener("click", function() {
    document.getElementById("editHabitModal").style.display = "none";
});



function updateSidebar(){
    const cardList= document.getElementById("habitCardList");
    cardList.innerHTML= "";

    for(let i=0; i<habits.length; i++){
        const habit= habits[i];
        const key= `${i}-1`;

        const card= document.createElement("div");
        card.className= "habit-card";
        card.innerHTML=`
            <strong>${habit.title}</strong><br>
            Status: ${"✅ Completed" + "❌ Incomplete" }
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

document.querySelector(".login-account-button").addEventListener("click", ()=>{
    document.getElementById("loginAccountModal").style.display= "flex";
});

document.getElementById("closeModal").addEventListener("click", ()=>{
    document.getElementById("habitModal").style.display= "none";
});
document.getElementById("accountCloseModal").addEventListener("click", ()=>{
    document.getElementById("accountModal").style.display= "none";
});

document.getElementById("loginAccountCloseModal").addEventListener("click", ()=>{
    document.getElementById("loginAccountModal").style.display= "none";
});



//POST Create/Add new Habit
document.getElementById("habitForm").addEventListener("submit", function(e){

    e.preventDefault();

    const title= document.getElementById("habitName").value.trim();
    const description= document.getElementById("habitDesc").value.trim();

    if(!title || !description) return;

    const habitData= {title, description};

    fetch("http://localhost:8080/api/habits",{
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },

        body: JSON.stringify(habitData)
    })
    .then(response =>{
        if(!response.ok){
            throw new Error("Failed to save habit");
        }
        return response.json();
    })
    .then(data =>{
        console.log("Habit saved:", data);
        habits.push(data);

        this.reset();
        document.getElementById("habitModal").style.display= "none";


        buildGrid();
        updateProgress();
        updateSidebar();
    })
    .catch(error =>{
        console.error("Error saving habit:" , error);
        alert("Failed to save habit");
    });

});


//POST Create new Account (signup)
document.getElementById("accountForm").addEventListener("submit", function(e){
    e.preventDefault();
    const username= document.getElementById("username").value.trim();
    const password= document.getElementById("password").value.trim();

    if(!username || !password) return;

    const userData= {username , password};


    fetch("http://localhost:8080/api/auth/signup",{
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },

        body: JSON.stringify(userData)
    })
    .then(response =>{
        if(!response.ok){
            throw new Error("Failed to create new account");
        }
        return response.text();
    })
    .then(message =>{
        console.log("User saved:", message);
        alert("Account created successfully");

        localStorage.setItem("loggedInUser", username);

        this.reset();
        document.getElementById("accountModal").style.display= "none";

        updateGreeting();

        buildGrid();
        updateProgress();
        updateSidebar();
    })
    .catch(error =>{
        console.error("Error saving habit:" , error);
        alert("Failed to save habit");
    });
});




//POST Login Account(signin)
document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();
    const username= document.getElementById("username").value.trim();
    const password= document.getElementById("password").value.trim();

    if(!username || !password) return;

    const userData= {username , password};


    fetch("http://localhost:8080/api/auth/signin",{
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },

        body: JSON.stringify(userData)
    })
    .then(response =>{
        if(!response.ok){
            throw new Error("Failed to login user");
        }
        return response.text();
    })
    .then(message =>{
        console.log("User logged in successfully:", message);

        localStorage.setItem("loggedInUser", username);
        
        this.reset();
        document.getElementById("loginAccountModal").style.display= "none";

        updateGreeting();

        buildGrid();
        updateProgress();
        updateSidebar();
    })
    .catch(error =>{
        console.error("Error signing user:" , error);
        alert("Failed to signin");
    });
});

