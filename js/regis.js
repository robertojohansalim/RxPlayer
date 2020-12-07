var FirstName_el;
var LastName_el;
var Email_el;
var Password_el;
var Payment_el;
var tc_el;
var radios_el;


window.onload = function(){
    FirstName_el = document.getElementById("name1");
    LastName_el = document.getElementById("name2");
    Email_el = document.getElementById("email");
    Password_el = document.getElementById("password");
    Payment_el = document.getElementById("payment");
    tc_el = document.getElementById("tc");
    radios_el = document.getElementsByName('gender');
}

function hasNumber(x) {
    for (var i = 0; i < x.length; i++) {
        console.log(x.charAt(i));
        if(x.charAt(i) >= '0' && x.charAt(i) <= '9'){
            return true;
        }
    }
    return false;
}

function hasUpper(x){
    for (var i = 0; i < x.length; i++) {
        console.log(x.charAt(i));
        if(x.charAt(i) >= 'A' && x.charAt(i) <= 'Z'){
            return true;
        }
    }
    return false;
}

function clearErrorLabels(){
    // $('.error_label').innerHTML = ""; // If JQuery is Available
    var error_labels = document.getElementsByClassName("error_label");
    for(var i = 0; i < error_labels.length; i++){
        error_labels[i].innerHTML = "";
    }
}

function writeErrorLabel(id, message){
    // If JQuery is not Allowd
    // document.getElementById(id).innerHTML = message;

    //If JQuery is allowed
    id = "#" + id;
    message = "<span>" + message + "</span>"
    $(message).hide().appendTo(id).fadeIn(200);
}

function validate(){
    var name1, name2, email, password, gender, payment, tc;
    var gender;

    name1 = FirstName_el.value;
    name2 = LastName_el.value;
    email = Email_el.value;
    password = Password_el.value;
    payment = Payment_el.value;
    tc = tc_el;
    radios = radios_el;

    //Getting Radio Value
    for (var i = 0, length = radios.length; i < length; i++) {
        var radioCheck = 0;
        if (radios[i].checked) {
            console.log("Radio Value: " + radios[i].value)
            gender = radios[i].value;
            radioCheck = 1;
            break;
        }
    }

    console.log(name1);
    console.log(name2);
    console.log(email);
    console.log(password);
    console.log(payment);


    //Clearing Labels
    clearErrorLabels();
    var isValidate = true;

    /* Name Validation */
    // First Name
    if(name1 === ""){
        // alert('Name must be filled!')
        isValidate = false;
        writeErrorLabel("FName_error_label", "Must Be filled")
    }
    else if(name1.length < 5){
        isValidate = false;
        writeErrorLabel("FName_error_label", "Length must be at least 5 characters")
    }
    // Last Name
    if(name2 === ""){
        // alert('Name must be filled!')
        isValidate = false;
        writeErrorLabel("LName_error_label", "Must Be filled")
    }
    else if(name2.length < 5){
        isValidate = false;
        writeErrorLabel("LName_error_label", "Length must be at least 5 characters")
    }

    /* Email Validation */
    if(email === ""){
        // alert('Name must be filled!')
        isValidate = false;
        writeErrorLabel("email_error_label", "Must Be filled")
    }
    else if(!email.includes("@") || !email.includes(".com")){
        // alert('Enter a valid email!')
        isValidate = false;
        writeErrorLabel("email_error_label", "Invalid Email Format")
    }

    /* Password Validation */
    if(password === ""){
        // alert('Password must be filled!')
        isValidate = false;
        writeErrorLabel("password_error_label", "Must Be filled")
    }
    else{
        var error_msg = "";
        if(password.length < 8){
            // alert('Password length must be at least 8 characters!')
            isValidate = false;
            error_msg += "<br> &nbsp&nbsp At least 8 Characters"
        }
        if(!hasNumber(password)){
            // alert('Password must contain at least 1 number!')
            isValidate = false;
            error_msg  += "<br> &nbsp&nbsp At least one Number!"
        }
        if(!hasUpper(password)){
            // alert('Password must contain at least 1 uppercase letter!')
            isValidate = false;
            error_msg  += "<br> &nbsp&nbsp At least one Uppercase"
        }
        writeErrorLabel("password_error_label", error_msg)
    }

    /* Gender Validation */
    if(radioCheck == 0){
        // alert('Please select a gender!')
        isValidate = false;
        writeErrorLabel("gender_error_label", "Must be Selected")
    }

    /* Payment Validation */
    if(payment === "not-selected"){
        // alert('Please select a payment method!')
        isValidate = false;
        writeErrorLabel("payment_error_label", "Must be Selected")
    }

    /* Terms & Condition Validation */
    if(tc.checked == false){
        isValidate = false;
        writeErrorLabel("tc_error_label", "Must be Selected")
    }

    // All Validation Accepted
    if(isValidate){
        alert("Success!")
        clearField()
    }
}


function clearField(){
    clearErrorLabels()
    LastName_el.value = ""
    FirstName_el.value = ""
    Email_el.value = ""
    Password_el.value = ""
    tc.checked = false

    for (var i = 0, l = radios_el.length; i < l; i++) {
        radios_el[i].checked = false
    }

    for (var i = 0, l = Payment_el.length; i < l; i++) {
        Payment_el[i].selected = Payment_el[i].defaultSelected;
    }
}