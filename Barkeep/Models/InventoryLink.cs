namespace Barkeep.Models
{
    public class InventoryLink
    {
        public int Id { get; set; }
        public int InInventoryId { get; set; }

        public int InUnitId { get; set; }
        public decimal InAmount { get; set; }
        public int OutInventoryId { get; set; }
        public int OutUnitId { get; set; }
        public decimal OutAmount { get; set; }
        public bool OnlyAdjustsOnStock { get; set; }
        public Inventory? InInventory { get; set; }
        public Inventory? OutInventory { get; set; }
        public Unit? InUnit { get; set; }
        public Unit? OutUnit { get; set; }
        public decimal Yield
        {
            get
            {
                return InAmount / OutAmount;
            }
        }
    }
}
