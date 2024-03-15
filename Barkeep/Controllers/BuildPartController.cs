using Barkeep.Models;
using Barkeep.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuildPartController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly IBuildPartRepository _buildPartRepository;

        public BuildPartController(IBuildPartRepository buildPartRepository)
        {
            _buildPartRepository = buildPartRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var buildParts = _buildPartRepository.GetAll();
            return Ok(buildParts);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var buildPart = _buildPartRepository.GetById(id);

            if (buildPart == null)
            {
                return NotFound();
            }
            return Ok(buildPart);
        }

        [HttpGet("BuildParts/{buildId}")]
        public IActionResult GetByBuild(int buildId)
        {
            var buildPart = _buildPartRepository.GetByBuildId(buildId);

            if (buildPart == null)
            {
                return NotFound();
            }
            return Ok(buildPart);
        }

        [HttpPost]
        public IActionResult Post(BuildPart buildPart)
        {
            _buildPartRepository.Add(buildPart);
            return CreatedAtAction("Get", new { id = buildPart.Id }, buildPart);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _buildPartRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, BuildPart buildPart)
        {
            if (id != buildPart.Id)
            {
                return BadRequest();
            }

            _buildPartRepository.Update(buildPart);
            return NoContent();
        }
    }
}
