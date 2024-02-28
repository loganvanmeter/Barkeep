using System.ComponentModel.DataAnnotations;

namespace Barkeep.Models
{
    public class Varietal
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string? Description { get; set; }

        public int VarietalTypeId { get; set; }

        public VarietalType? VarietalType { get; set; }


    }
}
