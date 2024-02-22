using System.ComponentModel.DataAnnotations;

namespace Barkeep.Models
{
    public class UserType
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
    }
}
