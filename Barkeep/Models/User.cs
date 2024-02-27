using System.ComponentModel.DataAnnotations;

namespace Barkeep.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string DisplayName { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(50)]
        [DataType(DataType.PhoneNumber)]
        public string Phone { get; set; }

        [Required]
        [MaxLength(50)]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [MaxLength(8)]
        public string Pin { get; set; }

        public DateTime CreateDateTime { get; set; }

        public DateTime? EndDateTime { get; set; }

        [Required]
        public int UserTypeId { get; set; }

        public bool IsActive {  get; set; }

        public string Password { get; set; }

        public UserType? UserType { get; set; }

        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }
    }
}
