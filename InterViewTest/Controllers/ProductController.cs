using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using InterViewTest.Models;
using System.Dynamic;
using Microsoft.Data.SqlClient;
using InterViewTest.VewModel;

namespace InterViewTest.Controllers
{
    public class ProductController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        } 
        public IActionResult Index()
        { 
           return View(); 
        } 
        public IEnumerable<ProductVM> GetAll()
        {
         var data = (from prd in _context.Products 
                     join cat in _context.Categories on prd.CatgoryID equals cat.Id
                     //where prd.CatgoryID == 0 || prd.CatgoryID == 1
                     select new ProductVM
                     {
                        Id = prd.Id,
                        Name = prd.Name,
                        Description = prd.Description,
                        CatgoryID = cat.Id,
                        CatgoryName = cat.Name,
                     }).ToList();
         return data;
        }
      public JsonResult GetById(int id)
        {
         return Json(_context.Products.Find(id));
        }
        public JsonResult SaveProduct(Product product)
        {
         _context.Products.Add(product); 
         _context.SaveChanges();
         return Json(product);
        }
        public JsonResult UpdateProduct(Product product)
        {
          _context.Entry(product).State = EntityState.Modified;
          _context.SaveChanges();
          return Json(product);
        } 
        public JsonResult ProductDelete(int id)
        {
         var product = _context.Products.Find(id);
         _context.Products.Remove(product);
         _context.SaveChanges();
         return Json(product);
        }
        [HttpGet]
        public JsonResult GetInitialData()
        {
         dynamic result = new ExpandoObject();
         try
         {
            result.categories = _context.Categories.ToList(); 
         }
         catch (Exception ex)
         {
            ModelState.AddModelError("Failed", ex.Message);
         }
         return Json(result);
      }
   }
}
