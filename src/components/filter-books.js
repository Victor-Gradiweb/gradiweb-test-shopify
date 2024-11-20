export const filterBooks = () => {
    console.log("hola vic")
    document.addEventListener("DOMContentLoaded", function () {
        const filters = document.querySelectorAll(".cont-filters__badge");
        const bookCards = document.querySelectorAll(".book-card");
        let activeFilters = {
          authors: [],
          genders: [],
        };
      
        // Helper function to update book card visibility
        function applyFilters() {
          bookCards.forEach((card) => {
            const cardAuthor = card.querySelector(".book-card__author")?.textContent.trim();
            const cardGenders = Array.from(card.querySelectorAll(".book-card__gender")).map(
              (gender) => gender.textContent.trim()
            );
      
            const matchesAuthor =
              activeFilters.authors.length === 0 || activeFilters.authors.includes(cardAuthor);
            const matchesGender =
              activeFilters.genders.length === 0 ||
              cardGenders.some((gender) => activeFilters.genders.includes(gender));
      
            card.style.display = matchesAuthor && matchesGender ? "block" : "none";
          });
        }
      
        // Event listener for filter clicks
        filters.forEach((filter) => {
          filter.addEventListener("click", function () {
            const filterName = this.closest(".section_filters").querySelector("h4").textContent.trim();
            const filterValue = this.textContent.trim();
      
            if (filterName.includes("authors")) {
              toggleFilter(activeFilters.authors, filterValue);
            } else if (filterName.includes("genders")) {
              toggleFilter(activeFilters.genders, filterValue);
            }
      
            applyFilters();
          });
        });
      
        // Helper function to toggle filter
        function toggleFilter(filterArray, value) {
          const index = filterArray.indexOf(value);
          if (index === -1) {
            filterArray.push(value);
          } else {
            filterArray.splice(index, 1);
          }
        }
      
        // Add "Remove filter" functionality
        document.querySelectorAll(".cont-filters__badge").forEach((filter) => {
          if (filter.textContent.includes("Remove filter")) {
            filter.addEventListener("click", function () {
              activeFilters.authors = [];
              activeFilters.genders = [];
              applyFilters();
            });
          }
        });
      });
}