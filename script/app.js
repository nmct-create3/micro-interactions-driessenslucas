let passwordInput,
	ToggleCheckBox,
	passwordToggle,
	showIcon,
	hideIcon,
	emailField,
	passwordField;

let email = {},
	password = {},
	signInButton;

function handleFloatingLabel() {
	emailField.addEventListener('keydown', function () {
		if (!isEmpty(emailField.value)) {
			document
				.querySelector('.c-floating-email')
				.classList.add('c-label-floating');
		} else {
			document
				.querySelector('.c-floating-email')
				.classList.remove('c-label-floating');
		}
	});
	passwordInput.addEventListener('keydown', function () {
		if (!isEmpty(passwordInput.value)) {
			document
				.querySelector('.c-floating-password')
				.classList.add('c-label-floating');
		} else {
			document
				.querySelector('.c-floating-password')
				.classList.remove('c-label-floating');
		}
	});
}

const isValidEmailAddress = function (emailAddress) {
	// Basis manier om e-mailadres te checken.
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
};

const isValidPassword = function (password) {
	// return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
	// 	password
	// );
	return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password);
};

const isEmpty = function (fieldValue) {
	return !fieldValue || !fieldValue.length;
};

function addErorClass(element) {
	element.classList.add('has-error');
}
function removeErrorClass(element) {
	element.classList.remove('has-error');
}

function doubleCheckEmail(email) {
	if (isValidEmailAddress(email)) {
		removeErrorClass(document.querySelector('.c-form-field-email'));
	} else {
		addErorClass(document.querySelector('.c-form-field-email'));
	}
}

function doubleCheckPassword(password) {
	if (isValidPassword(password)) {
		removeErrorClass(document.querySelector('.c-form-field-password'));
	} else {
		addErorClass(document.querySelector('.c-form-field-password'));
	}
}

function enableListeners() {
	emailField.addEventListener('blur', (event) => {
		event.target.style.background = '';
		if (
			!isValidEmailAddress(event.target.value) ||
			isEmpty(event.target.value)
		) {
			addErorClass(document.querySelector('.c-form-field-email'));
			emailField.addEventListener('keydown', (event) => {
				doubleCheckEmail(event.target.value);
			});
		} else {
			removeErrorClass(document.querySelector('.c-form-field-email'));
		}
		console.log(isValidEmailAddress(event.target.value));
	});
	passwordInput.addEventListener('blur', (event) => {
		event.target.style.background = '';
		if (!isValidPassword(event.target.value) || isEmpty(event.target.value)) {
			addErorClass(document.querySelector('.c-form-field-password'));
			passwordInput.addEventListener('keydown', (event) => {
				doubleCheckPassword(event.target.value);
			});
		} else {
			removeErrorClass(document.querySelector('.c-form-field-password'));
		}
		isValidPassword(event.target.value);
		console.log(isValidPassword(event.target.value));
	});
	signInButton.addEventListener('click', (event) => {
		event.preventDefault();
		if (
			isValidEmailAddress(emailField.value) &&
			isValidPassword(passwordInput.value)
		) {
			console.log('succes');
			console.log('email: ' + emailField.value);
			console.log('password: ' + passwordInput.value);
		} else {
			console.log('error');
		}
	});
}

function handlePasswordSwitcher() {
	const passwordOptions = ['password', 'text'];

	passwordToggle.addEventListener('change', function () {
		passwordInput.type = passwordOptions[Number(+ToggleCheckBox.checked)];
		if (ToggleCheckBox.checked) {
			showIcon.classList.add('is-hidden');
			hideIcon.classList.remove('is-hidden');
		} else {
			showIcon.classList.remove('is-hidden');
			hideIcon.classList.add('is-hidden');
		}
	});
}
function getDomElements() {
	passwordInput = document.querySelector('.c-password-input');
	passwordToggle = document.querySelector('.c-toggle-password');
	ToggleCheckBox = document.querySelector('.c-toggle-password__checkbox');

	emailField = document.querySelector('.c-email-input');
	signInButton = document.querySelector('.c-sign-in-button');

	showIcon = document.querySelector('.c-toggle-password__icon--show');
	hideIcon = document.querySelector('.c-toggle-password__icon--hide');

	enableListeners();
}

document.addEventListener('DOMContentLoaded', function () {
	console.log('Script loaded!');
	getDomElements();
	handleFloatingLabel();
	handlePasswordSwitcher();
});
