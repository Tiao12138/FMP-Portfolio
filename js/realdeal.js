document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".link");
  const contents = document.querySelectorAll(".content");
  const pastContentContainer = document.getElementById('past-content-container');

  navItems.forEach(item => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const contentId = this.getAttribute("data-content");

      if (contentId.startsWith("content")) {
        contents.forEach(content => content.classList.remove("active"));
        document.getElementById(contentId).classList.add("active");
        pastContentContainer.innerHTML = '';  // Clear any loaded past content
      } else {
        loadContentPast(contentId);  // Load page in the container
      }

      navItems.forEach(link => link.classList.remove("selected"));
      this.classList.add("selected");
    });
  });

  document.querySelectorAll('img.cover').forEach(cover => {
    cover.addEventListener('click', function () {
      const contentPast = this.getAttribute('past-content');
      loadContentPast(contentPast);
    });
  });

  const categories = document.querySelectorAll('.link');
  categories.forEach(category => {
    category.addEventListener('click', function () {
      categories.forEach(cat => cat.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  const images = document.querySelectorAll('.cover');
  images.forEach(img => {
    img.addEventListener('mouseover', () => showText(img));
    img.addEventListener('mouseout', () => hideText(img));
  });

  function loadContentPast(contentPast) {
    let contentUrl2 = '';
    switch (contentPast) {
      case 'p1': contentUrl2 = 'p1.html'; break;
      case 'p2': contentUrl2 = 'p2.html'; break;
      case 'p3': contentUrl2 = 'p3.html'; break;
      case 'p4': contentUrl2 = 'p4.html'; break;
      default: contentUrl2 = 'index.html';
    }
    if (contentUrl2) {
      fetch(contentUrl2)
        .then(response => response.text())
        .then(data => {
          pastContentContainer.innerHTML = data;  // Load content into container
          // console.log
          document.getElementById('content3').classList.remove('active');  // Hide content3
        })
        .catch(error => console.error('Error loading content:', error));
    }
  }

  function showText(img) {
    const hoverText = img.parentElement.querySelector('.hovertext');
    if (hoverText) hoverText.style.display = 'block';
  }

  function hideText(img) {
    const hoverText = img.parentElement.querySelector('.hovertext');
    if (hoverText) hoverText.style.display = 'none';
  }

  function loadPivContent() {
    var PivElement = document.getElementById('piv');
    if (PivElement === null) {
      console.error('PIV element with id "piv" not found');
      return;
    }

    fetch('text/PI&V.docx')
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => mammoth.convertToHtml({ arrayBuffer: arrayBuffer }))
      .then(result => {
        PivElement.innerHTML = result.value;
      })
      .catch(error => {
        console.error('Error fetching the docx file:', error);
      });
  }

  loadPivContent();

  function loadRefContent() {
    var RefElement = document.getElementById('reflection');
    if (RefElement === null) {
      console.error('Ref element with id "reflection" not found');
      return;
    }

    fetch('text/Reflection FMP.docx')
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => mammoth.convertToHtml({ arrayBuffer: arrayBuffer }))
      .then(result => {
        RefElement.innerHTML = result.value;
      })
      .catch(error => {
        console.error('Error fetching the docx file:', error);
      });
  }

  loadRefContent();

});
