using Barkeep.Models;
using Barkeep.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryAdjustmentTypeController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly IInventoryAdjustmentTypeRepository _inventoryAdjustmentTypeRepository;

        public InventoryAdjustmentTypeController(IInventoryAdjustmentTypeRepository inventoryAdjustmentTypeRepository)
        {
            _inventoryAdjustmentTypeRepository = inventoryAdjustmentTypeRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var inventories = _inventoryAdjustmentTypeRepository.GetAll();
            return Ok(inventories);
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var inventoryAdjustmentType = _inventoryAdjustmentTypeRepository.GetById(id);

            if (inventoryAdjustmentType == null)
            {
                return NotFound();
            }
            return Ok(inventoryAdjustmentType);
        }

        [HttpPost]
        public IActionResult Post(InventoryAdjustmentType inventoryAdjustmentType)
        {
            _inventoryAdjustmentTypeRepository.Add(inventoryAdjustmentType);
            return CreatedAtAction("Get", new { id = inventoryAdjustmentType.Id }, inventoryAdjustmentType);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _inventoryAdjustmentTypeRepository.Delete(id);
            return NoContent();
        }


        [HttpPut("{id}")]
        public IActionResult Put(int id, InventoryAdjustmentType inventoryAdjustmentType)
        {
            if (id != inventoryAdjustmentType.Id)
            {
                return BadRequest();
            }

            _inventoryAdjustmentTypeRepository.Update(inventoryAdjustmentType);
            return NoContent();
        }
    }
}
