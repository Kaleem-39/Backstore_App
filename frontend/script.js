let books = [];

async function fetchBooks() {
  const response = await fetch("http://127.0.0.1:8000/books");
  books = await response.json();
  displayBooks();
}

function displayBooks() {
  const tableBody = document.getElementById("bookTableBody");
  tableBody.innerHTML = "";

  books.forEach(book => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>$${book.price}</td>
      <td>
        <button onclick="editBook(${book.id})">Edit</button>
        <button onclick="deleteBook(${book.id})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

async function addBook() {
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const price = parseFloat(document.getElementById("price").value);

  if (!title || !author || isNaN(price)) {
    alert("Please fill all fields correctly.");
    return;
  }

  const book = {
    id: Date.now(),
    title,
    author,
    price
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book)
    });

    if (response.ok) {
      alert("✅ Book added successfully!");
      document.getElementById("title").value = "";
      document.getElementById("author").value = "";
      document.getElementById("price").value = "";
    } else {
      alert("❌ Failed to add book.");
    }
  } catch (error) {
    alert("⚠️ Error connecting to the server.");
  }
}

// Toggle between views
document.getElementById("addBtn").addEventListener("click", addBook);
document.getElementById("viewBtn").addEventListener("click", () => {
  document.getElementById("addBookSection").style.display = "none";
  document.getElementById("viewBooksSection").style.display = "block";
  fetchBooks();
});

document.getElementById("backBtn").addEventListener("click", () => {
  document.getElementById("viewBooksSection").style.display = "none";
  document.getElementById("addBookSection").style.display = "block";
});

// Placeholder edit function
function editBook(id) {
  alert(`Edit feature for Book ID ${id} not yet implemented.`);
}

// Placeholder delete function
function deleteBook(id) {
  alert(`Delete feature for Book ID ${id} not yet implemented.`);
}

// Show add book section by default
document.getElementById("addBookSection").style.display = "block";
