namespace Barkeep.Models
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int? RegionId { get; set; }
        public int? StateId { get; set; }

        public int? CountryId { get; set; }

        public Region? Region { get; set; }

        public State? State { get; set; }

        public Country? Country { get; set; }
    }
}
