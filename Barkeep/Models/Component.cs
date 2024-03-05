using System.ComponentModel.DataAnnotations;

namespace Barkeep.Models
{
    public class Component
    {
        public int Id { get; set; }
        public int ComponentTypeId { get; set; }
        public string Name { get; set; }
        public double? Abv { get; set; }
        public double? Ibu { get; set; }
        public string? Description { get; set; }
        public DateTime? Year { get; set; }
        public int? CityId { get; set; }
        public int? RegionId { get; set; }
        public int? StateId { get; set; }
        public int? CountryId { get; set; }
        public int? ProducerId { get; set; }
        public int? ImporterId { get; set; }
        public int? ProviderBarId { get; set; }
        public bool IsAdminApproved { get; set; }
        public ComponentType ComponentType { get; set; }
        public City? City { get; set; }
        public Region? Region { get; set; }
        public State? State { get; set; }
        public Country? Country { get; set; }
        public Producer? Producer { get; set; }
        public Importer? Importer { get; set; }
    }
}
