namespace Barkeep.Models
{
    public class Bar
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Street { get; set; }
        public string Email { get; set; }
        public string? Website { get; set; }
        public int UserId { get; set; }
        public int CityId { get; set; }
        public int? RegionId { get; set; }
        public int? StateId { get; set; }
        public int? CountryId { get; set;}
        public User? User { get; set; }
        public City? City { get; set; }
        public Region? Region { get; set; }
        public State? State { get; set; }
        public Country? Country { get; set; }

    }
}
