// === TOAST HANDLER ===
function showToast(title, message, type = 'normal', duration = 3000) {
    const toastComponent = document.getElementById('toast-component');
    const toastTitle = document.getElementById('toast-title');
    const toastMessage = document.getElementById('toast-message');
    
    if (!toastComponent) return;
  
    toastComponent.classList.remove(
      'bg-red-50', 'border-red-500', 'text-red-600',
      'bg-green-50', 'border-green-500', 'text-green-600',
      'bg-white', 'border-gray-300', 'text-gray-800'
    );
  
    if (type === 'success') {
      toastComponent.classList.add('bg-green-50', 'border-green-500', 'text-green-600');
      toastComponent.style.border = '1px solid #22c55e';
    } else if (type === 'error') {
      toastComponent.classList.add('bg-red-50', 'border-red-500', 'text-red-600');
      toastComponent.style.border = '1px solid #ef4444';
    } else {
      toastComponent.classList.add('bg-white', 'border-gray-300', 'text-gray-800');
      toastComponent.style.border = '1px solid #d1d5db';
    }
  
    toastTitle.textContent = title;
    toastMessage.textContent = message;
  
    toastComponent.classList.remove('opacity-0', 'translate-y-64');
    toastComponent.classList.add('opacity-100', 'translate-y-0');
  
    setTimeout(() => {
      toastComponent.classList.remove('opacity-100', 'translate-y-0');
      toastComponent.classList.add('opacity-0', 'translate-y-64');
    }, duration);
  }
  
  // === HELPER AMBIL CSRF TOKEN ===
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + "=")) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  
  //READ PRODUCT
  async function fetchProducts(filterType = "all") {
    const res = await fetch(`/json/?filter=${filterType}`);
    const data = await res.json();
  
    const container = document.getElementById("product-container");
    container.innerHTML = "";
  
    const currentUser = data.current_user;
    const products = data.products;
  
    if (products.length === 0) {
      container.innerHTML = "<p>No products found.</p>";
      return;
    }
  
    products.forEach(p => {
      const isOwner = p.user_username === currentUser;
  
      const div = document.createElement("div");
      div.className = "bg-white rounded-lg p-4 mb-4 shadow-sm";
  
      const thumbnailHTML = p.thumbnail
        ? `<img src="${p.thumbnail}" alt="${p.name}" class="w-40 h-auto rounded mb-3">`
        : "";
  
      const ownerButtons = isOwner ? `
        <button class="btn-edit px-3 py-1 rounded text-white bg-gray-500 hover:bg-gray-700 text-sm"
          data-id="${p.id}"
          data-name="${p.name}"
          data-price="${p.price}"
          data-stock="${p.stock}"
          data-description="${p.description}"
          data-is_favorite="${p.is_favorite}">
          Edit
        </button>
        <button class="btn-delete px-3 py-1 rounded text-white bg-red-500 hover:bg-red-600 text-sm"
          data-id="${p.id}"
          data-name="${p.name}">
          Delete
        </button>` : "";
  
      div.innerHTML = `
        <div class="flex items-center gap-2 mb-2">
          <h2 class="text-2xl font-bold text-[#122C4F]">${p.name}</h2>
        </div>
        ${thumbnailHTML}
        <p class="mb-2 text-gray-800">${p.description || ''}</p>
        <p class="text-gray-700 mb-2"><b>Harga:</b> Rp${p.price}</p>
        <div class="flex gap-2">${ownerButtons}</div>
      `;
      container.appendChild(div);
    });
  }
  
    // === EDIT PRODUCT ===
    async function editProduct(id) {
      // pastikan sudah fetch products sebelumnya
      
      const product = products.find(p => p.id === id);
      if (!product) return;
      document.getElementById("product-id").value = product.id;
      document.getElementById("name").value = product.name;
      document.getElementById("category").value = product.category;
      document.getElementById("price").value = product.price;
      document.getElementById("stock").value = product.stock;
      document.getElementById("description").value = product.description;
      document.getElementById("thumbnail").value = product.thumbnail; // tambahkan
      document.getElementById("is_favorite").checked = product.is_favorite; // checkbox
      openCreateModal();
  }
  
  // === DELETE PRODUCT ===
  async function deleteProduct(id) {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/products/${id}/delete`, {
      method: "POST",
      headers: { "X-CSRFToken": getCookie("csrftoken") },
    });
  
    if (res.ok) {
      showToast("Deleted", "Product deleted successfully!", "success");
      fetchProducts();
    } else {
      showToast("Error", "Failed to delete product.", "error");
    }
  }
  
  // === INIT FETCH ===
  window.addEventListener("DOMContentLoaded", fetchProducts);
  
  // === LOGIN (AJAX) ===
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(loginForm);
      const res = await fetch("/login/", {
        method: "POST",
        headers: { "X-Requested-With": "XMLHttpRequest" },
        body: formData,
      });
      const data = await res.json();
      if (data.status === "success") {
        showToast("Welcome!", data.message, "success");
        setTimeout(() => (window.location.href = data.redirect_url), 1000);
      } else {
        showToast("Login Failed", data.message, "error");
      }
    });
  }
  
  // === REGISTER (AJAX) ===
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(registerForm);
      const res = await fetch("/register/", {
        method: "POST",
        headers: { "X-Requested-With": "XMLHttpRequest" },
        body: formData,
      });
  
      const data = await res.json();
      if (data.status === "success") {
        showToast("Registered!", data.message, "success");
        setTimeout(() => (window.location.href = "/login/"), 1500);
      } else {
        showToast("Register Failed", data.message, "error");
      }
    });
  }

  //Modal lain
  const spinner = document.getElementById("spinner");
  const grid = document.getElementById("productGrid");
  const emptyMsg = document.getElementById("emptyMsg");
  const errorMsg = document.getElementById("errorMsg")
  const csrftoken = getCookie("csrftoken");
  
  function showSpinner() { spinner.classList.remove("hidden"); }
  function hideSpinner() { spinner.classList.add("hidden"); }


  // === MODAL CREATE / EDIT PRODUCT ===
  const modal = document.getElementById("productModal");
  const productForm = document.getElementById("productForm");
  const modalTitle = document.getElementById("modalTitle");
  const cancelModal = document.getElementById("cancelModal");
  const addBtn = document.getElementById("btn-add");
  
  // buka modal tambah produk
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      modalTitle.textContent = "Add Product";
      productForm.reset();
      document.getElementById("productId").value = "";
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });
  }
  
  // tutup modal
  if (cancelModal) {
    cancelModal.addEventListener("click", () => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    });
  }
  
  // buka modal edit produk
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-edit")) {
      modalTitle.textContent = "Edit Product";
      modal.classList.remove("hidden");
      modal.classList.add("flex");
  
      const id = e.target.dataset.id;
      document.getElementById("productId").value = id;
      document.getElementById("productName").value = e.target.dataset.name;
      document.getElementById("productCategory").value = e.target.dataset.category;
      document.getElementById("productPrice").value = e.target.dataset.price;
      document.getElementById("productStock").value = e.target.dataset.stock;
      document.getElementById("productDesc").value = e.target.dataset.description;
      document.getElementById("productFav").checked = e.target.dataset.is_favorite === "true";
      document.getElementById("productThumbnail").value = e.target.dataset.thumbnail;
    }
  });
  
  
  // submit form via AJAX
  if (productForm) {
    productForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(productForm);
      const id = document.getElementById("product-id").value;
      const url = id ? `/ajax/products/update/${id}/` : `/ajax/products/create/`;
    
      formData.set("is_favorite", document.getElementById("is_favorite").checked ? "on" : "");

      formData.set("description", document.getElementById("description").value);
    
      const res = await fetch(url, {
        method: "POST",
        body: formData,
        headers: { 
          "X-CSRFToken": csrftoken,
          "X-Requested-With": "XMLHttpRequest"
        }
      });
    
      const data = await res.json();
      if (data.status === "success") {
        showToast("Success", "Product saved successfully!", "success");
        closeModal();
        fetchProducts();
      } else {
        showToast("Error", "Failed to save product.", "error");
      }
    });    
  }
  
  // === MODAL KONFIRMASI DELETE ===
const deleteModal = document.getElementById("deleteModal");
const deleteMessage = document.getElementById("deleteMessage");
const cancelDelete = document.getElementById("cancelDelete");
const confirmDelete = document.getElementById("confirmDelete");

let productToDeleteId = null;

// buka modal konfirmasi delete
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-delete")) {
      productToDeleteId = e.target.dataset.id;
      const name = e.target.dataset.name;
      deleteMessage.textContent = `Are you sure you want to delete "${name}"?`;
  
      deleteModal.classList.remove("hidden");
      deleteModal.classList.add("flex", "show"); // ✨ tambah class show
    }
  });

// batal hapus
if (cancelDelete) {
    cancelDelete.addEventListener("click", () => {
      deleteModal.classList.add("hidden");
      deleteModal.classList.remove("flex", "show"); // ✨ remove show
      productToDeleteId = null;
    });
  }

// konfirmasi hapus
if (confirmDelete) {
  confirmDelete.addEventListener("click", async () => {
    if (!productToDeleteId) return;

    const res = await fetch(`/products/${productToDeleteId}/delete`, {
      method: "POST",
      headers: { "X-CSRFToken": getCookie("csrftoken") },
    });

    if (res.ok) {
      showToast("Deleted", "Product deleted successfully!", "success");
      deleteModal.classList.add("hidden");
      deleteModal.classList.remove("flex");
      fetchProducts(); // refresh list
    } else {
      showToast("Error", "Failed to delete product.", "error");
    }

    productToDeleteId = null;
  });
}

function renderProducts(products) {
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<p class='text-gray-500'>No products found.</p>";
    return;
  }

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "border rounded-lg shadow p-4";

    card.innerHTML = `
      <img src="${p.thumbnail}" class="w-full h-40 object-cover rounded mb-2">
      <h3 class="font-semibold">${p.name}</h3>
      <p class="text-sm text-gray-600">${p.category}</p>
      <p class="text-sm text-gray-800 mt-2">Rp${p.price}</p>
      <p class="text-xs text-gray-500">${p.stock} in stock</p>
      ${p.is_favorite ? '<p class="text-yellow-500 text-sm mt-1">★ Favorite</p>' : ''}
      ${p.owner === CURRENT_USER ? `
        <div class="flex gap-2 mt-3">
          <button onclick="openEditModal(${p.id})" class="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
          <button onclick="openDeleteModal(${p.id})" class="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
        </div>
      ` : ''}
    `;

    container.appendChild(card);
  });
}

async function fetchProducts(filter="all") {
  showSpinner();
  emptyMsg.classList.add("hidden");
  errorMsg.classList.add("hidden");
  grid.innerHTML = "";

  try {
    const res = await fetch(`/ajax/products/get/?filter=${filter}`);
    const data = await res.json();
    hideSpinner();

    if (!data.products || data.products.length === 0) {
      emptyMsg.classList.remove("hidden");
      return;
    }

    data.products.forEach(p => {
      const isOwner = p.user_username === data.current_user;
      const card = document.createElement("div");
      card.className = "bg-white p-4 rounded-xl shadow hover:shadow-lg";

      card.innerHTML = `
        <img src="${p.thumbnail}" class="w-full h-40 object-cover rounded mb-2">
        <h2 class="font-semibold">${p.name}</h2>
        <p>${p.category}</p>
        <p>💰 Rp${p.price} | 📦 ${p.stock}</p>
        <p>${p.description || ''}</p>
        ${p.is_favorite ? '<p class="text-yellow-500">★ Favorite</p>' : ''}
        ${isOwner ? `
          <div class="flex gap-2 mt-2">
            <button onclick="editProduct(${p.id})" class="px-3 py-1 bg-yellow-400 text-white rounded">Edit</button>
            <button onclick="deleteProduct(${p.id})" class="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
          </div>` : ''}
      `;
      grid.appendChild(card);
    });

  } catch(err) {
    hideSpinner();
    errorMsg.classList.remove("hidden");
    console.error(err);
  }
}

async function openEditModal(id) {
  const res = await fetch(`/ajax/products/get/?id=${id}`);
  const data = (await res.json()).products[0]; // ambil 1 produk

  document.getElementById("modal-title").innerText = "Edit Product";
  document.getElementById("product-id").value = data.id;
  document.getElementById("name").value = data.name;
  document.getElementById("category").value = data.category;
  document.getElementById("price").value = data.price;
  document.getElementById("stock").value = data.stock;
  document.getElementById("description").value = data.description; 
  document.getElementById("thumbnail").value = data.thumbnail;
  document.getElementById("is_favorite").checked = data.is_favorite;
  document.getElementById("product-modal").classList.remove("hidden");
}

async function openCreateModal() {
  modal.classList.remove("hidden");
  document.getElementById("modal-title").textContent = "Add Product";
  productForm.reset();
}
function closeModal() { modal.classList.add("hidden"); }

async function openDeleteModal(id) {
  if (!confirm("Are you sure you want to delete this product?")) return;

  const res = await fetch(`/ajax/products/delete/${id}/`, { method: "POST" });
  if (res.ok) {
    fetchProducts('all');
  } else {
    alert("Failed to delete product.");
  }
}

  