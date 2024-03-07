using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface ICountryRepository
    {
        List<Country> GetAll();
        Country GetById(int id);

        Country GetByName(string name);
    }
}