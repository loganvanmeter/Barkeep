namespace Barkeep.Models
{
    public class Inventory
    {
        public int Id { get; set; }
        public int BarId { get; set; }
        public int ComponentId { get; set; }
        public decimal Quantity { get; set; }

        public int UnitId { get; set; }
        public int UnitTypeId { get; set; }
        public decimal CostPerOunce { get; set; }
        public decimal Markup {  get; set; }

        public Component? Component { get; set; }
        public Unit? Unit { get; set; }
        public UnitType? UnitType { get; set; }
        
        public List<InventoryAdjustment> InventoryAdjustments { get; set; }

        public decimal SuggestedPrice {
             get
            {
                return CostPerOunce * (Markup/100);
            }
        }

    }
}
