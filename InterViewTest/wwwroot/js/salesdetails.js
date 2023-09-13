$(document).ready(function () {
   GetSalesDetails();
   $("#btnModal").click(function () {
      $("#MyModal").modal('show')
   });
})
function GetSalesDetails() {
   $.ajax({
      url: "/GetAll",
      type: "JSON",
      method: "GET",
      success: function (result) {
         console.log("GET ALL",result);
         $("#tble tbody").html('');
         $.each(result, function (i, v) {
            var html = "<tr><td>" + v.name + "</td>" +
               "<td>"+v.unitPrice+"</td>"+
               "<td>" + v.quantity +"</td>"+
               "<td>" + v.description +"</td>"+
               "<td>" + v.CreatedDate +"</td>"+
               "<td><button onClick='Edit("+v.id+")'></button>Edit</td>"+
               "<td><button onClick='Delete(" + v.id +")'></button>Delete</td>"+
               "</tr>"
            $("#tble tbody").append(html);
         })
      },
      error: function (er) {
         console.log(er)
      } 
   })
}
function Save() {
   var obj = new Object();
   obj.Id = $('#txtId').val();
   obj.Name = $("#txtName").val();
   obj.UnitPrice = $("#txtUnitPrice").val();
   obj.Quantity = $("#txtQuantity").val();
   obj.Description = $("#txtDescription").val();
   obj.CreatedDate = "2023-09-13";//$("#dteCreationDate").val();
   console.log("Save object", obj);
   $.ajax({
      url: "/SaveSalesDetails",
      type:"JSON",
      method: "POST",
      data: obj,
      succcess: function (data) {
         $("#MyModal").modal('hide')
         GetSalesDetails();
         ClearAll();
      }
   })
}
function Close() {
   $("#MyModal").modal('hide')
}
function ClearAll() {
   $('#txtId').val('');
   $("#txtName").val('');
   $("#txtUnitPrice").val('');
   $("#txtQuantity").val('');
   $("#txtDescription").val('');
   $("#dteCreationDate").val('');
}