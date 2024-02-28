using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface IVarietalRepository
    {
        void Add(Varietal varietal);
        void Delete(int id);
        List<Varietal> GetAll();
        Varietal GetById(int id);
        void Update(Varietal varietal);
    }
}