using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface IMenuRepository
    {
        void Add(Menu menu);
        void Delete(int id);
        List<Menu> GetAll();
        List<Menu> GetAllMyMenus(int barId);
        Menu GetById(int id);
        void Update(Menu menu);
    }
}