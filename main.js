/** hero animation **/
const noAnimationClass = "no-anim";
const heroActiveClass = "hero-active";
const heroHiddenClass = "hero-hidden";
let index = 1;
const hero = document.querySelector(".hero")

function tickHero() {
    for (const child of hero.children) {
        child.classList.remove(heroActiveClass);
        child.classList.remove(noAnimationClass);
    }

    for (let i = 0; i < 2; i++) {
        const child = hero.children[index * 2 + i];
        child.classList.add(heroActiveClass);
        child.classList.remove(heroHiddenClass);

        for (const c of child.children) {
            c.style = ""; // make button interactable
        }
    }

    index += 1;
    index %= hero.children.length / 2;
}
setInterval(tickHero, 10000);

hero.addEventListener("animationend", () => {
    for (const element of document.querySelectorAll(".hero-info:not(.hero-active")) {
        element.classList.add(heroHiddenClass);
    }
});

{} // fix neovim's autotabbing

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
