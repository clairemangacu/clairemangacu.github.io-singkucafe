const cartItems = document.getElementById("cart-items");
const totalDisplay = document.getElementById("total");
let total = 0;

document.querySelectorAll(".menu-card button").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".menu-card");
    const itemName = card.querySelector("h3").textContent;
    const itemPrice = parseInt(card.querySelector("span").textContent.replace("₱", ""));

    // Add item to cart list
    const li = document.createElement("li");
    li.textContent = `${itemName} - ₱${itemPrice}`;
    cartItems.appendChild(li);

    // Update total
    total += itemPrice;
    totalDisplay.textContent = total;
  });
});

document.getElementById("checkout").addEventListener("click", () => {
  if (total === 0) {
    alert("Your cart is empty!");
  } else {
    alert(`Thank you for your order! Your total is ₱${total}.`);
    cartItems.innerHTML = "";
    total = 0;
    totalDisplay.textContent = total;
  }
});

// ====== SEARCH, FILTER & SORT ======
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
const sortSelect = document.getElementById("sort");
const menuItems = document.querySelector(".menu-items");

// Function to filter and sort menu
function updateMenu() {
  let searchValue = searchInput.value.toLowerCase();
  let filterValue = filterSelect.value;
  let sortValue = sortSelect.value;

  // Get all cards
  let cards = Array.from(document.querySelectorAll(".menu-card"));

  // Filter by search + category
  cards.forEach((card) => {
    let name = card.querySelector("h3").textContent.toLowerCase();
    let category = card.getAttribute("data-category");

    let matchSearch = name.includes(searchValue);
    let matchCategory = filterValue === "all" || category === filterValue;

    if (matchSearch && matchCategory) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  // Sort by price
  let visibleCards = cards.filter((card) => card.style.display !== "none");

  if (sortValue === "price-low") {
    visibleCards.sort(
      (a, b) =>
        parseInt(a.getAttribute("data-price")) -
        parseInt(b.getAttribute("data-price"))
    );
  } else if (sortValue === "price-high") {
    visibleCards.sort(
      (a, b) =>
        parseInt(b.getAttribute("data-price")) -
        parseInt(a.getAttribute("data-price"))
    );
  }

  // Re-append sorted cards
  visibleCards.forEach((card) => menuItems.appendChild(card));
}

// Event listeners
searchInput.addEventListener("input", updateMenu);
filterSelect.addEventListener("change", updateMenu);
sortSelect.addEventListener("change", updateMenu);

// ====== TAG-BASED RATING FUNCTION ======
function selectTag(tag) {
  document.querySelectorAll(".tag-rating span").forEach((el) => {
    el.classList.remove("selected");
  });
  tag.classList.add("selected");
  document.getElementById("rating").value = tag.textContent;
}

// ====== STAR RATING FUNCTION ======
function setRating(rating) {
  const stars = document.querySelectorAll(".star-rating span");
  stars.forEach((star, index) => {
    star.classList.toggle("active", index < rating);
  });
  document.getElementById("star-rating").value = rating;
}

// ====== FEEDBACK FORM SUBMISSION ======
function showModal(message) {
  document.getElementById("modal-message").textContent = message;
  document.getElementById("confirmation-modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("confirmation-modal").style.display = "none";
}

// Feedback form
// Feedback form
const feedbackForm = document.getElementById("feedback-form");
if (feedbackForm) {
  feedbackForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show confirmation text
    const message = document.getElementById("feedback-message");
    message.textContent = "✅ Thank you for your feedback!";
    message.style.display = "block";

    // Reset form and stars
    feedbackForm.reset();
    document.querySelectorAll(".star-rating span").forEach((star) =>
      star.classList.remove("active")
    );
  });
}

// Concern form
const concernForm = document.getElementById("concern-form");
if (concernForm) {
  concernForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show confirmation text
    const message = document.getElementById("concern-message");
    message.textContent = "📩 Thank you for reaching out! We’ll get back to you shortly.";
    message.style.display = "block";

    // Reset form
    concernForm.reset();
  });
}


/* ======= MOCK API: Customers & Messages (append to bottom of script.js) ======= */

// ---------- Mock datasets (simulate GET outputs) ----------
const mockCustomers = [
  { id: 1, name: "Maria Santos", email: "maria.s@example.com", phone: "0917 123 4567", orders: 8, joined: "2024-11-02" },
  { id: 2, name: "John Dela Cruz", email: "john.d@example.com", phone: "0994 417 2569", orders: 2, joined: "2025-08-18" },
  { id: 3, name: "Anna Reyes", email: "anna.r@example.com", phone: "0927 987 6543", orders: 12, joined: "2023-06-12" },
  { id: 4, name: "Mark Lim", email: "mark.lim@example.com", phone: "0918 222 3333", orders: 1, joined: "2025-09-10" },
  { id: 5, name: "Bea Cruz", email: "bea.cruz@example.com", phone: "0933 555 7777", orders: 6, joined: "2024-10-05" }
];

const mockMessages = [
  { id: 1, name: "Rosa", email: "rosa@example.com", phone: "0917 444 1111", subject: "Catering Inquiry", message: "Hi! Do you offer catering for 30 persons?", date: "2025-09-28" },
  { id: 2, name: "Miguel", email: "miguel@test.com", phone: "", subject: "Feedback", message: "Loved the rooftop vibe. Service was excellent.", date: "2025-10-01" },
  { id: 3, name: "Leah", email: "leah@mail.com", phone: "0923 111 2222", subject: "Order Issue", message: "My order arrived cold — please advise.", date: "2025-09-30" }
];

// ---------- Customers rendering + search/filter ----------
function renderCustomers(customers) {
  const tbody = document.querySelector("#customer-table tbody");
  const empty = document.getElementById("customers-empty");
  if (!tbody) return;
  tbody.innerHTML = "";
  if (customers.length === 0) {
    empty.style.display = "block";
  } else {
    empty.style.display = "none";
    customers.forEach((c, idx) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td>${c.name}</td>
        <td><a href="mailto:${c.email}">${c.email}</a></td>
        <td>${c.phone || "-"}</td>
        <td>${c.orders}</td>
        <td>${c.joined}</td>
      `;
      tbody.appendChild(tr);
    });
  }
}

// filter helpers
function filterCustomers() {
  const q = document.getElementById("customer-search")?.value.toLowerCase() || "";
  const f = document.getElementById("customer-filter")?.value || "all";

  let filtered = mockCustomers.filter(c => {
    const hay = `${c.name} ${c.email} ${c.phone}`.toLowerCase();
    return hay.includes(q);
  });

  if (f === "loyal") filtered = filtered.filter(c => c.orders > 5);
  if (f === "new") {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30);
    filtered = filtered.filter(c => new Date(c.joined) >= cutoff);
  }

  renderCustomers(filtered);
}

// init customers page listeners
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("customer-table")) {
    // initial render simulating GET
    renderCustomers(mockCustomers);
    document.getElementById("customer-search").addEventListener("input", filterCustomers);
    document.getElementById("customer-filter").addEventListener("change", filterCustomers);
  }

  // ---------- Messages rendering + search ----------
  if (document.getElementById("messages-list")) {
    function renderMessages(list) {
      const container = document.getElementById("messages-list");
      const empty = document.getElementById("messages-empty");
      container.innerHTML = "";
      if (list.length === 0) {
        empty.style.display = "block";
      } else {
        empty.style.display = "none";
        list.forEach(m => {
          const card = document.createElement("div");
          card.style.background = "#fff";
          card.style.padding = "16px";
          card.style.borderRadius = "10px";
          card.style.boxShadow = "0 6px 14px rgba(0,0,0,0.06)";
          card.innerHTML = `
            <div style="display:flex; justify-content:space-between; gap:12px; align-items:flex-start; flex-wrap:wrap;">
              <div style="flex:1; min-width:220px;">
                <strong>${m.name}</strong><br/>
                <small>${m.email}${m.phone ? " • " + m.phone : ""}</small>
              </div>
              <div style="text-align:right; min-width:140px;">
                <small style="color:#666">${m.date}</small><br/>
                <small style="color:#666">${m.subject}</small>
              </div>
            </div>
            <p style="margin-top:10px; color:#333">${m.message}</p>
          `;
          container.appendChild(card);
        });
      }
    }

    // initial render
    renderMessages(mockMessages);

    document.getElementById("messages-search").addEventListener("input", function () {
      const q = this.value.toLowerCase();
      const filtered = mockMessages.filter(m => {
        return (m.name + " " + m.email + " " + m.message + " " + (m.subject || "")).toLowerCase().includes(q);
      });
      renderMessages(filtered);
    });
  }
});


/* ======= REAL API INTEGRATION (append to script.js) ======= */

const API_BASE = ''; // empty -> same origin (http://localhost:3000)

// ---- Customers page: fetch real customers
async function loadCustomersFromApi() {
  const table = document.querySelector('#customer-table tbody');
  if (!table) return;

  const qInput = document.getElementById('customer-search');
  const filterSelect = document.getElementById('customer-filter');

  async function fetchAndRender() {
    const q = encodeURIComponent(qInput.value || '');
    const filter = encodeURIComponent(filterSelect.value || 'all');
    const res = await fetch(`${API_BASE}/api/customers?q=${q}&filter=${filter}`);
    const json = await res.json();
    if (!json.success) return;
    const customers = json.data || [];
    table.innerHTML = '';
    if (customers.length === 0) {
      document.getElementById('customers-empty').style.display = 'block';
    } else {
      document.getElementById('customers-empty').style.display = 'none';
      customers.forEach((c, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${idx+1}</td>
          <td>${c.name}</td>
          <td><a href="mailto:${c.email}">${c.email}</a></td>
          <td>${c.phone || '-'}</td>
          <td>${c.orders}</td>
          <td>${c.joined}</td>
        `;
        table.appendChild(tr);
      });
    }
  }

  qInput.addEventListener('input', fetchAndRender);
  filterSelect.addEventListener('change', fetchAndRender);
  // initial
  fetchAndRender();
}

// ---- Messages page: fetch real messages
async function loadMessagesFromApi() {
  const container = document.getElementById('messages-list');
  if (!container) return;
  const search = document.getElementById('messages-search');

  async function fetchAndRender() {
    const q = encodeURIComponent(search.value || '');
    const res = await fetch(`${API_BASE}/api/messages?q=${q}`);
    const json = await res.json();
    if (!json.success) return;
    const list = json.data || [];
    container.innerHTML = '';
    if (list.length === 0) {
      document.getElementById('messages-empty').style.display = 'block';
      return;
    } else {
      document.getElementById('messages-empty').style.display = 'none';
    }
    list.forEach(m => {
      const card = document.createElement('div');
      card.className = 'message-card';
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px; flex-wrap:wrap;">
          <div style="flex:1; min-width:220px;">
            <strong>${m.name}</strong><br/>
            <small>${m.email}${m.phone ? ' • ' + m.phone : ''}</small>
          </div>
          <div style="text-align:right; min-width:140px;">
            <small style="color:#666">${m.date}</small><br/>
            <small style="color:#666">${m.subject}</small>
          </div>
        </div>
        <p style="margin-top:10px; color:#333">${m.message}</p>
      `;
      container.appendChild(card);
    });
  }

  search.addEventListener('input', fetchAndRender);
  fetchAndRender();
}

// ---- Contact form: submit to backend
async function wireContactForm() {
  const concernForm = document.getElementById('concern-form');
  if (!concernForm) return;

  concernForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      subject: 'Contact Form',
      message: document.getElementById('message').value
    };

    try {
      const res = await fetch(`${API_BASE}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (json.success) {
        document.getElementById('concern-message').textContent = "📩 Thank you! Your message was sent.";
        document.getElementById('concern-message').style.display = 'block';
        concernForm.reset();
      } else {
        throw new Error(json.error || 'Server error');
      }
    } catch (err) {
      document.getElementById('concern-message').textContent = "⚠️ Error sending message. Try again.";
      document.getElementById('concern-message').style.display = 'block';
      console.error(err);
    }
  });
}

// ---- Feedback form: submit to backend
async function wireFeedbackForm() {
  const feedbackForm = document.getElementById('feedback-form');
  if (!feedbackForm) return;

  feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const rating = document.getElementById('star-rating').value || '';
    const feedback = document.getElementById('feedback').value || '';
    const payload = { rating, feedback };

    try {
      const res = await fetch(`${API_BASE}/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        document.getElementById('feedback-message').textContent = "✅ Thank you for your feedback!";
        document.getElementById('feedback-message').style.display = 'block';
        feedbackForm.reset();
        document.querySelectorAll('.star-rating span').forEach(s => s.classList.remove('active'));
      } else throw new Error(json.error || 'Server error');
    } catch (err) {
      document.getElementById('feedback-message').textContent = "⚠️ Could not submit feedback.";
      document.getElementById('feedback-message').style.display = 'block';
      console.error(err);
    }
  });
}

// run when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  loadCustomersFromApi();
  loadMessagesFromApi();
  wireContactForm();
  wireFeedbackForm();
});


