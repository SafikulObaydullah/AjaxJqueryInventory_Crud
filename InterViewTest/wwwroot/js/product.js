
      var CategoryList = [];
      $(document).ready(function () {
         $("#btnUpdate").hide();
      //$("#MyModal").modal('hide');
      $("#btnSave").show();
      var IsEdit = false;
      $("#MyModal").modal({
         backdrop: 'static',
      keyboard: false,
            /*show: true*/
         });
       load();
       LoadInitalData();
      $("#btnModal").click(function () {
         $("#MyModal").modal('show')
      })
         $("#btnSave").click(function () { 
            var obj = {
               
               Name: $("#txtName").val(),
               Description: $("#txtDescription").val(),
               catgoryID: $("#ddlCategoryID").val(),
               Id: $("#txtId").val(),
            }  
      $.ajax({
         url: "Product/SaveProduct",
         type: "JSON",
         method: "POST",
         data: obj,// JSON.stringify(obj),
         //contentType: "application/json",
      success: function (result) { 
         $("#MyModal").modal('hide')
         load();
         clearALl();
               },
      error: function (er) {
         console.log(er)
      }
            })
         })
      })
      function clearALl() {
         $("#txtName").val(''),
         $("#txtDescription").val(''),
         $("#ddlCategoryID").val(''),
         $("#txtId").val('')
      }
      function Close() {
         $("#MyModal").modal('hide');
      }
      function load() {
         $.ajax({
            url: "Product/GetAll",
            type: "JSON",
            method: "GET",
            success: function (result) {
               console.log("Get All = ",result)
               $("#tble tbody").empty();
               $.each(result, function (i, v) {
                  console.log("Data value = ",v)
                  var html = "<tr><td>" + v.name + "</td>" +
                     " <td>" + v.description + "</td>" +
                     "<td>" + v.catgoryName+ "</td>" +
                     " <td> <button onClick='Edit(" + v.id + ")'>Edit </button></td>" +
                     " <td> <button onClick='Delete(" + v.id + ")'>Delete </button></td></tr>"; 
                  $("#tble tbody").append(html)
               })
            },
            error: function (er) {
               console.log(er)
            }
         })
      }

      function Edit(id) { 
         $("#btnUpdate").show();
         $("#btnSave").hide();

      $.ajax({
         url: "Product/GetById/" + id,
         type: "JSON",
         method: "GET",
         success: function (result) {
            console.log("Get by ID ",result);
         $("#exampleModalLabel").html("Update Product Information"); 
         IsEdit = true;

         $("#txtName").val(result.name),
         $("#txtDescription").val(result.description),
         $("#ddlCategoryID").val(result.catgoryID),
         $("#txtId").val(result.id) 
          $("#MyModal").modal('show')
         },
      error: function (er) {
         console.log(er)
      }
         }) 
      }
      function Update() { 
      var url = "Product/UpdateProduct" 
      var object = {
         name: $("#txtName").val(),
         description: $("#txtDescription").val(),
         catgoryID: $("#ddlCategoryID").val(),
         id: $("#txtId").val()
         }
      $.ajax({
         url: url,
         //contentType: "application/json; charset=utf-8",
         dataType: "json",
         type: "Put",
         data: object, //JSON.stringify(object),
         success: function (result) {
         $("#MyModal").modal('hide');
         load();
         clearALl();
         console.log("....")
         console.log(result)
         $("#btnUpdate").hide();
         $("#btnSave").show();
         },
         error: function (er) {
         console.log(er.responseText);
            }
         })
      } 
      function Delete(id) {
         var url = "Product/ProductDelete/" + id;
      $.ajax({
         url: url,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "Delete",
      success: function (result) {
         clearALl(); 
         load();
            },
      error: function (msg) {
              alert(msg);
            }
         });
      } 
      function LoadInitalData() {
         $.ajax({
            url: "/Product/GetInitialData",
            method: "GET",
            dataType: "json",
            success: function (data) {
               CategoryList = data.categories;
               /* if (data.statusCode = "200") {*/
               var s = '<option value="-1">Select Category</option>';
               for (var i = 0; i < CategoryList.length; i++) {
                  console.log(data[i])
                  s += '<option value="' + CategoryList[i].id + '">' + CategoryList[i].name + '</option>';
               }
               $("#ddlCategoryID").html(s); 
            },
            error: function (jqXHR, textStatus, errorThrown) {
               console.log("Error:", textStatus, errorThrown);
            }
         });
}
//function GetCategory() {
//   $.ajax({
//      type: "GET",
//      url: "/Product/GetInitialData",
//      data: "{}",
//      success: function (data) {
//         var s = '<option value="-1">Pickup Location</option>';
//         for (var i = 0; i < data.length; i++) {
//            console.log(data[i])
//            s += '<option value="' + data[i].id + '">' + data[i].name + " " + data[i].address + '</option>';
//         }
//         $("#PickUpLocation").html(s);
//      }
//   });
//}
