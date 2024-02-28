using System.ComponentModel.DataAnnotations;

namespace Barkeep.Models
{
    public class VarietalType
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string? Description { get; set; }
    }
}
