using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;

namespace Barkeep.Repositories
{
    public class UnitRepository : BaseRepository, IUnitRepository
    {
        public UnitRepository(IConfiguration configuration) : base(configuration) { }

        //Private helper methods to DRY out Unit SQL queries
        private string GetCountries()
        {
            return @"SELECT 
                    u.Id, u.Size, u.Measurement, u.Name, u.ImperialConversion, u.MetricConversion
                    
                    FROM [Unit] u";
        }

        private string OrderByName()
        {
            return " ORDER BY u.Name";
        }

        private Unit UnitObject(SqlDataReader reader)
        {
            Unit unit = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                Size = DbUtils.GetDecimal(reader, "Size"),
                Measurement = DbUtils.GetString(reader, "Measurement"),
                ImperialConversion = DbUtils.GetDecimal(reader, "ImperialConversion"),
                MetricConversion = DbUtils.GetDecimal(reader, "MetricConversion")

            };
            return unit;
        }

        public List<Unit> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetCountries();
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    var units = new List<Unit>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Unit unit = UnitObject(reader);

                        units.Add(unit);
                    }

                    reader.Close();
                    return units;
                }
            }
        }

        public Unit GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetCountries();
                    sql += " WHERE u.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    Unit unit = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        unit = UnitObject(reader);
                    }

                    reader.Close();
                    return unit;
                }
            }
        }

        public void Add(Unit unit)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Unit ([Size], [Measurement], [Name], [ImperialConversion], [MetricConversion])
                        OUTPUT INSERTED.ID
                        VALUES (@Size, @Measurement, @Name, @ImperialConversion, @MetricConversion)";


                    DbUtils.AddParameter(cmd, "@Name", unit.Name);
                    DbUtils.AddParameter(cmd, "@Size", unit.Size);
                    DbUtils.AddParameter(cmd, "@Measurement", unit.Measurement);
                    DbUtils.AddParameter(cmd, "@ImperialConversion", unit.ImperialConversion);
                    DbUtils.AddParameter(cmd, "@MetricConversion", unit.MetricConversion);

                    unit.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Unit unit)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Unit
                        SET
                        [Name] = @Name,
                        Size = @Size,
                        Measurement = @Measurement,
                        ImperialConversion = @ImperialConversion,
                        MetricConversion = @MetricConversion
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", unit.Id);
                    DbUtils.AddParameter(cmd, "@Name", unit.Name);
                    DbUtils.AddParameter(cmd, "@Size", unit.Size);
                    DbUtils.AddParameter(cmd, "@Measurement", unit.Measurement);
                    DbUtils.AddParameter(cmd, "@ImperialConversion", unit.ImperialConversion);
                    DbUtils.AddParameter(cmd, "@MetricConversion", unit.MetricConversion);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Unit
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
