const loginButton = document.querySelector('.login-btn');

loginButton.addEventListener('click', function (event) {
    const emailInput = document.querySelector('.email-input');
    const passwordInput = document.querySelector('.password-input');
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    const errorMessageElement = document.getElementById('error-messages');
    errorMessageElement.textContent = '';

    if (isEmpty(emailValue) && isEmpty(passwordValue)) {
        displayErrorMessage('Заполните пустые поля!', errorMessageElement);
        event.preventDefault();
        return;
    }

    const errorMessages = [];

    if (!isEmpty(emailValue) && !containsSymbol(emailValue, '@')) {
        errorMessages.push('Отсутствует символ @');
    }

    if (!isEmpty(emailValue)) {
        const emailParts = emailValue.split('@');
        const username = emailParts[0];
        if (!containsOnlyLetters(username)) {
            errorMessages.push('Перед символом @ должны быть только английские буквы');
        }
    }

    if (!isEmpty(passwordValue) && passwordValue.length < 6) {
        errorMessages.push('Пароль должен содержать не менее 6 символов');
    }

    if (errorMessages.length > 0) {
        displayErrorMessage(errorMessages.join('<br>'), errorMessageElement);
        event.preventDefault();
    }
});

function isEmpty(value) {
    return value.trim() === '';
}

function containsSymbol(value, symbol) {
    return value.includes(symbol);
}

function containsOnlyLetters(value) {
    return /^[a-zA-Z]+$/.test(value);
}

function displayErrorMessage(message, element) {
    element.innerHTML = `<img src="images/message-warning-ico.png" alt="Error"> ${message}`;
    element.style.display = 'flex';
    element.style.alignItems = 'center';
    element.style.justifyContent = 'space-between';
}
