const searchVal = document.querySelector("#srch");
const searchbtn = document.querySelector("#srch-img");
const recpieContainer = document.querySelector("#recepie-container");
const close = document.querySelector(".close-btn");

//API call
 var called = 0;


    
        searchVal.addEventListener('focus',()=>{
            if(called)
                {
                    called = 1;
                    location.reload();
                }
            
        })
    

async function recepie()
{
    //console.log("clicked");
    let q = searchVal.value;
    called = 1;

    try{
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`);
        const data = await response.json();

        fetchRecepie(data);
        console.log(data);
    }
    catch(e){
        console.log("Api call faliled", e);
    }
}

if(searchbtn)
{
    console.log("clicked");
    searchbtn.addEventListener("click", recepie)
}
else{
    console.log("not clicked");
}


function fetchRecepie(data)
{
    data.meals.forEach((element) => {
        let newRecepie = document.createElement("div");
        newRecepie.classList.add("recepie-card");
        newRecepie.innerHTML=
        `
        <img src = "${element.strMealThumb}">
        <h1>${element.strMeal}
        <h3>Category: ${element.strCategory}
        <h6>Country: ${element.strArea}</h6>
        
        `;

        let btn = document.createElement("button")
        btn.innerText = "Recepie";
        recpieContainer.appendChild(newRecepie);
        newRecepie.appendChild(btn);

        
        btn.addEventListener('click', (event)=>{
            openRecepieModal(element);
        });
    });
   
}

function fetchItems(element)
{
    let Ingredients = "";
    for(let i=1; i<=20; i++)
    {
        const newIngredients = element[`strIngredient${i}`];
        if(newIngredients)
        {
            const measure = element[`strMeasure${i}`];
            Ingredients = Ingredients + `<li>${measure}  ${newIngredients}</li>`;
        }
        else{
            break;
        }
    }
    return Ingredients;
}

function openRecepieModal(element)
{
    const modal = document.querySelector("#recepie-modal");
    modal.classList.remove("rec-modal");
    
    modal.classList.add("active");
    
    recpieContainer.classList.add("blur");


    console.log("clicked");
    console.log(element.strMeal);
    let details = document.createElement("div");
    details.innerHTML = `<h2>${element.strMeal}</h2>
    <h3>Ingredients</h3>
    <ul type="cirle">${fetchItems(element)}</ul>
    <h3>Instructions</h3>
    <p>${element.strInstructions}</p>
`
   
    
    

    modal.appendChild(details);


    close.addEventListener('click', ()=>
        {
            console.log("closed");
            modal.classList.remove("active");
            modal.classList.add("rec-modal");
            details.innerHTML = "";
           recpieContainer.classList.remove("blur");
    
        })
}


//responsiveness navbar



const navbarRes = document.getElementById('nav-items-res');
const navbar = document.getElementById('nav-items');
const naviconDiv = document.getElementById('nav-items');
const navbtn = document.getElementById('nav-btn')
let c = null;

navbtn.addEventListener('click', openNavbar);

function openNavbar()
{
    console.log("clicked");
    if(!c)
        {
            c = document.createElement('i');
            c.classList.add("fa-xmark");
            c.classList.add("fa-solid");
            navbarRes.prepend(c);
        }
        navbarRes.prepend(c);
    
    navbarRes.style.transform = "scaleY(1)";

    c.addEventListener('click', ()=>
    {
        navbarRes.style.transform = "scaleY(0)";
        c.remove();
        c = null;
    })
}


// window.addEventListener('resize', () => {
//     // Check if the viewport width is greater than 1030px
//     if (window.innerWidth > 1030) {
//         // Hide the navbar icon when viewport width exceeds 1030px
//         navDiv.style.display = "none";
//     }
// });


