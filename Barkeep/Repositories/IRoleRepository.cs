using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface IRoleRepository
    {
        void Add(Role role);
        void Delete(int id);
        List<Role> GetAll();
        List<Role> GetAllByBarId(int barId);
        Role GetById(int id);
        void Update(Role role);

        void DeleteAllBarRoles(int barId);
    }
}