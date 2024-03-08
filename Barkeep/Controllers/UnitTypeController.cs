using Barkeep.Models;
using Barkeep.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnitTypeController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly IUnitTypeRepository _unitTypeRepository;

        public UnitTypeController(IUnitTypeRepository unitTypeRepository)
        {
            _unitTypeRepository = unitTypeRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var unitTypes = _unitTypeRepository.GetAll();
            return Ok(unitTypes);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var unitType = _unitTypeRepository.GetById(id);

            if (unitType == null)
            {
                return NotFound();
            }
            return Ok(unitType);
        }

        [HttpPost]
        public IActionResult Post(UnitType unitType)
        {
            _unitTypeRepository.Add(unitType);
            return CreatedAtAction("Get", new { id = unitType.Id }, unitType);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _unitTypeRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, UnitType unitType)
        {
            if (id != unitType.Id)
            {
                return BadRequest();
            }

            _unitTypeRepository.Update(unitType);
            return NoContent();
        }
    }
}
