using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface IInventoryRepository
    {
        void Add(Inventory inventory);
        void Delete(int id);
        void DeleteAllBarInventory(int barId);
        List<Inventory> GetAll();
        List<Inventory> GetBarInventory(int barId);
        Inventory GetById(int id);
        void Update(Inventory inventory);
    }
}