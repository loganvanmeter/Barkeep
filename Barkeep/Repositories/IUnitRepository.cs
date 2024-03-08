using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface IUnitRepository
    {
        List<Unit> GetAll();
        Unit GetById(int id);
        void Add(Unit unit);
        void Update(Unit unit);
        void Delete(int id);
    }
}