using Barkeep.Models;
using Barkeep.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComponentController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly IComponentRepository _componentRepository;

        public ComponentController(IComponentRepository componentRepository)
        {
            _componentRepository = componentRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var components = _componentRepository.GetAll();
            return Ok(components);
        }

        [HttpGet("AvailableBarComponents/{barId}")]
        public IActionResult GetByBarId(int barId)
        {
            var components = _componentRepository.GetAllByBarId(barId);
            return Ok(components);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var component = _componentRepository.GetById(id);

            if (component == null)
            {
                return NotFound();
            }
            return Ok(component);
        }
        [HttpGet("GetByName/{name}")]
        public IActionResult GetByName(string name)
        {
            var component = _componentRepository.GetByName(name);

            if (component == null)
            {
                return NotFound();
            }
            return Ok(component);
        }

        [HttpPost]
        public IActionResult Post(Component component)
        {
            _componentRepository.Add(component);
            return CreatedAtAction("Get", new { id = component.Id }, component);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _componentRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Component component)
        {
            if (id != component.Id)
            {
                return BadRequest();
            }

            _componentRepository.Update(component);
            return NoContent();
        }
    }
}
