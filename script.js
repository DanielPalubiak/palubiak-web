const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const searchToggle = document.querySelector(".search-toggle");
const searchPanel = document.querySelector("#search-panel");
const searchInput = document.querySelector("#site-search");
const searchStatus = document.querySelector("#search-status");
const searchableItems = Array.from(document.querySelectorAll(".searchable"));
const emptyResults = document.querySelector("#empty-results");

if (searchToggle && searchPanel) {
  searchToggle.addEventListener("click", () => {
    const willOpen = searchPanel.hidden;
    searchPanel.hidden = !willOpen;
    searchToggle.setAttribute("aria-expanded", String(willOpen));
    if (willOpen && searchInput) searchInput.focus();
  });
}

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLocaleLowerCase("sk");
    let visibleCount = 0;

    searchableItems.forEach((item) => {
      const searchableText = (item.dataset.search || item.textContent).toLocaleLowerCase("sk");
      const matches = searchableText.includes(query);
      item.hidden = !matches;
      if (matches) visibleCount++;
    });

    if (searchStatus) {
      searchStatus.textContent = query
        ? `Počet nájdených výsledkov: ${visibleCount}`
        : "Zadajte názov telefónu alebo článku.";
    }
    if (emptyResults) emptyResults.hidden = visibleCount !== 0 || query.length === 0;
  });
}

const cartCountElement = document.querySelector("#cart-count");
const toast = document.querySelector("#toast");
let cartCount = 0;
let toastTimeout;

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    cartCount++;
    if (cartCountElement) cartCountElement.textContent = String(cartCount);

    const productName = button.dataset.product || "Produkt";
    if (toast) {
      toast.textContent = `${productName} bol pridaný do košíka.`;
      toast.classList.add("visible");
      window.clearTimeout(toastTimeout);
      toastTimeout = window.setTimeout(() => toast.classList.remove("visible"), 2400);
    }
  });
});
