using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface ICityRepository
    {
        void Add(City city);
        void Delete(int id);
        List<City> GetAll();
        City GetById(int id);
        void Update(City city);
    }
}