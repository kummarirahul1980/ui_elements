const UsernameBox = document.getElementById('UsernameInputBox');
const PasswordBox = document.getElementById('PasswordInputBox');

const SubmitButton = document.getElementById('SubmitButton');


SubmitButton.addEventListener('click', button=> {
    button.preventDefault();

    username = UsernameBox.value;
    password = PasswordBox.value;
    data  = {
        username : username,
        password : password
    }
    if (!(username && password)){
        alert("Please fill in the details \n"+username+"password :"+password);
        return  data
    }

    fetch(window.location.href, {
        method : "post",
        headers : {
            "X-CSRFToken" : document.getElementsByName('csrfmiddlewaretoken')[0].value,
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    }).then(response => {
        if (response.status == 200) {
            window.location.href = status.next ? status.next : '/dashboard';
        }
    })
})