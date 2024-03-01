
document.addEventListener("DOMContentLoaded", function() {
  window.addEventListener("scroll", function() {
      var nav = document.querySelector('.navigation');
      var dark = document.querySelector('.navigation.dark-mode');
     

      var scrolled = window.scrollY > 0;

      if (scrolled) {
          nav.classList.add('scrolled');
          dark.classList.add('.scrolled');
      } else {
          nav.classList.remove('scrolled');
          dark.classList.remove('.scrolled');
      }
  });
});


// function to navigate page instead of hyperlink because i dont know how to change css attribute of hyperlink so i used buttons 
function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
  }
      function scrollToTarget(buttonId) {
    if (buttonId === 'homebtn') {
      scrollToSection('home');
    } else if (buttonId === 'aboutbtn') {
      scrollToSection('about');
    } else if (buttonId === 'projectsbtn') {
      scrollToSection('projects');
    } else if (buttonId === 'contactbtn') {
      scrollToSection('contact');
    }
  }

  function toggle_nav() {

    const navlist = document.querySelectorAll('.hiden'); 
    const navlistdark = document.querySelectorAll('.hiden.dark-mode'); 
    navlist.forEach(navlist => navlist.classList.toggle('visible')); 
    navlistdark.forEach(navlistdark => navlistdark.classList.toggle('visible')); 
  }


// function to toggle dark mode, 
function toggleMode() {
  const body = document.body;
  const buttons = document.querySelectorAll('.nav');
  const navibar = document.getElementById('navibar'); 
  const homepage = document.querySelectorAll('.homepage'); 
  const contentbox = document.querySelectorAll('.contentbox'); 
  const pic = document.querySelectorAll('.maemi');
  const portrait = document.querySelectorAll('.selfport');

  body.classList.toggle('dark-mode');
  buttons.forEach(button => button.classList.toggle('dark-mode'));
  navibar.classList.toggle('dark-mode'); 
  homepage.forEach(homepage => homepage.classList.toggle('dark-mode')); 
  contentbox.forEach(contentbox => contentbox.classList.toggle('dark-mode')); 
  pic.forEach(img => img.classList.toggle('dark-mode'));
  portrait.forEach(img => img.classList.toggle('dark-mode'));

  if (body.classList.contains('dark-mode')) {
      document.getElementById('mode').innerText = 'Night mode';
  } else {
      document.getElementById('mode').innerText = 'Day mode';
  }
}
const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
  const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
  
  // Handle scrollbar thumb drag
  scrollbarThumb.addEventListener("mousedown", (e) => {
      const startX = e.clientX;
      const thumbPosition = scrollbarThumb.offsetLeft;
      const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
      
      // Update thumb position on mouse move
      const handleMouseMove = (e) => {
          const deltaX = e.clientX - startX;
          const newThumbPosition = thumbPosition + deltaX;

          // Ensure the scrollbar thumb stays within bounds
          const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
          const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
          
          scrollbarThumb.style.left = `${boundedPosition}px`;
          imageList.scrollLeft = scrollPosition;
      }

      // Remove event listeners on mouse up
      const handleMouseUp = () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
      }

      // Add event listeners for drag interaction
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
  });

  // Slide images according to the slide button clicks
  slideButtons.forEach(button => {
      button.addEventListener("click", () => {
          const direction = button.id === "prev-slide" ? -1 : 1;
          const scrollAmount = imageList.clientWidth * direction;
          imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
  });

   // Show or hide slide buttons based on scroll position
  const handleSlideButtons = () => {
      slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
      slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
  }

  // Update scrollbar thumb position based on image scroll
  const updateScrollThumbPosition = () => {
      const scrollPosition = imageList.scrollLeft;
      const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
      scrollbarThumb.style.left = `${thumbPosition}px`;
  }

  // Call these two functions when image list scrolls
  imageList.addEventListener("scroll", () => {
      updateScrollThumbPosition();
      handleSlideButtons();
  });
}

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);
