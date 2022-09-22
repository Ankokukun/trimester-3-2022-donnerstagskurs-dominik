function init() {
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
        //dark mode
        document.getElementById("colorMode").checked = true;
        document.body.classList.add("dark");
    }
}

document.getElementById("colorMode").addEventListener("click",  (e) => {
    if(document.body.classList.contains("dark"))
    {
        document.body.classList.remove("dark")
    }
    else 
    {
        document.body.classList.add("dark")
    }
});