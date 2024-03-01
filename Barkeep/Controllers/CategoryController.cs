using Barkeep.Repositories;
using Barkeep.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository)
        {
           _categoryRepository = categoryRepository;
        }

        [HttpGet("GetApproved")]
        public IActionResult GetApproved()
        {
            var categories = _categoryRepository.GetAllApproved();
            return Ok(categories);
        }

        [HttpGet("GetNotApproved")]
        public IActionResult GetNotApproved()
        {
            var categories = _categoryRepository.GetAllNotApproved();
            return Ok(categories);
        }

        [HttpGet("GetMyCategories/{barId}")]
        public IActionResult GetMyCategories(int barId)
        {
            var categories = _categoryRepository.GetAllMyCategories(barId);
            return Ok(categories);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var category = _categoryRepository.GetById(id);

            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        [HttpPost]
        public IActionResult Post(Category category)
        {
            _categoryRepository.Add(category);
            return CreatedAtAction("Get", new { id = category.Id }, category);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _categoryRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id,  Category category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }

            _categoryRepository.Update(category);
            return NoContent();
        }
    }
}
