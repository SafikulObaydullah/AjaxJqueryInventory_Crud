using InterViewTest.Models;
using InterViewTest.VewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace InterViewTest.Controllers
{
   public class SalesDetailsController : Controller
   {
      private readonly ApplicationDbContext _context;
      public SalesDetailsController(ApplicationDbContext context)
      {
         _context = context;
      }
      public IActionResult Index()
      {
         return View();
      }
      //public JsonResult GetAll()
      //{
      //   try
      //   {

      //      if (ModelState.IsValid) {
      //         return Json( _context.SalesDetails.ToList());
      //      }
      //      return Json(_context.SalesDetails.ToList());
      //   }
      //   catch (Exception ex)
      //   {
      //      return new JsonResult(ex.Message);  
      //   }
      //}
      [HttpGet("GetAll")]
      public IEnumerable<SalesDetailsVM> GetAll()
      {
         var data = (from sal in _context.SalesDetails
                     select new SalesDetailsVM
                     {
                        Id = sal.Id == null ? 0 : sal.Id,
                        Name = sal.Name == null ? "" : sal.Name,
                        UnitPrice = sal.UnitPrice == null ? 0 : sal.UnitPrice,
                        Quantity = sal.Quantity == null ? 0 : sal.Quantity,
                        Description = sal.Description == null ? "" : sal.Description,
                        CreatedDate = sal.CreatedDate == null ? DateTime.Now : sal.CreatedDate,
                     }).ToList();
         //if (data.Count > 0)
         //{
            return data;
         //} 
      }

      public JsonResult GetById(int id)
      {
         return Json(_context.SalesDetails.Find(id));
      }
      [HttpPost("SaveSalesDetails")]
      public JsonResult SaveSalesDetails(SalesDetails salesDetails)
      {
         salesDetails.CreatedDate = DateTime.Now;
         try
         {
            //_context.SalesDetails.Add(salesDetails);
            //_context.SaveChanges();
            //return Json(salesDetails);
            _context.SalesDetails.Add(salesDetails);
            _context.SaveChanges();
            return Json(salesDetails);
         }
         catch (Exception ex)
         {
            return Json(ex.Message);
         }
      }
      public JsonResult Update(SalesDetails salesDetails)
      {
         try
         {
            _context.Entry(salesDetails).State = EntityState.Modified;
            _context.SaveChanges();
            return Json(salesDetails);
         }
         catch (Exception ex)
         {
            return Json(ex.Message);
         }
      }
      public JsonResult Delete(int id)
      {
         try
         {
            var data = _context.SalesDetails.Find(id);
            _context.SalesDetails.Remove(data);
            _context.SaveChanges();
            return Json(data);
         }
         catch (Exception ex)
         {
            return Json(ex.Message);
         }
      }
   }
}
