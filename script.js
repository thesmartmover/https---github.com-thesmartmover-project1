document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('loginButton');
    const errorMessage = document.getElementById('errorMessage');
    const loginForm = document.getElementById('loginForm');
    
    const usernameGroup = document.getElementById('usernameGroup');
    const passwordGroup = document.getElementById('passwordGroup');
    const usernameIcon = document.getElementById('usernameValidationIcon');
    const passwordIcon = document.getElementById('passwordValidationIcon');
    
    // Функция для удаления пробелов с сохранением позиции курсора
    function processSpaces(inputElement) {
        const start = inputElement.selectionStart;
        const end = inputElement.selectionEnd;
        const originalValue = inputElement.value;
        const newValue = originalValue.replace(/\s/g, '');

        if (newValue === originalValue) {
            return { newValue, newStart: start, newEnd: end };
        }

        let spacesBeforeStart = 0;
        const limitStart = Math.min(start, originalValue.length);
        for (let i = 0; i < limitStart; i++) {
            if (originalValue[i] === ' ') spacesBeforeStart++;
        }

        let spacesBeforeEnd = 0;
        const limitEnd = Math.min(end, originalValue.length);
        for (let i = 0; i < limitEnd; i++) {
            if (originalValue[i] === ' ') spacesBeforeEnd++;
        }

        const newStart = Math.max(0, start - spacesBeforeStart);
        const newEnd = Math.max(0, end - spacesBeforeEnd);

        return { newValue, newStart, newEnd };

    }

    // Обработчик ввода для поля логина
    usernameInput.addEventListener('input', function(e) {
        const input = e.target;
        
        const { newValue, newStart, newEnd } = processSpaces(input);
        
        const finalValue = newValue.toLowerCase();

        if (finalValue !== input.value) {
            input.value = finalValue;
            input.setSelectionRange(newStart, newEnd);
        }

        validateUsername();
        updateLoginButtonState();
    });
    
    // Обработчик события вставки текста
    usernameInput.addEventListener('paste', function(e) {
        setTimeout(() => {
            const input = e.target;
            const raw = input.value;
            const cleaned = raw.replace(/\s/g, '').toLowerCase();
            if (cleaned !== input.value) {
                input.value = cleaned;
            }
            
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
        const usernameRegex = /^[a-z0-9]*$/;
        const isValid = usernameRegex.test(value);

        usernameGroup.classList.remove('valid', 'invalid');
        usernameIcon.classList.remove('valid', 'invalid');
        errorMessage.textContent = '';

        // Обновляем класс поля ввода
        if (value.length === 0) {
            return false;
        }

        if (isValid) {
            usernameGroup.classList.add('valid');
            usernameIcon.classList.add('valid');
            return true;
        } else {
            usernameGroup.classList.add('invalid');
            usernameIcon.classList.add('invalid');
            errorMessage.textContent = 'Логин может содержать только латинские буквы (a-z) и цифры (0-9)';
            return false;
        }
    }
    
    // Функция валидации пароля
    function validatePassword() {
        const value = passwordInput.value;
        const isValid = value.length >= 1;

        passwordGroup.classList.remove('valid', 'invalid');
        passwordIcon.classList.remove('valid', 'invalid');
        
        if (value.length === 0) {
            return false;
        }

        if (isValid) {
            passwordGroup.classList.add('valid');
            passwordIcon.classList.add('valid');
            return true;
        } else {
            passwordGroup.classList.add('invalid');
            passwordIcon.classList.add('invalid');
            return false;
        }
    }
    
    // Функция обновления состояния кнопки входа
    function updateLoginButtonState() {
        loginButton.disabled = !(validateUsername() && validatePassword());
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