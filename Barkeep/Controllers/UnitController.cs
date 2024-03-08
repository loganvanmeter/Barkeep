using Barkeep.Models;
using Barkeep.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnitController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly IUnitRepository _unitRepository;

        public UnitController(IUnitRepository unitRepository)
        {
            _unitRepository = unitRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var units = _unitRepository.GetAll();
            return Ok(units);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var unit = _unitRepository.GetById(id);

            if (unit == null)
            {
                return NotFound();
            }
            return Ok(unit);
        }

        [HttpPost]
        public IActionResult Post(Unit unit)
        {
            _unitRepository.Add(unit);
            return CreatedAtAction("Get", new { id = unit.Id }, unit);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _unitRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Unit unit)
        {
            if (id != unit.Id)
            {
                return BadRequest();
            }

            _unitRepository.Update(unit);
            return NoContent();
        }
    }
}
