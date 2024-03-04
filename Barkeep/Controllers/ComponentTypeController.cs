using Barkeep.Models;
using Barkeep.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComponentTypeController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly IComponentTypeRepository _componentTypeRepository;

        public ComponentTypeController(IComponentTypeRepository componentTypeRepository)
        {
            _componentTypeRepository = componentTypeRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var componentTypes = _componentTypeRepository.GetAll();
            return Ok(componentTypes);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var componentType = _componentTypeRepository.GetById(id);

            if (componentType == null)
            {
                return NotFound();
            }
            return Ok(componentType);
        }

        [HttpPost]
        public IActionResult Post(ComponentType componentType)
        {
            _componentTypeRepository.Add(componentType);
            return CreatedAtAction("Get", new { id = componentType.Id }, componentType);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _componentTypeRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, ComponentType componentType)
        {
            if (id != componentType.Id)
            {
                return BadRequest();
            }

            _componentTypeRepository.Update(componentType);
            return NoContent();
        }
    }
}
