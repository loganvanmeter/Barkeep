using Barkeep.Models;
using Barkeep.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VarietalController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly IVarietalRepository _varietalRepository;

        public VarietalController(IVarietalRepository varietalRepository)
        {
            _varietalRepository = varietalRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var varietalTypes = _varietalRepository.GetAll();
            return Ok(varietalTypes);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var varietalType = _varietalRepository.GetById(id);

            if (varietalType == null)
            {
                return NotFound();
            }
            return Ok(varietalType);
        }

        [HttpPost]
        public IActionResult Post(Varietal varietal)
        {
            _varietalRepository.Add(varietal);
            return CreatedAtAction("Get", new { id = varietal.Id }, varietal);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _varietalRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Varietal varietal)
        {
            if (id != varietal.Id)
            {
                return BadRequest();
            }

            _varietalRepository.Update(varietal);
            return NoContent();
        }
    }
}
