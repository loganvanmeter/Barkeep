using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface IUserRepository
    {
        List<User> GetAllActive();
        User GetByEmail(string email);
        
        void Update(User user);
        void Add(User user);
    }
}