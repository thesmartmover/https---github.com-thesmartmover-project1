document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('loginButton');
    const errorMessage = document.getElementById('errorMessage');
    const loginForm = document.getElementById('loginForm');
    
    // Иконки валидации для полей
    const usernameValidationIcon = usernameInput.nextElementSibling;
    const passwordValidationIcon = passwordInput.nextElementSibling;
    
    // Регулярное выражение для проверки логина (только латинские буквы в нижнем регистре и цифры)
    const usernameRegex = /^[a-z0-9]*$/;
    
    // Функция для удаления пробелов с сохранением позиции курсора
    function removeSpacesWithCursorPreservation(inputElement) {
        const start = inputElement.selectionStart;
        const end = inputElement.selectionEnd;
        let value = inputElement.value;
        
        // Сохраняем исходную длину
        const originalLength = value.length;
        
        // Удаляем все пробелы
        const newValue = value.replace(/\s/g, '');
        
        // Если значение изменилось
        if (newValue !== value) {
            // Устанавливаем новое значение
            inputElement.value = newValue;
            
            // Корректируем позицию курсора
            // Подсчитываем количество пробелов до текущей позиции курсора
            let spacesBeforeCursor = 0;
            for (let i = 0; i < Math.min(start, originalLength); i++) {
                if (value[i] === ' ') {
                    spacesBeforeCursor++;
                }
            }
            
            // Новая позиция курсора = старая позиция минус количество пробелов до нее
            const newStart = Math.max(0, start - spacesBeforeCursor);
            const newEnd = Math.max(0, end - spacesBeforeCursor);
            
            // Устанавливаем новую позицию курсора
            setTimeout(() => {
                inputElement.setSelectionRange(newStart, newEnd);
            }, 0);
        }
        
        return newValue;
    }
    
    // Обработчик ввода для поля логина
    usernameInput.addEventListener('input', function(e) {
        // Сохраняем текущую позицию курсора
        const start = e.target.selectionStart;
        
        // Удаляем пробелы с сохранением позиции курсора
        let value = removeSpacesWithCursorPreservation(e.target);
        
        // Преобразуем все символы в нижний регистр
        value = value.toLowerCase();
        
        // Если значение изменилось после преобразования в нижний регистр
        if (value !== e.target.value) {
            e.target.value = value;
            // Устанавливаем курсор в конец, если были изменения регистра
            setTimeout(() => {
                e.target.setSelectionRange(value.length, value.length);
            }, 0);
        }
        
        // Проверяем валидность введенного значения
        validateUsername();
        updateLoginButtonState();
    });
    
    // Обработчик события вставки текста
    usernameInput.addEventListener('paste', function(e) {
        // Даем браузеру вставить текст, затем обрабатываем
        setTimeout(() => {
            // Удаляем пробелы и преобразуем в нижний регистр
            let value = e.target.value;
            value = value.replace(/\s/g, '').toLowerCase();
            e.target.value = value;
            
            // Проверяем валидность
            validateUsername();
            updateLoginButtonState();
        }, 0);
    });
    
    // Обработчик ввода для поля пароля
    passwordInput.addEventListener('input', function() {
        validatePassword();
        updateLoginButtonState();
    });
    
    // Функция валидации логина
    function validateUsername() {
        const value = usernameInput.value;
        const isValid = usernameRegex.test(value);
        
        // Обновляем класс поля ввода
        if (value.length === 0) {
            usernameInput.classList.remove('valid', 'invalid');
            usernameValidationIcon.className = 'validation-icon';
            errorMessage.textContent = '';
        } else if (isValid) {
            usernameInput.classList.remove('invalid');
            usernameInput.classList.add('valid');
            usernameValidationIcon.className = 'validation-icon valid';
            errorMessage.textContent = '';
        } else {
            usernameInput.classList.remove('valid');
            usernameInput.classList.add('invalid');
            usernameValidationIcon.className = 'validation-icon invalid';
            errorMessage.textContent = 'Логин может содержать только латинские буквы (a-z) и цифры (0-9)';
        }
        
        return isValid;
    }
    
    // Функция валидации пароля
    function validatePassword() {
        const value = passwordInput.value;
        const isValid = value.length >= 1;
        
        // Обновляем класс поля ввода
        if (value.length === 0) {
            passwordInput.classList.remove('valid', 'invalid');
            passwordValidationIcon.className = 'validation-icon';
        } else if (isValid) {
            passwordInput.classList.remove('invalid');
            passwordInput.classList.add('valid');
            passwordValidationIcon.className = 'validation-icon valid';
        } else {
            passwordInput.classList.remove('valid');
            passwordInput.classList.add('invalid');
            passwordValidationIcon.className = 'validation-icon invalid';
        }
        
        return isValid;
    }
    
    // Функция обновления состояния кнопки входа
    function updateLoginButtonState() {
        const isUsernameValid = validateUsername();
        const isPasswordValid = validatePassword();
        
        if (isUsernameValid && isPasswordValid) {
            loginButton.disabled = false;
        } else {
            loginButton.disabled = true;
        }
    }
    
    // Обработчик отправки формы
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateUsername() || !validatePassword()) {
            errorMessage.textContent = 'Пожалуйста, исправьте ошибки в форме';
            return;
        }
        
        // Имитация отправки формы
        errorMessage.textContent = '';
        loginButton.textContent = 'Вход...';
        loginButton.disabled = true;
        
        // Имитация задержки запроса на сервер
        setTimeout(() => {
            alert(`Вход выполнен успешно!\nЛогин: ${usernameInput.value}\nПароль: ${'*'.repeat(passwordInput.value.length)}`);
            loginButton.textContent = 'Войти';
            loginButton.disabled = false;
            
            // В реальном приложении здесь был бы редирект
            // loginForm.reset();
            // updateLoginButtonState();
        }, 1000);
    });
    
    // Инициализация состояния кнопки
    updateLoginButtonState();
});