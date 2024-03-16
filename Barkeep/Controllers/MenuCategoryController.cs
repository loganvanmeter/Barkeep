using Barkeep.Repositories;
using Barkeep.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuCategoryController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly IMenuCategoryRepository _menuCategoryRepository;
        private readonly IMenuItemRepository _menuItemRepository;
        private readonly IBuildRepository _buildRepository;
        private readonly IBuildPartRepository _buildPartRepository;
        private readonly IUnitRepository _unitRepository;
        private readonly IInventoryRepository _inventoryRepository;


        public MenuCategoryController(IMenuCategoryRepository menuCategoryRepository, IMenuItemRepository menuItemRepository,
            IBuildRepository buildRepository,
            IBuildPartRepository buildPartRepository,
            IUnitRepository unitRepository,
            IInventoryRepository inventoryRepository)
        {
            _menuCategoryRepository = menuCategoryRepository;
            _menuItemRepository = menuItemRepository;
            _buildRepository = buildRepository;
            _buildPartRepository = buildPartRepository;
            _unitRepository = unitRepository;
            _inventoryRepository = inventoryRepository;
        }

        [HttpGet]
        public IActionResult GetApproved()
        {
            var categories = _menuCategoryRepository.GetAll();
            return Ok(categories);
        }

        [HttpGet("MenuCategories/{menuId}")]
        public IActionResult GetMenuCategories(int menuId)
        {
            var categories = _menuCategoryRepository.GetAllThisMenuCategories(menuId);
            return Ok(categories);
        }

        [HttpGet("MenuCategorySubCategories/{menuCategoryId}")]
        public IActionResult GetMenuCategorySubCategories(int menuCategoryId)
        {
            var categories = _menuCategoryRepository.GetAllThisCategorySubCategories(menuCategoryId);
            return Ok(categories);
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var menuCategory = _menuCategoryRepository.GetById(id);

            if (menuCategory == null)
            {
                return NotFound();
            }
            menuCategory.SubMenuCategories = _menuCategoryRepository.GetAllThisCategorySubCategories(id);
            foreach (var subCategory in menuCategory.SubMenuCategories)
            {
                subCategory.MenuItems = _menuItemRepository.GetAllThisMenuCategoryItems(subCategory.Id);
            }
            menuCategory.MenuItems = _menuItemRepository.GetAllThisMenuCategoryItems(id);
            foreach (var item in menuCategory.MenuItems)
            {
                item.Build = _buildRepository.GetByMenuItemId(item.Id);
                item.Build.Parts = _buildPartRepository.GetByBuildId(item.Build.Id);
                foreach (var part in item.Build.Parts)
                {
                    part.Unit = _unitRepository.GetById(part.UnitId);
                    part.Inventory = _inventoryRepository.GetById(part.InventoryId);
                }
            }
            if (menuCategory.MenuCategoryId != null)
            {
                menuCategory.ParentCategory = _menuCategoryRepository.GetById((int)menuCategory.MenuCategoryId);
            }
            return Ok(menuCategory);
        }

        [HttpPost]
        public IActionResult Post(MenuCategory menuCategory)
        {
            _menuCategoryRepository.Add(menuCategory);
            return CreatedAtAction("Get", new { id = menuCategory.Id }, menuCategory);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _menuCategoryRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, MenuCategory menuCategory)
        {
            if (id != menuCategory.Id)
            {
                return BadRequest();
            }

            _menuCategoryRepository.Update(menuCategory);
            return NoContent();
        }
    }
}
