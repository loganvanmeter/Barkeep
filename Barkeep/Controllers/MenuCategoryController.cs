using Barkeep.Repositories;
using Barkeep.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuCategoryController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly IMenuCategoryRepository _menuCategoryRepository;

        public MenuCategoryController(IMenuCategoryRepository menuCategoryRepository)
        {
            _menuCategoryRepository = menuCategoryRepository;
        }

        [HttpGet]
        public IActionResult GetApproved()
        {
            var categories = _menuCategoryRepository.GetAll();
            return Ok(categories);
        }

        [HttpGet("MenuCategories/{menuId}")]
        public IActionResult GetMenuCategories(int menuId)
        {
            var categories = _menuCategoryRepository.GetAllThisMenuCategories(menuId);
            return Ok(categories);
        }

        [HttpGet("MenuCategorySubCategories/{menuCategoryId}")]
        public IActionResult GetMenuCategorySubCategories(int menuCategoryId)
        {
            var categories = _menuCategoryRepository.GetAllThisCategorySubCategories(menuCategoryId);
            return Ok(categories);
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var menuCategory = _menuCategoryRepository.GetById(id);

            if (menuCategory == null)
            {
                return NotFound();
            }
            return Ok(menuCategory);
        }

        [HttpPost]
        public IActionResult Post(MenuCategory menuCategory)
        {
            _menuCategoryRepository.Add(menuCategory);
            return CreatedAtAction("Get", new { id = menuCategory.Id }, menuCategory);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _menuCategoryRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, MenuCategory menuCategory)
        {
            if (id != menuCategory.Id)
            {
                return BadRequest();
            }

            _menuCategoryRepository.Update(menuCategory);
            return NoContent();
        }
    }
}
