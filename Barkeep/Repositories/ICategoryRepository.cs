using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAllApproved();
        List<Category> GetAllNotApproved();
        Category GetById(int id);
    }
}