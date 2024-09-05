import { cacheDOM } from "./domUtils";
import { updateContent } from "./carousel";

const { images, carouselNavBtn } = cacheDOM();

export default function navigateCarousel() {
  carouselNavBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const offset = btn.dataset.carouselBtn === "next" ? 1 : -1;
      const activeImage = document.querySelector(".active");
      let newIndex = [...images].indexOf(activeImage) + offset;
      if (newIndex < 0) newIndex = images.length - 1;
      if (newIndex >= images.length) newIndex = 0;
      updateContent(newIndex);
    });
  });
}
