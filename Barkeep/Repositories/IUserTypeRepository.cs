using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface IUserTypeRepository
    {
        List<UserType> GetAll();
    }
}