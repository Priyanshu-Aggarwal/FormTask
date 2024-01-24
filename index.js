const ValidateData = (event) => {
    event.preventDefault();

    var firstName = document.getElementById("Firstname").value;
    var lastName = document.getElementById("Lastname").value;
    var email = document.getElementById("Email").value;
    var username = document.getElementById("Username").value;
    var password = document.getElementById("Password").value;
    var confirmPassword = document.getElementById("ConfirmPassword").value;

    if (firstName === "" || lastName === "" || email === "" ||
        username === "" || password === "" || confirmPassword === "") {
        displayMessage("All fields are mandatory", "red")
        return;
    }

    if (password != confirmPassword) {
        displayMessage("Password and confirm password should be same", "red")
        return;
    }

    var formData = {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Username: username,
        Password: password,
        ConfirmPassword: confirmPassword
    }

    fetch('http://localhost:3000/insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })

        .then(response => {
            if (!response.ok) {
                throw response
            }
            return response.json()
        })
        .then(data => {
            console.log('Success:', data);
            displayMessage(data.message, "green")
        })
        .catch(error => {
            error.json().then(error => {
                displayMessage(error.message, "red")
            })

        });
}


const displayMessage = (message, props) => {
    var tag = document.getElementById("message");
    tag.innerHTML = message
    tag.style.color = props;

    setTimeout(function () {
        tag.innerText = "";
    }, 2000)
}
