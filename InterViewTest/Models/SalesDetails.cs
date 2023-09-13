using System;
namespace InterViewTest.Models
{
   public class SalesDetails
   {
      public int Id { get; set; }   
      public string Name { get; set; }
      public string? Description { get; set; }
      public DateTime? CreatedDate { get; set; }
      public decimal UnitPrice { get; set; }
      public int? Quantity { get; set; } 
   }
}
