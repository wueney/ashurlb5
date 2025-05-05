document.addEventListener('DOMContentLoaded', function() {
    // Получаем элемент выбора языка
    const languageSelector = document.getElementById('language-selector');
    
    // Проверяем сохраненный язык в localStorage или используем украинский по умолчанию
    const savedLanguage = localStorage.getItem('language') || 'uk';
    
    // Устанавливаем выбранный язык в селекторе
    if (languageSelector) {
        languageSelector.value = savedLanguage;
    }
    
    // Применяем выбранный язык сразу при загрузке страницы
    toggleLanguage(savedLanguage);
    
    // Обработчик изменения языка
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            const selectedLanguage = this.value;
            localStorage.setItem('language', selectedLanguage);
            toggleLanguage(selectedLanguage);
        });
    }
});

// Функция для переключения между языками
function toggleLanguage(language) {
    // Скрываем все элементы не выбранного языка
    const hideLang = language === 'uk' ? 'en' : 'uk';
    document.querySelectorAll(`.lang-${hideLang}`).forEach(el => {
        el.style.display = 'none';
    });
    
    // Показываем элементы выбранного языка
    document.querySelectorAll(`.lang-${language}`).forEach(el => {
        el.style.display = 'block';
    });
    
    // Обновляем текст кнопок и других динамических элементов
    updateDynamicText(language);
}

// Функция для обновления динамического текста (атрибуты data-lang)
function updateDynamicText(language) {
    if (language === 'uk') {
        // Украинский язык
        document.querySelectorAll('[data-lang-uk]').forEach(el => {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
                el.placeholder = el.getAttribute('data-lang-uk');
            } else {
                el.textContent = el.getAttribute('data-lang-uk');
            }
        });
    } else {
        // Английский язык
        document.querySelectorAll('[data-lang-en]').forEach(el => {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
                el.placeholder = el.getAttribute('data-lang-en');
            } else {
                el.textContent = el.getAttribute('data-lang-en');
            }
        });
    }
}

// Инициализация языка при загрузке страницы
function initLanguage() {
    const savedLanguage = localStorage.getItem('language') || 'uk';
    toggleLanguage(savedLanguage);
}

// Вызываем инициализацию при загрузке страницы
initLanguage();