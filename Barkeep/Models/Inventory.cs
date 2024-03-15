namespace Barkeep.Models
{
    public class Inventory
    {
        public int Id { get; set; }
        public int BarId { get; set; }
        public decimal Quantity { get; set; }
        public int? ComponentId { get; set; }
        public int UnitId { get; set; }
        public decimal UnitSize { get; set; }
        public int UnitTypeId { get; set; }
        public decimal? CostPerOunce { get; set; }
        public decimal? CostPerUnit { get; set; }
        public decimal Markup {  get; set; }

        public Component? Component { get; set; }
        public Unit? Unit { get; set; }
        public UnitType? UnitType { get; set; }
        
        public List<InventoryAdjustment>? InventoryAdjustments { get; set; }
        public List<InventoryLink>? InInventoryLinks { get; set; }
        public List<InventoryLink>? OutInventoryLinks { get; set; }

        public decimal? SuggestedPrice {
             get
            {
                if(CostPerOunce != null)
                {
                    return (CostPerOunce * Markup) / 100;
                } else
                {
                    return (CostPerUnit * Markup) / 100;
                }
            }
        }
        public decimal TotalQuantity { 
             get
            {
                if (InventoryAdjustments != null && InventoryAdjustments.Count > 0)
                {
                    return InventoryAdjustments.GetQuantity(Unit, UnitSize, Quantity);
                } else
                {
                    return Quantity;
                }
            }

             }
    }
}
