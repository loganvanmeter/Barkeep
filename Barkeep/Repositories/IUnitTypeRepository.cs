using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface IUnitTypeRepository
    {
        void Add(UnitType unitType);
        void Delete(int id);
        List<UnitType> GetAll();
        UnitType GetById(int id);
        void Update(UnitType unitType);
    }
}