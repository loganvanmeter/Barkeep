using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAllApproved();
        List<Category> GetAllNotApproved();
        Category GetById(int id);

        void Add(Category category);
        void Update(Category category);
        void Delete(int id);
    }
}