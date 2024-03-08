using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface IInventoryAdjustmentRepository
    {
        void Add(InventoryAdjustment inventoryAdjustment);
        void Delete(int id);
        void DeleteInventoryInventoryAdjustments(int inventoryId);
        List<InventoryAdjustment> GetAll();
        List<InventoryAdjustment> GetAllByInventory(int inventoryId);
        InventoryAdjustment GetById(int id);
        void Update(InventoryAdjustment inventoryAdjustment);
    }
}