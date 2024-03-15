namespace Barkeep.Models
{
    public class Menu
    {
        public int Id { get; set; }
        public int BarId { get; set; }
        public string Name { get; set; }
        public DateTime CreateDateTime { get; set; }
        public bool Enabled { get; set; }
        public List<MenuCategory>? MenuCategories { get; set; }
        public List<MenuItem>? MenuItems { get; set; }
    }
}
