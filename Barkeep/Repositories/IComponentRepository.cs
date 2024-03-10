using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface IComponentRepository
    {
        void Add(Component component);
        void Delete(int id);
        List<Component> GetAll();
        List<Component> GetAllByBarId(int barId);
        Component GetById(int id);
        Component GetByName(string name);
        void Update(Component component);
    }
}