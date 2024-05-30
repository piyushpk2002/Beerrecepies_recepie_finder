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
       // navbarRes.prepend(c);
    
    navbarRes.style.transform = "scaleY(1)";

    c.addEventListener('click', ()=>
    {
        navbarRes.style.transform = "scaleY(0)";
        c.remove();
        c = null;
    })
}