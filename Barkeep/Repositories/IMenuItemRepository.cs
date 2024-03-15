using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface IMenuItemRepository
    {
        void Add(MenuItem menuItem);
        void Delete(int id);
        List<MenuItem> GetAll();
        List<MenuItem> GetAllThisMenuCategoryItems(int menuCategoryId);
        List<MenuItem> GetAllThisMenuItems(int menuId);
        MenuItem GetById(int id);
        void Update(MenuItem menuItem);
    }
}