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
        void Update(Component component);
    }
}