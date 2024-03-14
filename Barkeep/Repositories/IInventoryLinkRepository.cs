using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface IInventoryLinkRepository
    {
        void Add(InventoryLink inventoryLink);
        void Delete(int id);
        void DeleteOutInventoryLinks(int id);
        List<InventoryLink> GetAll();
        List<InventoryLink> GetAllByInventoryIn(int inventoryId);
        List<InventoryLink> GetAllByInventoryOut(int inventoryId);
        InventoryLink GetById(int id);
        void Update(InventoryLink inventoryLink);
    }
}