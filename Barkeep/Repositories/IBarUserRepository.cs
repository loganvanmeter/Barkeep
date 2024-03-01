using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface IBarUserRepository
    {
        void Add(BarUser barUser);
        void Delete(int id);
        List<BarUser> GetAll();
        List<BarUser> GetAllByBarId(int barId);
        List<BarUser> GetAllByUserId(int userId);
        BarUser GetById(int id);
        void Update(BarUser barUser);
    }
}