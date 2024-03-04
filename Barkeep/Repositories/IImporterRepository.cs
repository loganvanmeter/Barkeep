using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface IImporterRepository
    {
        void Add(Importer importer);
        void Delete(int id);
        List<Importer> GetAll();
        Importer GetById(int id);
        void Update(Importer importer);
    }
}