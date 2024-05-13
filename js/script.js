document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll("nav ul li a");
  const header = document.querySelector("header");
  const nav = document.querySelector("nav ul");
  const headerHeight = header.offsetHeight;
  let isMenuHidden = false;

  function handleScroll() {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + headerHeight;

      let menuShouldBeHidden = scrollPosition > headerHeight; // Hide menu only when scrolling past the header

      sections.forEach(section => {
          if (
              section.offsetTop <= scrollPosition &&
              section.offsetTop + section.offsetHeight > scrollPosition
          ) {
              menuShouldBeHidden = true;
          }
      });

      if (menuShouldBeHidden && scrollPosition > headerHeight) {
          if (!isMenuHidden) {
              header.style.top = '-100px'; // Hide the menu
              isMenuHidden = true;
          }
      } else {
          if (isMenuHidden || scrollPosition <= headerHeight) {
              header.style.top = '0'; // Show the menu
              isMenuHidden = false;
          }
      }
  }

  function handleMouseMove(event) {
      if (event.clientY < 50) {
          header.style.top = '0'; // Show the menu
          isMenuHidden = false;
      } else if (isMenuHidden && window.scrollY > headerHeight) {
          header.style.top = '-100px'; // Hide the menu
      }
  }

  for (const link of links) {
      link.addEventListener("click", function(e) {
          const href = this.getAttribute("href");

          if (href.startsWith("http")) {
              // Allow the browser to follow the link for external URLs
              return;
          }

          e.preventDefault();
          const targetId = href.substring(1);
          const targetSection = document.getElementById(targetId);

          window.scrollTo({
              top: targetSection.offsetTop,
              behavior: "smooth"
          });

          // Hide the mobile menu after selecting an item
          if (window.innerWidth < 480) {
              nav.classList.remove("show");
          }
      });
  }

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("mousemove", handleMouseMove);

  // Swipe to toggle menu visibility on mobile
  let touchStartX = 0;

  window.addEventListener("touchstart", function(e) {
      touchStartX = e.changedTouches[0].screenX;
  });

  window.addEventListener("touchend", function(e) {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchEndX > touchStartX + 50) { // Swipe right
          nav.classList.add("show");
      } else if (touchEndX < touchStartX - 50) { // Swipe left
          nav.classList.remove("show");
      }
  });
});
