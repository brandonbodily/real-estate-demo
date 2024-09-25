// Mock Data for Listings
const mockListings = [
  {
    id: 1,
    price: 95000,
    homeType: "Single Family",
    bedrooms: 2,
    bathrooms: 1,
    location: "Springfield",
    title: "Charming Single Family Home",
    description: "A cozy home perfect for small families.",
  },
  {
    id: 2,
    price: 150000,
    homeType: "Condo",
    bedrooms: 3,
    bathrooms: 2,
    location: "Shelbyville",
    title: "Modern Condo Downtown",
    description: "Conveniently located condo with modern amenities.",
  },
  // Add more mock listings here...
];

// Function to handle sign-up form submission
document.getElementById("signupForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const userData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    signupDate: new Date().toLocaleDateString(),
    lastActiveDate: new Date().toLocaleDateString(),
  };
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(userData);
  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "listings.html";
});

// Function to display listings
function displayListings(listings) {
  const container = document.getElementById("listingsContainer");
  container.innerHTML = "";
  listings.forEach((listing) => {
    const listingDiv = document.createElement("div");
    listingDiv.classList.add("listing");
    listingDiv.innerHTML = `
      <h3>${listing.title}</h3>
      <p>Price: $${listing.price.toLocaleString()}</p>
      <p>Type: ${listing.homeType}</p>
      <p>Bedrooms: ${listing.bedrooms}</p>
      <p>Bathrooms: ${listing.bathrooms}</p>
      <p>Location: ${listing.location}</p>
      <button onclick="saveFavorite(${listing.id})">Save to Favorites</button>
    `;
    container.appendChild(listingDiv);
  });
}

// Function to filter listings
function filterListings() {
  let filteredListings = mockListings;
  const priceRange = document.getElementById("priceRange").value;
  const homeType = document.getElementById("homeType").value;
  const bedrooms = document.getElementById("bedrooms").value;
  const bathrooms = document.getElementById("bathrooms").value;
  const location = document.getElementById("location").value.toLowerCase();

  if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split("-").map(Number);
    filteredListings = filteredListings.filter(
      (listing) => listing.price >= minPrice && listing.price <= maxPrice
    );
  }

  if (homeType) {
    filteredListings = filteredListings.filter(
      (listing) => listing.homeType === homeType
    );
  }

  if (bedrooms) {
    filteredListings = filteredListings.filter(
      (listing) => listing.bedrooms >= parseInt(bedrooms)
    );
  }

  if (bathrooms) {
    filteredListings = filteredListings.filter(
      (listing) => listing.bathrooms >= parseInt(bathrooms)
    );
  }

  if (location) {
    filteredListings = filteredListings.filter((listing) =>
      listing.location.toLowerCase().includes(location)
    );
  }

  displayListings(filteredListings);
}

// Function to save favorite listings
function saveFavorite(id) {
  const favoriteListings = JSON.parse(localStorage.getItem("favorites")) || [];
  const listing = mockListings.find((listing) => listing.id === id);
  if (listing && !favoriteListings.some((fav) => fav.id === id)) {
    favoriteListings.push(listing);
    localStorage.setItem("favorites", JSON.stringify(favoriteListings));
    alert("Listing saved to favorites.");
  } else {
    alert("Listing is already in favorites.");
  }
}

// Function to display leads on the admin page
function displayLeads() {
  const leadsTableBody = document.querySelector("#leadsTable tbody");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  leadsTableBody.innerHTML = ""; // Clear previous rows
  users.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>${user.signupDate}</td>
      <td>${user.lastActiveDate}</td>
      <td><input type="text" placeholder="Add notes here" /></td>
    `;
    leadsTableBody.appendChild(row);
  });
}

// Function to export leads data (simulated)
function exportData() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const csvContent =
    "data:text/csv;charset=utf-8," +
    "Name,Email,Phone,Sign-up Date,Last Active Date\n" +
    users
      .map(
        (user) =>
          `${user.name},${user.email},${user.phone},${user.signupDate},${user.lastActiveDate}`
      )
      .join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "leads.csv");
  document.body.appendChild(link);
  link.click();
}

// Initialize listings page
if (window.location.pathname.includes("listings.html")) {
  displayListings(mockListings);
}

// Initialize admin page
if (window.location.pathname.includes("admin.html")) {
  displayLeads();
}
