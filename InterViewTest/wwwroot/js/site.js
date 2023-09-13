$(document).ready(function () {
   /* alert("hi");*/

   loadPrd();
});
function loadPrd() {
   var ddlCustomers = $("#product");
   ddlCustomers.empty().append('<option selected="selected" value="0" disabled="disabled">Loading.....</option>');
   $.ajax({
      type: "GET",
      url: "/Employees/Index",
      data: '{}',
      success: function (response) {
         ddlCustomers.empty().append('<option selected="selected" value="0">Please select</option>');
         $.each(response, function (i, v) {
            ddlCustomers.append($("<option></option>").val(v.value).html(v.text));
            console.log(v.value)
            console.log(v.text)
         });
      },
      failure: function (response) {
         alert(response.responseText);
      },
      error: function (response) {
         alert(response.responseText);
      }
   });
}