 const images = [
      "images/slide.jpg",
      "images/slide-2.jpg",
      "images/slide-3.jpg",
      "images/slide-4.jpg",
      "images/slide-5.jpg",
      "images/slide-7.jpg",
      "images/slide-8.jpg",
      "images/slide-9.jpg",
      "images/slide-10.jpg"
    ];

    let currentIndex = 0;
    let autoplay = false;
    let interval;

    const mainImage = document.getElementById("mainImage");
    const slideCounter = document.getElementById("slideCounter");
    const thumbnailContainer = document.getElementById("thumbnailContainer");

    function updateMainImage(index) {
      mainImage.src = images[index];
      slideCounter.textContent = `${index + 1} / ${images.length}`;
      updateThumbnails();
    }

    function updateThumbnails() {
      thumbnailContainer.innerHTML = "";

      images.forEach((src, index) => {
        const thumbDiv = document.createElement("div");
        thumbDiv.classList.add("thumbnail");
        if (index === currentIndex) thumbDiv.classList.add("active");

        const img = document.createElement("img");
        img.src = src;
        img.addEventListener("click", () => {
          currentIndex = index;
          updateMainImage(currentIndex);
        });

        const button = document.createElement("button");
        button.className = "play-btn";
        button.innerHTML = autoplay ? "⏸" : "▶"; // pause/play
        button.addEventListener("click", (e) => {
          e.stopPropagation();
          toggleAutoplay();
        });

        if (index === currentIndex && autoplay) {
          const ring = document.createElement("div");
          ring.className = "progress-ring";
          thumbDiv.appendChild(ring);
        }

        thumbDiv.appendChild(img);
        if (index === currentIndex) thumbDiv.appendChild(button);
        thumbnailContainer.appendChild(thumbDiv);
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % images.length;
      updateMainImage(currentIndex);
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateMainImage(currentIndex);
    }

    function startAutoplay() {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    function stopAutoplay() {
      clearInterval(interval);
    }

    function toggleAutoplay() {
      autoplay = !autoplay;
      if (autoplay) {
        startAutoplay();
      } else {
        stopAutoplay();
      }
      updateMainImage(currentIndex);
    }

    document.querySelector(".prev").addEventListener("click", () => {
      prevSlide();
    });

    document.querySelector(".next").addEventListener("click", () => {
      nextSlide();
    });

    updateMainImage(currentIndex);