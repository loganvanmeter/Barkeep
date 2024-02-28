using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface IVarietalTypeRepository
    {
        void Add(VarietalType varietalType);
        void Delete(int id);
        List<VarietalType> GetAll();
        VarietalType GetById(int id);
        void Update(VarietalType varietalType);
    }
}