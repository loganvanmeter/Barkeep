using System.Diagnostics.Metrics;

namespace Barkeep.Models
{
    public class Unit
    {
        public int Id { get; set; }
        public decimal Size { get; set; }
        public string Measurement { get; set; }
        public string Name { get; set; }
        public decimal ImperialConversion { get; set; }
        public decimal MetricConversion { get; set; }
    }
}
