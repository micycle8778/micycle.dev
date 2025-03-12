/** hero animation **/
const noAnimationClass = "no-anim";
const heroActiveClass = "hero-active";
const heroHiddenClass = "hero-hidden";

const hero = document.querySelector(".hero")
const videoCount = document.querySelectorAll(".hero-media").length;
let index = 1;

let heroInterval;
function resetHeroTimer() {
    if (heroInterval) clearInterval(heroInterval);
    heroInterval = setInterval(tickHero, 10000);
}

function tickHero() {
    for (const child of hero.children) {
        child.classList.remove(heroActiveClass);
        child.classList.remove(noAnimationClass);
    }

    for (let i = 0; i < 2; i++) {
        const child = hero.children[index * 2 + i + 1];
        child.classList.add(heroActiveClass);
        child.classList.remove(heroHiddenClass);

        for (const c of child.children) {
            c.style = ""; // make button interactable
        }
    }

    index += 1;
    index %= videoCount;
}

resetHeroTimer();
hero.addEventListener("animationend", () => {
    for (const element of document.querySelectorAll(".hero-info:not(.hero-active")) {
        element.classList.add(heroHiddenClass);
    }
});

document.querySelector(".hero-prev").addEventListener("click", () => {
    console.log("prev");
    index -= 2;
    if (index < 0) index += videoCount;
    tickHero();
    resetHeroTimer();
});

document.querySelector(".hero-next").addEventListener("click", () => {
    console.log("next");
    tickHero();
    resetHeroTimer();
});

/** pfp animation **/
// const pfp = document.querySelector(".pfp");
// const contactH2 = document.querySelector(".contact h2");
//
// let moveUp = false;
// function movePfp() {
//     contactH2.style.cssText = `translate: 0 ${moveUp ? -.1 : .1}rem`;
//     pfp.style.cssText = `translate: 0 ${moveUp ? -.5 : .5}rem`;
//     moveUp = !moveUp;
// }
//
// movePfp();
// pfp.addEventListener("transitionend", e => { if (e.propertyName == "translate") movePfp(); });
