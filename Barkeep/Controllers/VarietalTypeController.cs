using Barkeep.Models;
using Barkeep.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VarietalTypeController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly IVarietalTypeRepository _varietalTypeRepository;

        public VarietalTypeController(IVarietalTypeRepository varietalTypeRepository)
        {
            _varietalTypeRepository = varietalTypeRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var varietalTypes = _varietalTypeRepository.GetAll();
            return Ok(varietalTypes);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var varietalType = _varietalTypeRepository.GetById(id);

            if (varietalType == null)
            {
                return NotFound();
            }
            return Ok(varietalType);
        }

        [HttpPost]
        public IActionResult Post(VarietalType varietalType)
        {
            _varietalTypeRepository.Add(varietalType);
            return CreatedAtAction("Get", new { id = varietalType.Id }, varietalType);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _varietalTypeRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, VarietalType varietalType)
        {
            if (id != varietalType.Id)
            {
                return BadRequest();
            }

            _varietalTypeRepository.Update(varietalType);
            return NoContent();
        }
    }
}

