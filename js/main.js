const productList = document.getElementById('product-list');
const loadMoreBtn = document.getElementById('load-more');

let products = [];
let visibleCount = 4;

async function fetchProducts() {
  const res = await fetch('https://fakestoreapi.com/products');
  products = await res.json();
  renderProducts();
}

function renderProducts() {
  productList.innerHTML = '';
  products.slice(0, visibleCount).forEach(product => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
    `;
    productList.appendChild(card);
  });

  if (visibleCount >= products.length) {
    loadMoreBtn.style.display = 'none';
  }
}

loadMoreBtn.addEventListener('click', () => {
  visibleCount += 4;
  renderProducts();
});

fetchProducts();
