using System.ComponentModel.DataAnnotations;

namespace Barkeep.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        public string? Description { get; set; }

        public int? ProviderBarId { get; set; }

        [Required]
        public bool IsAdminApproved { get; set; }
    }
}
