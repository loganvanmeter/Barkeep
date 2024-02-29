using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface IRegionRepository
    {
        void Add(Region region);
        void Delete(int id);
        List<Region> GetAll();
        List<Region> GetAllStateRegions();
        List<Region> GetAllCountryRegions();
        Region GetById(int id);
        void Update(Region region);
    }
}