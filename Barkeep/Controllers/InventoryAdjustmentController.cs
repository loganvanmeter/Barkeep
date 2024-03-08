using Barkeep.Models;
using Barkeep.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryAdjustmentController : ControllerBase
    {
            //private readonly Interface declaration
            private readonly IInventoryAdjustmentRepository _inventoryAdjustmentRepository;

            public InventoryAdjustmentController(IInventoryAdjustmentRepository inventoryAdjustmentRepository)
            {
                _inventoryAdjustmentRepository = inventoryAdjustmentRepository;
            }

            [HttpGet]
            public IActionResult Get()
            {
                var inventories = _inventoryAdjustmentRepository.GetAll();
                return Ok(inventories);
            }

            [HttpGet("GetThisInventoryAdjustments/{inventoryId}")]
            public IActionResult GetThisInventoryAdjustments(int inventoryId)
            {
                var inventories = _inventoryAdjustmentRepository.GetAllByInventory(inventoryId);
                return Ok(inventories);
            }

            [HttpGet("{id}")]
            public IActionResult Get(int id)
            {
                var inventoryAdjustment = _inventoryAdjustmentRepository.GetById(id);

                if (inventoryAdjustment == null)
                {
                    return NotFound();
                }
                return Ok(inventoryAdjustment);
            }

            [HttpPost]
            public IActionResult Post(InventoryAdjustment inventoryAdjustment)
            {
                _inventoryAdjustmentRepository.Add(inventoryAdjustment);
                return CreatedAtAction("Get", new { id = inventoryAdjustment.Id }, inventoryAdjustment);
            }

            [HttpDelete("{id}")]
            public IActionResult Delete(int id)
            {
                _inventoryAdjustmentRepository.Delete(id);
                return NoContent();
            }

            [HttpDelete("DeleteThisInventorysAdjustments/{inventoryId}")]
            public IActionResult DeleteThisInventorysAdjustments(int inventoryId)
            {
                _inventoryAdjustmentRepository.DeleteInventoryInventoryAdjustments(inventoryId);
                return NoContent();
            }

            [HttpPut("{id}")]
            public IActionResult Put(int id, InventoryAdjustment inventoryAdjustment)
            {
                if (id != inventoryAdjustment.Id)
                {
                    return BadRequest();
                }

                _inventoryAdjustmentRepository.Update(inventoryAdjustment);
                return NoContent();
            }
        }
    }

