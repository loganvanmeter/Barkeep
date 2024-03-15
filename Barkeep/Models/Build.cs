namespace Barkeep.Models
{
    public class Build
    {
        public int Id { get; set; }
        public int MenuItemId { get; set; }
        public List<BuildPart>? Parts { get; set;}
    }
}
