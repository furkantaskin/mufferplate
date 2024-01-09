$(document).ready(function () {
  $(".fe-submit").click(function () {
    const form = $(this).attr("data-form");
    const action = $(form).attr("data-action");

    const formSelect = $(form)[0];
    const checkValidation = formSelect.checkValidity();

    if (checkValidation) {
      $("<input>", {
        type: "hidden",
        name: action,
        value: "1",
      }).appendTo(form);

      $.ajax({
        type: "POST",
        url: domain + "isle.php",
        data: $(form).serialize(),
        success: function (data) {
          //console.log(data)
          let oku = JSON.parse(data);
          if (oku.durum === "success") {
            formSelect.reset();
          }
          Swal.fire({
            icon: oku.durum,
            text: oku.bildirim,
            showConfirmButton: false,
          });
        },
        error: function (data) {
          Swal.fire({
            icon: "error",
            text: oku.bildirim,
          });
        },
      });
    } else {
      validateOptions($(form).serializeArray(), form, true);
    }
  });
});

function validateOptions(data, form, show = false) {
  $.each(data, function (i, field) {
    let name = field.name;
    let value = field.value;
    console.log(data);
    let element = $(form + ' [name="' + name + '"]');
    let errorStatus = element[0].checkValidity();
    let errorMessage = element[0].validationMessage;
    if (!errorStatus) {
      $(form)[0].reportValidity();
      console.log("Form Validation Error Check Error Message! \n", {
        Status: errorStatus,
        Message: errorMessage,
        Element: element,
      });
    } else {
      element[0].setCustomValidity("");
    }
  });
}
