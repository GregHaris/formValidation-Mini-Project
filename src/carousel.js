import { cacheDOM } from "./domUtils";
import setInitiators from "./initiators";
import navigateCarousel from "./navbtns";

const { images, dots, description } = cacheDOM();
let { speed, index, intervalID } = setInitiators();

export default function createCarousel() {
  function startInterval() {
    if (intervalID) clearInterval(intervalID);
    intervalID = setInterval(() => {
      index = (index + 1) % images.length;
      updateContent(index);
    }, speed);
  }

  function setupDots() {
    images.forEach((image, i) => {
      const dotSpan = document.createElement("span");
      dotSpan.classList.add("dot");

      if (i === 0) {
        dotSpan.classList.add("active");
      }

      dotSpan.addEventListener("click", () => {
        index = i;
        startInterval();
        updateContent(index);
      });

      dots.appendChild(dotSpan);
    });
  }

  function initializeCarousel() {
    startInterval();
    setupDots();
    navigateCarousel();
  }

  initializeCarousel();
}

export function updateContent(index) {
  images.forEach((image) => image.classList.remove("active"));
  images[index].classList.add("active");

  const dotSpans = document.querySelectorAll(".dot");
  dotSpans.forEach((dot) => dot.classList.remove("active"));
  dotSpans[index].classList.add("active");
  description.textContent = images[index].dataset.desc;
}
