using Barkeep.Repositories;
using Barkeep.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuItemController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly IMenuItemRepository _menuItemRepository;
        private readonly IBuildRepository _buildRepository;
        private readonly IBuildPartRepository _buildPartRepository;
        private readonly IUnitRepository _unitRepository;
        private readonly IInventoryRepository _inventoryRepository;
        

        public MenuItemController(IMenuItemRepository menuItemRepository, 
            IBuildRepository buildRepository, 
            IBuildPartRepository buildPartRepository,
            IUnitRepository unitRepository,
            IInventoryRepository inventoryRepository)
        {
            _menuItemRepository = menuItemRepository;
            _buildRepository = buildRepository;
            _buildPartRepository = buildPartRepository;
            _unitRepository = unitRepository;
            _inventoryRepository = inventoryRepository;

        
        }

        [HttpGet]
        public IActionResult Get()
        {
            var menuItems = _menuItemRepository.GetAll();
            foreach (var item in  menuItems)
            {
                item.Build = _buildRepository.GetByMenuItemId(item.Id);
                item.Build.Parts = _buildPartRepository.GetByBuildId(item.Build.Id);
                foreach(var part in item.Build.Parts)
                {
                    part.Unit = _unitRepository.GetById(part.UnitId);
                    part.Inventory = _inventoryRepository.GetById(part.InventoryId);
                }
            }
           
            return Ok(menuItems);
        }

        [HttpGet("ThisMenuItems/{menuId}")]
        public IActionResult GetThisMenuItems(int menuId)
        {
            var menuItems = _menuItemRepository.GetAllThisMenuItems(menuId);
            foreach (var item in menuItems)
            {
                item.Build = _buildRepository.GetByMenuItemId(item.Id);
                item.Build.Parts = _buildPartRepository.GetByBuildId(item.Build.Id);
                foreach (var part in item.Build.Parts)
                {
                    part.Unit = _unitRepository.GetById(part.UnitId);
                    part.Inventory = _inventoryRepository.GetById(part.InventoryId);
                }
            }
            return Ok(menuItems);
        }

        [HttpGet("ThisMenuCategoryItems/{menuCategoryId}")]
        public IActionResult GetThisMenuCategoryItems(int menuCategoryId)
        {
            var menuItems = _menuItemRepository.GetAllThisMenuCategoryItems(menuCategoryId);
            foreach (var item in menuItems)
            {
                item.Build = _buildRepository.GetByMenuItemId(item.Id);
                item.Build.Parts = _buildPartRepository.GetByBuildId(item.Build.Id);
                foreach (var part in item.Build.Parts)
                {
                    part.Unit = _unitRepository.GetById(part.UnitId);
                    part.Inventory = _inventoryRepository.GetById(part.InventoryId);
                }
            }
            return Ok(menuItems);
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var menuItem = _menuItemRepository.GetById(id);
            menuItem.Build = _buildRepository.GetByMenuItemId(menuItem.Id);
            menuItem.Build.Parts = _buildPartRepository.GetByBuildId(menuItem.Build.Id);
            foreach (var part in menuItem.Build.Parts)
            {
                part.Unit = _unitRepository.GetById(part.UnitId);
                part.Inventory = _inventoryRepository.GetById(part.InventoryId);
            }

            if (menuItem == null)
            {
                return NotFound();
            }

            
            return Ok(menuItem);
        }

        [HttpPost]
        public IActionResult Post(MenuItem menuItem)
        {
            _menuItemRepository.Add(menuItem);
            return CreatedAtAction("Get", new { id = menuItem.Id }, menuItem);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _menuItemRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, MenuItem menuItem)
        {
            if (id != menuItem.Id)
            {
                return BadRequest();
            }

            _menuItemRepository.Update(menuItem);
            return NoContent();
        }
    }
}
