const navbar = document.querySelector('#navbar');

const sticky = navbar.offsetTop;

window.onscroll = () => {
    if(window.pageYOffset >= sticky){
        navbar.classList.add("fixed-top");
    }else{
        navbar.classList.remove("fixed-top");
    }
}