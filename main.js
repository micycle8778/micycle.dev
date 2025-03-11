// hero animation
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

hero.addEventListener("animationend", e => {
    for (const element of document.querySelectorAll(".hero-info:not(.hero-active")) {
        element.classList.add(heroHiddenClass);
    }
});

