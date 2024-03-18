namespace Barkeep.Models
{
    public class MenuCategory
    {
        public int Id { get; set; }
        public int MenuId { get; set; }
        public int? MenuCategoryId { get; set; }
        public DateTime CreateDateTime { get; set; }
        public string? DisplayColor { get; set; }
        public bool? Enabled { get; set; }
        public string? Name { get; set; }
        public string? DisplayName { get; set; }
        public MenuCategory? ParentCategory { get; set; }
        public List<MenuCategory>? SubMenuCategories { get; set; }
        public List<MenuItem>? MenuItems { get; set; }
    }
}
