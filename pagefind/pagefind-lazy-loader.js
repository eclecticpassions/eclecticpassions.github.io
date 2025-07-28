window.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("open-search-modal");
  const closeBtn = document.getElementById("close-search-modal");
  const modal = document.getElementById("search-modal");

  if (!searchBtn) {
    console.warn("Search button #open-search-modal not found");
    return;
  }
  if (!modal) {
    console.warn("Search modal #search-modal not found");
    return;
  }
  if (!closeBtn) {
    console.warn("Close button #close-search-modal not found");
  }

  // Open search modal and load Pagefind lazily
  searchBtn.addEventListener("click", () => {
    loadPagefind();
    modal.style.display = "flex";
    setTimeout(() => {
      const input = modal.querySelector(".pagefind-ui__search-input");
      if (input) input.focus();
    }, 100);
  });

  // Close modal on close button click
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  // Close modal when clicking outside modal content
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Close modal on Escape key press
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.style.display === "flex") {
      modal.style.display = "none";
    }
  });
});

function loadPagefind() {
  if (!window.pagefindLoaded) {
    const script1 = document.createElement("script");
    script1.type = "module";
    script1.src = "/pagefind/pagefind.js";
    script1.crossOrigin = "anonymous";
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.type = "module";
    script2.src = "/pagefind/pagefind-ui.js";
    script2.crossOrigin = "anonymous";

    script2.onload = () => {
      new PagefindUI({ element: "#search", showSubResults: true });
    };

    document.head.appendChild(script2);

    window.pagefindLoaded = true;
  }
}
