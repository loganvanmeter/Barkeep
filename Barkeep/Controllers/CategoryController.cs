using Barkeep.Repositories;
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

        [HttpGet("GetById")]
        public IActionResult GetById(int id)
        {
            var category = _categoryRepository.GetById(id);

            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }
    }
}
