namespace Barkeep.Models
{
    public class MenuItem
    {
        public int Id { get; set; }
        public int MenuId { get; set; }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public int? MenuCategoryId { get; set; }
        public decimal Price { get; set; }
        public bool Enabled { get; set; }
        public string? Notes { get; set; }
        public MenuCategory? MenuCategory { get; set; }

        public Build? Build { get; set; }
    }
}
