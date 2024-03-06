using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface IComponentCategoryRepository
    {
        void Add(ComponentCategory componentCategory);
        void Delete(int id);
        List<ComponentCategory> GetAll();
        List<ComponentCategory> GetAllByCategoryId(int categoryId);
        List<ComponentCategory> GetAllByComponentId(int componentId);
        ComponentCategory GetById(int id);
        void Update(ComponentCategory componentCategory);
    }
}