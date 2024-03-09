namespace Barkeep.Models
{
    public class InventoryAdjustment
    {
        public int Id { get; set; }
        public int InventoryId { get; set; }
        public int? DistributorId { get; set; }
        public int InventoryAdjustmentTypeId { get; set; }
        public decimal Quantity { get; set; }
        public int ItemsPerUnit { get; set; }
        public decimal Cost { get; set; }
        public int UnitId { get; set; }
        public int UnitTypeId { get; set; }
        public bool IncludeInInventoryCostPerOunce { get; set; }
        public DateTime CreateDateTime { get; set; }
        public DateTime? ExpirationDate { get; set; }

        public int BarUserId { get; set; }

        public BarUser? BarUser {  get; set; }

        public InventoryAdjustmentType? InventoryAdjustmentType { get; set; }
        public Unit? Unit { get; set; }
        public UnitType? UnitType { get; set; }
    }
}
