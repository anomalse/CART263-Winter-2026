async function loadNav(){

    let elContainer = document.querySelector("#cart263Nav");
    let response = await fetch('nav.html')
    let htmlNav = await response.text();
    elContainer.innerHTML =htmlNav;
}

loadNav();