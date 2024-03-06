using Barkeep.Models;
using Barkeep.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComponentCategoryController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly IComponentCategoryRepository _componentCategoryRepository;

        public ComponentCategoryController(IComponentCategoryRepository componentCategoryRepository)
        {
            _componentCategoryRepository = componentCategoryRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var componentCategories = _componentCategoryRepository.GetAll();
            return Ok(componentCategories);
        }

        [HttpGet("GetByComponentId/{componentId}")]
        public IActionResult GetByComponentId(int componentId)
        {
            var componentCategories = _componentCategoryRepository.GetAllByComponentId(componentId);
            return Ok(componentCategories);
        }

        [HttpGet("GetByCategoryId/{categoryId}")]
        public IActionResult GetByCategoryId(int categoryId)
        {
            var componentCategories = _componentCategoryRepository.GetAllByCategoryId(categoryId);
            return Ok(componentCategories);
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var componentCategory = _componentCategoryRepository.GetById(id);

            if (componentCategory == null)
            {
                return NotFound();
            }
            return Ok(componentCategory);
        }

        [HttpPost]
        public IActionResult Post(ComponentCategory componentCategory)
        {
            _componentCategoryRepository.Add(componentCategory);
            return CreatedAtAction("Get", new { id = componentCategory.Id }, componentCategory);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _componentCategoryRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, ComponentCategory componentCategory)
        {
            if (id != componentCategory.Id)
            {
                return BadRequest();
            }

            _componentCategoryRepository.Update(componentCategory);
            return NoContent();
        }
    }
}
