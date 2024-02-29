using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;

namespace Barkeep.Repositories
{
    public class RegionRepository : BaseRepository, IRegionRepository
    {
        public RegionRepository(IConfiguration configuration) : base(configuration) { }

        private string GetRegionWithStateAndOrCountry()
        {
            return @"SELECT 
                    r.Id, r.Name, r.StateId, r.CountryId,

                    s.Id, s.Name AS SName, s.CountryId as SCountryId,

                    sc.Id, sc.Name AS SCName,

                    c.Id, c.Name AS CName
                    
                    FROM [Region] r
                    LEFT JOIN [State] s ON s.Id = r.StateId
                    LEFT JOIN [Country] sc ON sc.Id = s.CountryId
                    LEFT JOIN [Country] c ON c.Id = r.CountryId
                    ";
        }

        private string OrderByName()
        {
            return " ORDER BY r.Name";
        }

        private Region RegionObject(SqlDataReader reader)
        {
            Region region = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                StateId = DbUtils.GetNullableInt(reader, "StateId"),
                CountryId = DbUtils.GetNullableInt(reader, "CountryId")
            };

            if (DbUtils.IsNotDbNull(reader, "StateId"))
            {
                region.State = new State()
                {
                    Id = DbUtils.GetInt(reader, "StateId"),
                    Name = DbUtils.GetString(reader, "SName"),
                    CountryId = DbUtils.GetInt(reader, "SCountryId"),
                    Country = new Country()
                    {
                        Id = DbUtils.GetInt(reader, "SCountryId"),
                        Name = DbUtils.GetString(reader, "SCName")
                    },
                };
            }

            if (DbUtils.IsNotDbNull(reader, "CountryId"))
            {
                region.Country = new Country()
                {
                    Id = DbUtils.GetInt(reader, "CountryId"),
                    Name = DbUtils.GetString(reader, "CName")
                };
            }

            return region;
        }
        public List<Region> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetRegionWithStateAndOrCountry();
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    var regions = new List<Region>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Region region = RegionObject(reader);

                        regions.Add(region);
                    }

                    reader.Close();
                    return regions;
                }
            }
        }

        public List<Region> GetAllStateRegions()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetRegionWithStateAndOrCountry();
                    sql += " WHERE CountryId IS NULL";
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    var regions = new List<Region>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Region region = RegionObject(reader);

                        regions.Add(region);
                    }

                    reader.Close();
                    return regions;
                }
            }
        }

        public List<Region> GetAllCountryRegions()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetRegionWithStateAndOrCountry();
                    sql += " WHERE StateId IS NULL";
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    var regions = new List<Region>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Region region = RegionObject(reader);

                        regions.Add(region);
                    }

                    reader.Close();
                    return regions;
                }
            }
        }

        public Region GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetRegionWithStateAndOrCountry();
                    sql += " WHERE r.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    Region region = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        region = RegionObject(reader);
                    }

                    reader.Close();
                    return region;
                }
            }
        }

        public void Add(Region region)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Region ([Name], [StateId], [CountryId])
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @StateId, @CountryId)";


                    DbUtils.AddParameter(cmd, "@Name", region.Name);
                    DbUtils.AddParameter(cmd, "@StateId", DbUtils.ValueOrDBNull(region.StateId));
                    DbUtils.AddParameter(cmd, "@CountryId", DbUtils.ValueOrDBNull(region.CountryId));

                    region.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Region region)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Region
                        SET
                        [Name] = @Name,
                        StateId = @StateId,
                        CountryId = @CountryId
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", region.Id);
                    DbUtils.AddParameter(cmd, "@Name", region.Name);
                    DbUtils.AddParameter(cmd, "@StateId", DbUtils.ValueOrDBNull(region.StateId));
                    DbUtils.AddParameter(cmd, "@CountryId", DbUtils.ValueOrDBNull(region.CountryId));


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
                        DELETE FROM Region
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
