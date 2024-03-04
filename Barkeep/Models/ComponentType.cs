using System.ComponentModel.DataAnnotations;

namespace Barkeep.Models
{
    public class ComponentType
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
    }
}
