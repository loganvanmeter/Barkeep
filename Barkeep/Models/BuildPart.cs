namespace Barkeep.Models
{
    public class BuildPart
    {
        public int Id { get; set; }
        public int BuildId { get; set; }
        public decimal Amount { get; set; }
        public int UnitId { get; set; }
        public int InventoryId { get; set; }
        public int Order { get; set; }
        public bool IsPrimary { get; set; }
        public Unit? Unit { get; set; }
        public Inventory? Inventory { get; set; }
    }
}
