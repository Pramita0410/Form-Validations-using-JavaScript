document.addEventListener('DOMContentLoaded', function () {
    var submitButton = document.getElementById('mysubmit');

    var checkboxes = document.querySelectorAll('input[name="source_survey"]');
    var lastCheckboxes = document.querySelectorAll('input[name="source"]');
    var radios = document.querySelectorAll('input[name="title"]');
    drinks = document.getElementById('drinks')
    var emailInput = document.getElementById("emailId")
    var phoneInput = document.getElementById("phoneNumber")
    var zipInput = document.getElementById("zipcode")
    var commentsInput = document.getElementById("comments")
    var lastCommentsInput = document.getElementById("commentsLast")
    var firstNameInput = document.getElementById("firstName")
    var lastNameInput = document.getElementById("lastName")


    var isAnyCheckboxChecked = false;
    var isAnyRadioButtonChecked = false;
    var isEmailValid = false;
    var isPhoneValid = false;
    var isZipValid = false;
    var isFirstNameValid = false;
    var isLastNameValid = false;
    var isCommentsValid = false;
    var isLastCommentsValid = true;
    var isAnyDrinkChecked = false;

    function updateSubmitButtonState() {

        if (isLastCommentsValid && isAnyDrinkChecked && isAnyRadioButtonChecked && isFirstNameValid && isLastNameValid && isEmailValid && isPhoneValid && isZipValid && isAnyCheckboxChecked && isCommentsValid) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    function checkCheckbox() {
        isAnyCheckboxChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
        updateSubmitButtonState()
    }

    function checkLastCheckbox() {
        isAnyLastCheckboxChecked = Array.from(lastCheckboxes).some(checkbox => checkbox.checked);
        if (isAnyLastCheckboxChecked) {
            isLastCommentsValid = false;
        } else {
            document.getElementById("commentsLast").value = '';
            isLastCommentsValid = true;
        }

        updateSubmitButtonState()
    }

    function checkRadioButton() {
        isAnyRadioButtonChecked = Array.from(radios).some(radio => radio.checked);
        updateSubmitButtonState()
    }

    function checkEmailValue() {
        isEmailValid = validateEmail(emailInput.value)
        updateSubmitButtonState()
    }

    function checkPhoneValue() {
        isPhoneValid = validatePhone(phoneInput.value)
        updateSubmitButtonState()
    }

    function checkZipValue() {
        isZipValid = validateZip(zipInput.value)
        updateSubmitButtonState()
    }

    function checkFirstNameValue() {
        isFirstNameValid = !isValidName(firstNameInput.value)
        updateSubmitButtonState()
    }

    function checkLastNameValue() {
        isLastNameValid = !isValidName(lastNameInput.value)
        updateSubmitButtonState()
    }

    function checkDrinksValue() {
        if (drinks.value != "default") {
            isAnyDrinkChecked = true
        } else {
            isAnyDrinkChecked = false
        }
        updateSubmitButtonState()
    }

    function checkCommentsValue() {
        if (commentsInput.value == null || commentsInput.value.length < 1) {
            isCommentsValid = false
        } else {
            isCommentsValid = true
        }
        updateSubmitButtonState()
    }

    function checkLastCommentsValue() {
        console.log(lastCheckboxes)
        isAnyLastCheckboxChecked = Array.from(lastCheckboxes).some(checkbox => checkbox.checked);
        console.log(isAnyLastCheckboxChecked)
        if (!isAnyLastCheckboxChecked || lastCommentsInput.value == null || lastCommentsInput.value.length < 1) {
            isLastCommentsValid = false
        } else {
            isLastCommentsValid = true
        }
        updateSubmitButtonState()
    }



    // Add change event listener to each checkbox
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', checkCheckbox);
    })

    lastCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', checkLastCheckbox);
    })

    radios.forEach(radio => {
        radio.addEventListener('change', checkRadioButton);
    })

    drinks.addEventListener('change', checkDrinksValue);


    emailInput.addEventListener('input', checkEmailValue);
    phoneInput.addEventListener('input', checkPhoneValue);
    zipInput.addEventListener('input', checkZipValue);
    commentsInput.addEventListener('input', checkCommentsValue);
    lastCommentsInput.addEventListener('input', checkLastCommentsValue);
    firstNameInput.addEventListener('input', checkFirstNameValue);
    lastNameInput.addEventListener('input', checkLastNameValue);



});

function isValidName(name) {
    var regexName = /^[a-zA-Z]+$/
    if (name == null || name.length < 2 || name.length > 10 || !name.trim().match(regexName)) {
        return true
    }
    return false
}

function validateName(event) {
    var id_field = event.target.id
    var val = event.target.value
    var err_msg_id = 'errMsg' + id_field
    err_p = document.getElementById(err_msg_id)

    if (isValidName(val)) {
        err_p.style.display = 'block'
    } else {
        err_p.style.display = 'none'
    }
}

function validateComments(event) {
    var id_field = event.target.id
    var val = event.target.value
    var err_msg_id = 'errMsg' + id_field
    err_p = document.getElementById(err_msg_id)
    if (val == null || val.length < 1) {
        err_p.style.display = 'block'
    } else {
        err_p.style.display = 'none'
    }
}

function validateLastComments(event) {
    var id_field = event.target.id
    var val = event.target.value
    var err_msg_id = 'errMsg' + id_field
    err_p = document.getElementById(err_msg_id)
    if (val == null || val.length < 1) {
        err_p.style.display = 'block'
    } else {
        err_p.style.display = 'none'
    }
}

function validateEmail(email) {
    var regexEmail = /^[a-zA-Z0-9._-]+@northeastern.edu$/
    return email.trim().match(regexEmail) ? true : false
}

function validatePhone(phone) {
    var regexPhone = /^\d{3}-?\d{3}-?\d{4}$/
    return phone.trim().match(regexPhone) ? true : false
}

function validateZip(zip) {
    var regexZip = /^\d{5}$/
    return zip.trim().match(regexZip) ? true : false
}

function validateEmailPhoneZip(event, type) {
    var id_field = event.target.id
    var val = event.target.value
    var err_msg_id = 'errMsg' + id_field
    err_p = document.getElementById(err_msg_id)

    if (type == 'email') {
        if (validateEmail(val)) {
            err_p.style.display = 'none'
        } else {
            err_p.style.display = 'block'
        }
    }

    if (type == 'phone') {
        if (validatePhone(val)) {
            err_p.style.display = 'none'
        } else {
            err_p.style.display = 'block'
        }
    }

    if (type == 'zip') {
        if (validateZip(val)) {
            err_p.style.display = 'none'
        } else {
            err_p.style.display = 'block'
        }
    }
}

function showText() {
    var drinks_val = document.getElementById("drinks").value;
    document.getElementById("java").style.display = "none";
    document.getElementById("ice").style.display = "none";
    document.getElementById("strawberry").style.display = "none";
    document.getElementById("mocha").style.display = "none";
    document.getElementById("macchiato").style.display = "none";


    if (drinks_val == "Java chip") {
        document.getElementById("java").style.display = "block";
    } else if (drinks_val == "Ice latte") {
        document.getElementById("ice").style.display = "block";
    } else if (drinks_val == "Strawberry Frappe") {
        document.getElementById("strawberry").style.display = "block";
    } else if (drinks_val == "Mocha Cookie") {
        document.getElementById("mocha").style.display = "block";
    }
    else if (drinks_val == "Macchiato") {
        document.getElementById("macchiato").style.display = "block";
    }
}

function showUP(checkbox) {
    var box = document.getElementById("last_comments")
    if (checkbox.checked) {
        box.style.display = "block"
        document.getElementById("last_comments").attributes["required"] = true;
    } else {
        box.style.display = "none"
        document.getElementById("last_comments").attributes["required"] = true;
    }

}

document.getElementById('feedback_form').addEventListener('submit', function (event) {
    event.preventDefault();
    var title = document.querySelectorAll('input[name="title"]:checked')[0].value
    var first_name = document.getElementById('firstName').value;
    var last_name = document.getElementById('lastName').value;
    var full_name = title + " " + first_name + " " + last_name
    var email = document.getElementById('emailId').value;
    var phone = document.getElementById('phoneNumber').value;
    var zip = document.getElementById('zipcode').value;
    var sources = document.querySelectorAll('input[name="source_survey"]:checked')
    var all_source = ''
    sources.forEach(source => {
        all_source += source.value + ", ";
    })
    all_source = all_source.slice(0, -2);
    var comments = document.getElementById('comments').value;
    var drinks = document.getElementById('drinks').value;
    var last_comments = document.getElementById('commentsLast').value;

    var table = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    var row = table.insertRow();
    var cellFullName = row.insertCell(0);
    var cellEmail = row.insertCell(1);
    var cellPhone = row.insertCell(2);
    var cellZip = row.insertCell(3);
    var cellSource = row.insertCell(4);
    var cellComments = row.insertCell(5);
    var cellDrinks = row.insertCell(6);
    var cellLastComments = row.insertCell(7);

    cellFullName.textContent = full_name;
    cellEmail.textContent = email;
    cellPhone.textContent = phone;
    cellZip.textContent = zip;
    cellSource.textContent = all_source;
    cellComments.textContent = comments;
    cellDrinks.textContent = drinks;
    cellLastComments.textContent = last_comments;
    var element = document.getElementById("feedback_form");
    element.reset()
});