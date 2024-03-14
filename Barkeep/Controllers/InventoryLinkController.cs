using Barkeep.Models;
using Barkeep.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryLinkController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly IInventoryLinkRepository _inventoryLinkRepository;
        private readonly IInventoryRepository _inventoryRepository; 

        public InventoryLinkController(IInventoryLinkRepository inventoryLinkRepository, IInventoryRepository inventoryRepository)
        {
            _inventoryLinkRepository = inventoryLinkRepository;
            _inventoryRepository = inventoryRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var inventoryLinks = _inventoryLinkRepository.GetAll();
            foreach(var link in inventoryLinks)
            {
                link.InInventory = _inventoryRepository.GetById(link.InInventoryId);
                link.OutInventory = _inventoryRepository.GetById(link.OutInventoryId);
            }
            return Ok(inventoryLinks);
        }

        [HttpGet("GetInInventoryLinks/{inventoryId}")]
        public IActionResult GetInInventoryLinks(int inventoryId)
        {
            var inventoryLinks = _inventoryLinkRepository.GetAllByInventoryIn(inventoryId);
            foreach (var link in inventoryLinks)
            {
                link.InInventory = _inventoryRepository.GetById(link.InInventoryId);
                link.OutInventory = _inventoryRepository.GetById(link.OutInventoryId);
            }
            return Ok(inventoryLinks);
        }

        [HttpGet("GetOutInventoryLinks/{inventoryId}")]
        public IActionResult GetOutInventoryLinks(int inventoryId)
        {
            var inventoryLinks = _inventoryLinkRepository.GetAllByInventoryOut(inventoryId);
            foreach (var link in inventoryLinks)
            {
                link.InInventory = _inventoryRepository.GetById(link.InInventoryId);
                link.OutInventory = _inventoryRepository.GetById(link.OutInventoryId);
            }
            return Ok(inventoryLinks);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var inventoryLink = _inventoryLinkRepository.GetById(id);

            if (inventoryLink == null)
            {
                return NotFound();
            }
            return Ok(inventoryLink);
        }

        [HttpPost]
        public IActionResult Post(InventoryLink inventoryLink)
        {
            _inventoryLinkRepository.Add(inventoryLink);
            return CreatedAtAction("Get", new { id = inventoryLink.Id }, inventoryLink);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _inventoryLinkRepository.Delete(id);
            return NoContent();
        }

        [HttpDelete("DeleteOutInventoryLinks/{id}")]
        public IActionResult DeleteThisOutInventoryLinks(int id)
        {
            _inventoryLinkRepository.DeleteOutInventoryLinks(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, InventoryLink inventoryLink)
        {
            if (id != inventoryLink.Id)
            {
                return BadRequest();
            }

            _inventoryLinkRepository.Update(inventoryLink);
            return NoContent();
        }
    }
}
