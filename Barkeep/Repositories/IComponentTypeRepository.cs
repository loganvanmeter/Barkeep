using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface IComponentTypeRepository
    {
        void Add(ComponentType componentType);
        void Delete(int id);
        List<ComponentType> GetAll();
        ComponentType GetById(int id);
        void Update(ComponentType componentType);
    }
}