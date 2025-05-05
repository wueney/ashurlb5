document.addEventListener('DOMContentLoaded', function() {
    // Инициализация корзины
    updateCartCount();
    
    // Фильтрация товаров по цене
    const priceFilter = document.getElementById('price-filter');
    if (priceFilter) {
        priceFilter.addEventListener('change', function() {
            const value = this.value;
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                const price = parseFloat(card.getAttribute('data-price'));
                let show = true;
                
                if (value === '0-500' && price > 500) show = false;
                if (value === '500-1000' && (price <= 500 || price > 1000)) show = false;
                if (value === '1000' && price <= 1000) show = false;
                
                card.style.display = show ? 'block' : 'none';
            });
        });
    }
    
    // Плавная прокрутка для всех ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Проверка авторизации пользователя
    checkAuthStatus();
});

// Обновление счетчика корзины
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    document.querySelectorAll('#cart-count').forEach(element => {
        element.textContent = count;
    });
}

// Проверка статуса авторизации
function checkAuthStatus() {
    const loggedIn = localStorage.getItem('loggedIn');
    const userLinks = document.querySelectorAll('.user-link');
    
    if (loggedIn) {
        const userName = localStorage.getItem('userName') || 'Користувач';
        userLinks.forEach(link => {
            link.innerHTML = `<i class="fas fa-user"></i> ${userName}`;
        });
    }
}

// Функция для показа/скрытия модального окна
function toggleModal(modalId, show = true) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = show ? 'block' : 'none';
        
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Закрытие модального окна при клике вне его
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        toggleModal(e.target.id, false);
    }
});

// Инициализация карусели на главной странице (если нужно)
function initCarousel() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        let currentIndex = 0;
        const items = carousel.querySelectorAll('.carousel-item');
        const totalItems = items.length;
        
        if (totalItems <= 1) return;
        
        function showItem(index) {
            items.forEach((item, i) => {
                item.style.display = i === index ? 'block' : 'none';
            });
        }
        
        function nextItem() {
            currentIndex = (currentIndex + 1) % totalItems;
            showItem(currentIndex);
        }
        
        // Автопрокрутка каждые 5 секунд
        setInterval(nextItem, 5000);
        showItem(currentIndex);
    });
}

// Инициализация карусели при загрузке страницы
if (document.querySelector('.carousel')) {
    initCarousel();
}