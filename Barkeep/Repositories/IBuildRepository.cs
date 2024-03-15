using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface IBuildRepository
    {
        void Add(Build build);
        void Delete(int id);
        List<Build> GetAll();
        Build GetById(int id);
        Build GetByMenuItemId(int menuItemId);
        void Update(Build build);
    }
}