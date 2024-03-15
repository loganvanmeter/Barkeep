using Barkeep.Models;
using Barkeep.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuildController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly IBuildRepository _buildRepository;

        public BuildController(IBuildRepository buildRepository)
        {
            _buildRepository = buildRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var builds = _buildRepository.GetAll();
            return Ok(builds);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var build = _buildRepository.GetById(id);

            if (build == null)
            {
                return NotFound();
            }
            return Ok(build);
        }

        [HttpGet("MenuItemBuild/{menuItemId}")]
        public IActionResult GetByMenuItem(int menuItemId)
        {
            var build = _buildRepository.GetByMenuItemId(menuItemId);

            if (build == null)
            {
                return NotFound();
            }
            return Ok(build);
        }

        [HttpPost]
        public IActionResult Post(Build build)
        {
            _buildRepository.Add(build);
            return CreatedAtAction("Get", new { id = build.Id }, build);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _buildRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Build build)
        {
            if (id != build.Id)
            {
                return BadRequest();
            }

            _buildRepository.Update(build);
            return NoContent();
        }
    }
}
