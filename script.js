document.addEventListener("DOMContentLoaded", () => {
  const imageContainer = document.getElementById("image-container");
  const resetBtn = document.getElementById("reset");
  const verifyBtn = document.getElementById("verify");
  const message = document.getElementById("message");

  const baseImages = [
    "https://picsum.photos/id/237/200/200", // dog
    "https://picsum.photos/id/1025/200/200",
    "https://picsum.photos/id/1003/200/200",
    "https://picsum.photos/id/1005/200/200",
    "https://picsum.photos/id/1011/200/200",
    "https://picsum.photos/id/1015/200/200"
  ];

  // pick 5 unique + 1 duplicate
  function getShuffledImages() {
    let chosen = baseImages.sort(() => 0.5 - Math.random()).slice(0, 5);
    let duplicate = chosen[Math.floor(Math.random() * chosen.length)];
    let finalImages = [...chosen, duplicate];
    return finalImages.sort(() => 0.5 - Math.random());
  }

  let images = getShuffledImages();
  let selected = [];

  function renderImages() {
    imageContainer.innerHTML = "";
    images.forEach((src, index) => {
      const img = document.createElement("img");
      img.src = src;
      img.dataset.index = index;
      img.addEventListener("click", () => handleImageClick(img, src));
      imageContainer.appendChild(img);
    });
  }

  function handleImageClick(img, src) {
    if (selected.length < 2 && !selected.includes(img)) {
      img.classList.add("selected");
      selected.push(img);
    }
    if (selected.length === 1) {
      resetBtn.style.display = "inline-block";
    }
    if (selected.length === 2) {
      verifyBtn.style.display = "inline-block";
    }
  }

  resetBtn.addEventListener("click", () => {
    selected.forEach(img => img.classList.remove("selected"));
    selected = [];
    resetBtn.style.display = "none";
    verifyBtn.style.display = "none";
    message.textContent = "";
  });

  verifyBtn.addEventListener("click", () => {
    if (selected[0].src === selected[1].src) {
      message.textContent = "You are a human. Congratulations!";
    } else {
      message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    verifyBtn.style.display = "none";
  });

  renderImages();
});
