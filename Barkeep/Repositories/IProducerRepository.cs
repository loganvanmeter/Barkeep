using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface IProducerRepository
    {
        void Add(Producer producer);
        void Delete(int id);
        List<Producer> GetAll();
        Producer GetById(int id);
        void Update(Producer producer);
    }
}