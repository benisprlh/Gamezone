window.addEventListener("load", function(){
    // document.getElementById("usiaunder18").addEventListener("click", function(){
        const dataAge = document.getElementById("usiaunder18");
        localStorage.setItem("keyAge", dataAge.value);
    // });
    // document.getElementById("usiaup18").addEventListener("click", function(){
        const dataAge2 = document.getElementById("usiaup18");
        localStorage.setItem("keyAge", dataAge2.value);
    // });
    
    // document.getElementById("Action").addEventListener("click", function(){
        const dataAction = document.getElementById("Action");
        if (dataAction.checked){
            localStorage.setItem("Action", "Action");
        } else {
            localStorage.setItem("Action", false);
        }
    // });
    
    // document.getElementById("Sports").addEventListener("click", function(){
        const dataSports = document.getElementById("Sports");
        if (dataSports.checked){
            localStorage.setItem("Sports", "Action");
        } else {
            localStorage.setItem("Sports", false);
        }
    // });
    
    // document.getElementById("Battle-Royal").addEventListener("click", function(){
        const dataBattleRoyal = document.getElementById("Battle-Royal");
        if (dataBattleRoyal.checked){
            localStorage.setItem("Battle-Royal", "Battle-Royal");
        } else {
            localStorage.setItem("Battle-Royal", false);
        }
    // });
    
})



window.addEventListener("click", function(){

    // document.getElementById("usiaunder18").addEventListener("click", function(){
        const dataAge = document.getElementById("usiaunder18");
        if (dataAge.checked){
            localStorage.setItem("keyAge", dataAge.value);
        }
        
    // });

    // document.getElementById("usiaup18").addEventListener("click", function(){
        const dataAge2 = document.getElementById("usiaup18");
        if (dataAge2.checked){
            localStorage.setItem("keyAge", dataAge2.value);
        }
    // });

    
    
    // document.getElementById("Action").addEventListener("click", function(){
        const dataAction = document.getElementById("Action");
        if (dataAction.checked){
            localStorage.setItem("Action", "Action");
        } else {
            localStorage.setItem("Action", false);
        }
    // });
    
    // document.getElementById("Sports").addEventListener("click", function(){
        const dataSports = document.getElementById("Sports");
        if (dataSports.checked){
            localStorage.setItem("Sports", "Sports");
        } else {
            localStorage.setItem("Sports", false);
        }
    // });
    
    // document.getElementById("Battle-Royal").addEventListener("click", function(){
        const dataBattleRoyal = document.getElementById("Battle-Royal");
        if (dataBattleRoyal.checked){
            localStorage.setItem("Battle-Royal", "Battle-Royal");
        } else {
            localStorage.setItem("Battle-Royal", false);
        }
    // });
    
})


document.getElementById("nextPage").addEventListener("click", function(){
    let nextPage = document.getElementById("nextPage");
    
    let age = document.getElementsByName("flexRadioDefault");
    let ageFixed;
    for (let i = 0; i < age.length; i++){
        if (age[i].checked){
            ageFixed = true;
            console.log(ageFixed)
            break
        }
    }

    
    let genre = document.getElementsByName("flexCheckboxDefault");
    let genreFixed;
    for (let i = 0; i < genre.length; i++){
        if (genre[i].checked){
            genreFixed = true;
            console.log(genreFixed)
            break
        }
    }
    
    if (!ageFixed || !genreFixed){
        alert ("Anda wajib mengisi minimal 1 dari setiap pertanyaan")
        nextPage.href = "#"
    } else {
        nextPage.href = "listGame.html"
    }
})