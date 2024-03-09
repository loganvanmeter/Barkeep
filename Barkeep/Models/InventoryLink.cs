namespace Barkeep.Models
{
    public class InventoryLink
    {
        public int Id { get; set; }
        public int InInventoryId { get; set; }
        public decimal InAmount { get; set; }
        public int OutInventoryId { get; set; }
        public decimal OutAmount { get; set; }
        public bool OnlyAdjustsOnStock { get; set; }
        public decimal Yield
        {
            get
            {
                return InAmount / OutAmount;
            }
        }
    }
}
