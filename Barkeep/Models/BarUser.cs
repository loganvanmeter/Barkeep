namespace Barkeep.Models
{
    public class BarUser
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int BarId { get; set; }
        public int UserTypeId { get; set; }
        public double PayRate { get; set; }
        public int PayRateTypeId { get; set; }
        public DateTime CreateDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }
        public bool IsActive { get; set; }
        public int RoleId { get; set; }
        public User User { get; set; }
        public UserType UserType { get; set; }
        public PayRateType PayRateType { get; set; }
        public Role Role { get; set; }
    }
}
