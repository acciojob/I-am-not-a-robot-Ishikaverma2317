//your code here
document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "https://picsum.photos/id/237/200/200", // dog
    "https://picsum.photos/seed/picsum/200/200", // random
    "https://picsum.photos/200/200?grayscale",
    "https://picsum.photos/200/200?blur",
    "https://picsum.photos/200/300"
  ];

  // pick 4 random + 1 duplicate
  let shuffled = [...images];
  let duplicate = images[Math.floor(Math.random() * images.length)];
  shuffled.push(duplicate);

  // shuffle array
  shuffled = shuffled.sort(() => Math.random() - 0.5);

  const container = document.getElementById("image-container");
  const verifyBtn = document.getElementById("verify-btn");
  const message = document.getElementById("message");
  let selected = [];

  // render images
  shuffled.forEach((src, index) => {
    let img = document.createElement("img");
    img.src = src;
    img.classList.add("img");
    img.dataset.index = index;

    img.addEventListener("click", () => {
      if (selected.includes(index)) {
        img.classList.remove("selected");
        selected = selected.filter(i => i !== index);
      } else {
        if (selected.length < 2) {
          img.classList.add("selected");
          selected.push(index);
        }
      }
    });

    container.appendChild(img);
  });

  // verify logic
  verifyBtn.addEventListener("click", () => {
    if (selected.length !== 2) {
      message.textContent = "⚠️ Please select exactly two images!";
      message.style.color = "orange";
      return;
    }

    const [i1, i2] = selected;
    if (shuffled[i1] === shuffled[i2]) {
      message.textContent = "✅ Verification successful, you’re human!";
      message.style.color = "green";
    } else {
      message.textContent = "❌ Wrong choice, try again!";
      message.style.color = "red";
    }
  });
});
