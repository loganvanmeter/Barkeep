using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface IBarRepository
    {
        void Add(Bar bar);
        void Delete(int id);
        List<Bar> GetAll();
        List<Bar> GetAllByUserId(int userId);
        Bar GetById(int id);
        void Update(Bar bar);
    }
}