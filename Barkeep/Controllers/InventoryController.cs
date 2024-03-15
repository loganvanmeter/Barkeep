using Barkeep.Repositories;
using Barkeep.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly IInventoryRepository _inventoryRepository;
        private readonly IInventoryAdjustmentRepository _adjustmentRepository;
        private readonly IInventoryLinkRepository _linkRepository;

        public InventoryController(IInventoryRepository inventoryRepository, IInventoryAdjustmentRepository adjustmentRepository, IInventoryLinkRepository linkRepository)
        {
            _inventoryRepository = inventoryRepository;
            _adjustmentRepository = adjustmentRepository;
            _linkRepository = linkRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var inventories = _inventoryRepository.GetAll();
            foreach (var inventory in inventories)
            {
                inventory.InventoryAdjustments = _adjustmentRepository.GetAllByInventory(inventory.Id);
                inventory.InInventoryLinks = _linkRepository.GetAllByInventoryIn(inventory.Id);
                inventory.OutInventoryLinks = _linkRepository.GetAllByInventoryOut(inventory.Id);
            }
            return Ok(inventories);
        }

        [HttpGet("BarInventory/{barId}")]
        public IActionResult GetByBarId(int barId)
        {
            var inventories = _inventoryRepository.GetBarInventory(barId);
            foreach(var inventory in inventories)
            {
                inventory.InventoryAdjustments = _adjustmentRepository.GetAllByInventory(inventory.Id);
                inventory.InInventoryLinks = _linkRepository.GetAllByInventoryIn(inventory.Id);
                inventory.OutInventoryLinks = _linkRepository.GetAllByInventoryOut(inventory.Id);
            }
            return Ok(inventories);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var inventory = _inventoryRepository.GetById(id);
            inventory.InventoryAdjustments = _adjustmentRepository.GetAllByInventory(id);
            inventory.InInventoryLinks = _linkRepository.GetAllByInventoryIn(inventory.Id);
            inventory.OutInventoryLinks = _linkRepository.GetAllByInventoryOut(inventory.Id);

            if (inventory == null)
            {
                return NotFound();
            }
            return Ok(inventory);
        }

        [HttpPost]
        public IActionResult Post(Inventory inventory)
        {
            _inventoryRepository.Add(inventory);
            return CreatedAtAction("Get", new { id = inventory.Id }, inventory);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _inventoryRepository.Delete(id);
            return NoContent();
        }

        [HttpDelete("DeleteBarInventory/{barId}")]
        public IActionResult DeleteBarInventory(int barId)
        {
            _inventoryRepository.DeleteAllBarInventory(barId);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Inventory inventory)
        {
            if (id != inventory.Id)
            {
                return BadRequest();
            }

            _inventoryRepository.Update(inventory);
            return NoContent();
        }
    }
}
