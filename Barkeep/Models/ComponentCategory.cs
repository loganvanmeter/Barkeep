namespace Barkeep.Models
{
    public class ComponentCategory
    {
        public int Id { get; set; }
        public int ComponentId { get; set; }
        public int CategoryId { get; set; }

        public Category Category { get; set; }
    }
}
