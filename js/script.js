document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll("nav ul li a");
  const header = document.querySelector("header");
  const headerHeight = header.offsetHeight;
  let isMenuHidden = false;

  function handleScroll() {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + headerHeight;

      let menuShouldBeHidden = false;

      sections.forEach(section => {
          if (
              section.offsetTop <= scrollPosition &&
              section.offsetTop + section.offsetHeight > scrollPosition
          ) {
              menuShouldBeHidden = true;
          }
      });

      if (menuShouldBeHidden) {
          if (!isMenuHidden) {
              header.style.top = '-100px'; // Hide the menu
              isMenuHidden = true;
          }
      } else {
          if (isMenuHidden) {
              header.style.top = '0'; // Show the menu
              isMenuHidden = false;
          }
      }
  }

  function handleMouseMove(event) {
      if (event.clientY < 50) {
          header.style.top = '0'; // Show the menu
          isMenuHidden = false;
      } else if (isMenuHidden) {
          header.style.top = '-100px'; // Hide the menu
      }
  }

  for (const link of links) {
      link.addEventListener("click", function(e) {
          e.preventDefault();
          const targetId = this.getAttribute("href").substring(1);
          const targetSection = document.getElementById(targetId);

          window.scrollTo({
              top: targetSection.offsetTop,
              behavior: "smooth"
          });
      });
  }

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("mousemove", handleMouseMove);
});
