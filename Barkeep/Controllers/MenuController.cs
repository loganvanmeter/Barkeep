using Barkeep.Repositories;
using Barkeep.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Barkeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        //private readonly Interface declaration
        private readonly IMenuRepository _menuRepository;
        private readonly IMenuCategoryRepository _menuCategoryRepository;
        private readonly IMenuItemRepository _menuItemRepository;
        private readonly IBuildRepository _buildRepository;
        private readonly IBuildPartRepository _buildPartRepository;
        private readonly IUnitRepository _unitRepository;
        private readonly IInventoryRepository _inventoryRepository;

        public MenuController(IMenuRepository menuRepository, IMenuCategoryRepository menuCategoryRepository, 
            IMenuItemRepository menuItemRepository,
            IBuildRepository buildRepository,
            IBuildPartRepository buildPartRepository,
            IUnitRepository unitRepository,
            IInventoryRepository inventoryRepository)
        {
            _menuRepository = menuRepository;
            _menuCategoryRepository = menuCategoryRepository;
            _menuItemRepository = menuItemRepository;
            _buildRepository = buildRepository;
            _buildPartRepository = buildPartRepository;
            _unitRepository = unitRepository;
            _inventoryRepository = inventoryRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var menus = _menuRepository.GetAll();
            foreach(var menu in menus)
            {
                menu.MenuCategories = _menuCategoryRepository.GetAllThisMenuCategories(menu.Id);
                foreach(var category in menu.MenuCategories)
                {
                    category.SubMenuCategories = _menuCategoryRepository.GetAllThisCategorySubCategories(category.Id);
                    foreach(var subCategory in category.SubMenuCategories)
                    {
                        subCategory.MenuItems = _menuItemRepository.GetAllThisMenuCategoryItems(subCategory.Id);
                    }
                    category.MenuItems = _menuItemRepository.GetAllThisMenuCategoryItems(category.Id);
                    foreach (var item in category.MenuItems)
                    {
                        item.Build = _buildRepository.GetByMenuItemId(item.Id);
                        item.Build.Parts = _buildPartRepository.GetByBuildId(item.Build.Id);
                        foreach (var part in item.Build.Parts)
                        {
                            part.Unit = _unitRepository.GetById(part.UnitId);
                            part.Inventory = _inventoryRepository.GetById(part.InventoryId);
                        }
                    }
                    if (category.MenuCategoryId != null)
                    {
                        category.ParentCategory = _menuCategoryRepository.GetById((int)category.MenuCategoryId);
                    }
                }
                menu.MenuItems = _menuItemRepository.GetAllThisMenuItems(menu.Id);
                foreach (var item in menu.MenuItems)
                {
                    item.Build = _buildRepository.GetByMenuItemId(item.Id);
                    item.Build.Parts = _buildPartRepository.GetByBuildId(item.Build.Id);
                    foreach (var part in item.Build.Parts)
                    {
                        part.Unit = _unitRepository.GetById(part.UnitId);
                        part.Inventory = _inventoryRepository.GetById(part.InventoryId);
                    }
                }
            }
            return Ok(menus);
        }

        [HttpGet("BarMenus/{barId}")]
        public IActionResult GetBarMenus(int barId)
        {
            var menus = _menuRepository.GetAllMyMenus(barId);
            foreach (var menu in menus)
            {
                menu.MenuCategories = _menuCategoryRepository.GetAllThisMenuCategories(menu.Id);
                foreach (var category in menu.MenuCategories)
                {
                    category.SubMenuCategories = _menuCategoryRepository.GetAllThisCategorySubCategories(category.Id);
                    foreach (var subCategory in category.SubMenuCategories)
                    {
                        subCategory.MenuItems = _menuItemRepository.GetAllThisMenuCategoryItems(subCategory.Id);
                    }
                    category.MenuItems = _menuItemRepository.GetAllThisMenuCategoryItems(category.Id);
                    foreach (var item in category.MenuItems)
                    {
                        item.Build = _buildRepository.GetByMenuItemId(item.Id);
                        item.Build.Parts = _buildPartRepository.GetByBuildId(item.Build.Id);
                        foreach (var part in item.Build.Parts)
                        {
                            part.Unit = _unitRepository.GetById(part.UnitId);
                            part.Inventory = _inventoryRepository.GetById(part.InventoryId);
                        }
                    }
                    if (category.MenuCategoryId != null)
                    {
                        category.ParentCategory = _menuCategoryRepository.GetById((int)category.MenuCategoryId);
                    }
                }
                menu.MenuItems = _menuItemRepository.GetAllThisMenuItems(menu.Id);
                foreach (var item in menu.MenuItems)
                {
                    item.Build = _buildRepository.GetByMenuItemId(item.Id);
                    item.Build.Parts = _buildPartRepository.GetByBuildId(item.Build.Id);
                    foreach (var part in item.Build.Parts)
                    {
                        part.Unit = _unitRepository.GetById(part.UnitId);
                        part.Inventory = _inventoryRepository.GetById(part.InventoryId);
                    }
                }
            }
            return Ok(menus);
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var menu = _menuRepository.GetById(id);

            if (menu == null)
            {
                return NotFound();
            }
            menu.MenuCategories = _menuCategoryRepository.GetAllThisMenuCategories(menu.Id);
            foreach (var category in menu.MenuCategories)
            {
                category.SubMenuCategories = _menuCategoryRepository.GetAllThisCategorySubCategories(category.Id);
                foreach (var subCategory in category.SubMenuCategories)
                {
                    subCategory.MenuItems = _menuItemRepository.GetAllThisMenuCategoryItems(subCategory.Id);
                }
                category.MenuItems = _menuItemRepository.GetAllThisMenuCategoryItems(category.Id);
                foreach (var item in category.MenuItems)
                {
                    item.Build = _buildRepository.GetByMenuItemId(item.Id);
                    item.Build.Parts = _buildPartRepository.GetByBuildId(item.Build.Id);
                    foreach (var part in item.Build.Parts)
                    {
                        part.Unit = _unitRepository.GetById(part.UnitId);
                        part.Inventory = _inventoryRepository.GetById(part.InventoryId);
                    }
                }
                if (category.MenuCategoryId != null)
                {
                    category.ParentCategory = _menuCategoryRepository.GetById((int)category.MenuCategoryId);
                }
            }
            menu.MenuItems = _menuItemRepository.GetAllThisMenuItems(menu.Id);
            foreach (var item in menu.MenuItems)
            {
                item.Build = _buildRepository.GetByMenuItemId(item.Id);
                item.Build.Parts = _buildPartRepository.GetByBuildId(item.Build.Id);
                foreach (var part in item.Build.Parts)
                {
                    part.Unit = _unitRepository.GetById(part.UnitId);
                    part.Inventory = _inventoryRepository.GetById(part.InventoryId);
                }
            }
            return Ok(menu);
        }

        [HttpPost]
        public IActionResult Post(Menu menu)
        {
            _menuRepository.Add(menu);
            return CreatedAtAction("Get", new { id = menu.Id }, menu);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _menuRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Menu menu)
        {
            if (id != menu.Id)
            {
                return BadRequest();
            }

            _menuRepository.Update(menu);
            return NoContent();
        }
    }
}
