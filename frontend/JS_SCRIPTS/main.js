const main = document.querySelector('#mainContent');
main.style.display = 'none';
window.addEventListener('load', () => {
  const splash = document.getElementById('splashScreen');
  setTimeout(() => {
    // Hide splash
    if (splash) splash.style.display = 'none';
    if (main) main.style.display = 'block';
    
    // Initialize AOS AFTER splash screen is removed
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
      });
      AOS.refresh();
    }
  }, 1000);
  
  // Animated text
  const container = document.querySelector(".animateTxt");
  if (container) {
    const words = container.textContent.trim().split(/\s+/);
    container.textContent = "";
    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.textContent = word + "\u00A0";
      span.style.animationDelay = `${index * 0.15}s`;
      container.appendChild(span);
    });
  }
  
  // Header scroll effect
  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
      if (window.scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
  });
  
  // Close promo banner
  const closePromo = document.getElementById('closePromo');
  if (closePromo) {
    closePromo.addEventListener('click', () => {
      const promoBanner = document.getElementById('promoBanner');
      if (promoBanner) promoBanner.style.display = 'none';
    });
  }
  
  // Tab switching
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Search toggle (for mobile)
  const searchBar = document.querySelector('.search-bar');
  const searchIcon = document.querySelector('.search-icon');
  if (searchIcon && searchBar) {
    searchIcon.addEventListener('click', () => {
      searchBar.classList.toggle('active');
      const input = searchBar.querySelector('input');
      if (searchBar.classList.contains('active') && input) input.focus();
    });
  }
  
  // Slider functionality
  const slider = document.querySelector('.imageSlider');
  const sliderTrack = document.querySelector('.slider-track');
  
  if (slider && sliderTrack) {
    const originalImages = Array.from(sliderTrack.querySelectorAll('.imageCarousel'));
    
    // Clone images 3x for seamless infinite loop
    for (let i = 0; i < 3; i++) {
      originalImages.forEach(img => {
        const clone = img.cloneNode(true);
        sliderTrack.appendChild(clone);
      });
    }
    
    function updateImageClasses() {
      const allImages = Array.from(sliderTrack.querySelectorAll('.imageCarousel'));
      const sliderCenter = slider.offsetWidth * 0.68;
      let closestIndex = 0;
      let minDistance = Infinity;
      
      allImages.forEach((img, index) => {
        const imgRect = img.getBoundingClientRect();
        const sliderRect = slider.getBoundingClientRect();
        const imgCenter = imgRect.left + imgRect.width / 2 - sliderRect.left;
        const distanceFromCenter = Math.abs(imgCenter - sliderCenter);
        
        if (distanceFromCenter < minDistance) {
          minDistance = distanceFromCenter;
          closestIndex = index;
        }
      });
      
      allImages.forEach((img, index) => {
        img.classList.remove('active', 'prev', 'next', 'gen1', 'gen2', 'gen3', 'far');
        const indexDistance = Math.abs(index - closestIndex);
        
        if (indexDistance === 0) img.classList.add('active');
        else if (indexDistance === 1) img.classList.add(index < closestIndex ? 'prev' : 'next');
        else if (indexDistance === 2) img.classList.add('gen1');
        else if (indexDistance === 3) img.classList.add('gen2');
        else img.classList.add('gen3');
      });
    }
    
    setInterval(updateImageClasses, 3000);
    updateImageClasses();
  }
  
  // Search box behavior
  const searchBtn = document.querySelector('.search-btn');
  const searchBox = document.querySelector('.search-box');
  if (searchBtn && searchBox) {
    searchBtn.addEventListener('click', () => {
      const query = searchBox.value.trim();
      if (query) console.log('Searching for:', query);
    });
    
    searchBox.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query) console.log('Searching for:', query);
      }
    });
  }
});