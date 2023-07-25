document.getElementById("ContactForm-purchase-method-direct").addEventListener('change', function() {
    // document.getElementById("orderNumberInput").classList.remove("d-none");
    document.getElementById("businessNameInput").remove();
});

document.getElementById("ContactForm-purchase-method-nodirect").addEventListener('change', function() {
    // document.getElementById("orderNumberInput").classList.add("d-none");
    document.getElementById("orderNumberInput").insertAdjacentHTML("afterend", "<div id='businessNameInput' class='form-group form-floating'><input type='text' id='ContactForm-business-name' name='contact[business_name]' class='form-control' placeholder='Business Name' required><label for='ContactForm-business-name'>Business Name</label></div>");
});

document.getElementById("ContactForm-return-method").addEventListener('click', function() {
    document.getElementById("heading_txt").innerHTML = "Return Authorization Form";
});

document.getElementById("ContactForm-replace-method").addEventListener('click', function() {
    document.getElementById("heading_txt").innerHTML = "Replace Authorization Form";
});
