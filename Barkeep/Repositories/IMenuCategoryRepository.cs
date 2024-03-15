using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface IMenuCategoryRepository
    {
        void Add(MenuCategory menu);
        void Delete(int id);
        List<MenuCategory> GetAll();
        List<MenuCategory> GetAllThisMenuCategories(int menuId);
        List<MenuCategory> GetAllThisCategorySubCategories(int menuCategoryId);
        MenuCategory GetById(int id);
        void Update(MenuCategory menu);
    }
}