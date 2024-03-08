using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface IInventoryAdjustmentTypeRepository
    {
        void Add(InventoryAdjustmentType inventoryAdjustmentType);
        void Delete(int id);
        List<InventoryAdjustmentType> GetAll();
        InventoryAdjustmentType GetById(int id);
        void Update(InventoryAdjustmentType inventoryAdjustmentType);
    }
}