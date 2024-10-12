// scripts/main.js

let currentIndex = 0;
const carouselSlide = document.querySelector('.carousel-slide');
const carouselItems = document.querySelectorAll('.carousel-item');
const totalItems = carouselItems.length;
const itemWidth = carouselItems[0].offsetWidth + parseInt(window.getComputedStyle(carouselItems[0]).marginRight);

// Actualiza la posición del carrusel
function updateCarouselPosition() {
    carouselSlide.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

// Mueve el carrusel en la dirección especificada
function moveCarousel(direction) {
    currentIndex = (currentIndex + direction + totalItems) % totalItems;
    updateCarouselPosition();
}

// Inicializa la posición del carrusel
updateCarouselPosition();
carouselSlide.style.width = `${totalItems * itemWidth}px`;

// Agrega eventos a los botones del carrusel
document.addEventListener('DOMContentLoaded', function() {
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');

    prevButton.addEventListener('click', function() {
        moveCarousel(-1);
    });

    nextButton.addEventListener('click', function() {
        moveCarousel(1);
    });

    // Información de los productos
    const products = [
        {
            image: "Imagenes/Crema Volteada.jpg",
            title: "Crema Volteada",
            price: 10.00,
            description: "Delicioso postre de crema."
        },
        {
            image: "Imagenes/Torta Chocolate.jpg",
            title: "Torta de Chocolate",
            price: 12.00,
            description: "Exquisita torta de chocolate."
        },
        {
            image: "Imagenes/Pai de limon.jpg",
            title: "Pai de Limón",
            price: 15.00,
            description: "Fresco pai de limón."
        }
        // Puedes agregar más productos aquí
    ];

    // Agregar eventos a los botones de vista rápida
    const quickViewButtons = document.querySelectorAll('.quick-view');
    quickViewButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const product = products[index];
            openModal(product);
        });
    });

    // Pestañas en la sección de productos
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            tabPanes.forEach(pane => {
                pane.classList.toggle('active', pane.id === targetTab);
            });
        });
    });

    // Ajustar visibilidad de botones en el Product Display
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        const productImage = item.querySelector('.product-image');
        const productButtons = item.querySelector('.product-buttons');
        
        productImage.addEventListener('mouseover', () => {
            productButtons.style.opacity = '1';
        });

        productImage.addEventListener('mouseout', () => {
            productButtons.style.opacity = '0';
        });
    });
});

// Función para abrir el modal
function openModal(product) {
    const modal = document.getElementById('product-modal');
    const productImage = document.getElementById('modal-product-image');
    const productTitle = document.getElementById('modal-product-title');
    const productPrice = document.getElementById('modal-product-price');
    const productDescription = document.getElementById('modal-product-description');

    // Cargar información del producto en el modal
    productImage.src = product.image; 
    productTitle.textContent = product.title;
    productPrice.textContent = `S/ ${product.price.toFixed(2)}`;
    productDescription.textContent = product.description;

    modal.style.display = 'block'; // Muestra el modal
}

// Cerrar el modal
const closeModalButton = document.getElementById('close-modal');
closeModalButton.addEventListener('click', function() {
    const modal = document.getElementById('product-modal');
    modal.style.display = 'none'; // Oculta el modal
});

// Asegúrate de que la ventana se cierre al hacer clic fuera del modal
window.onclick = function(event) {
    const modal = document.getElementById('product-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Añadir al carrito (ejemplo básico)
const addToCartButton = document.getElementById('add-to-cart');
addToCartButton.addEventListener('click', function() {
    const quantity = parseInt(document.getElementById('quantity-display').textContent);
    alert(`Añadido ${quantity} unidades al carrito.`);
});

// Control de cantidad
let quantity = 1;
const quantityDisplay = document.getElementById('quantity-display');

document.getElementById('increase-quantity').addEventListener('click', function() {
    quantity++;
    quantityDisplay.textContent = quantity;
});

document.getElementById('decrease-quantity').addEventListener('click', function() {
    if (quantity > 1) {
        quantity--;
        quantityDisplay.textContent = quantity;
    }
});
