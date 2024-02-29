using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;

namespace Barkeep.Repositories
{
    public class CityRepository : BaseRepository, ICityRepository
    {
        public CityRepository(IConfiguration configuration) : base(configuration) { }

        private string GetCityWithRegionStateCountry()
        {
            return @"SELECT 
                    c.Id, c.Name, c.RegionId, c.StateId, c.CountryId,

                    r.Id, r.Name AS RName, r.StateId AS RStateId, r.CountryId AS RCountryId,

                    rs.Id, rs.Name AS RSName, rs.CountryId as RSCountryId,

                    rsc.Id, rsc.Name AS RSCName,

                    rc.Id, rc.Name AS RCName,

                    s.Id, s.Name AS SName, s.CountryId AS SCountryId,

                    sc.Id, sc.Name AS SCName,

                    cc.Id, cc.Name AS COName
                    
                    FROM [City] c
                    LEFT JOIN [Region] r ON r.Id = c.RegionId
                    LEFT JOIN [State] rs ON rs.Id = r.StateId
                    LEFT JOIN [Country] rsc ON rsc.Id = rsc.CountryId
                    LEFT JOIN [Country] rc ON rc.Id = r.CountryId
                    LEFT JOIN [State] s ON s.Id = c.StateId
                    LEFT JOIN [Country] sc ON sc.Id = s.CountryId
                    LEFT JOIN [Country] cc ON cc.Id = c.CountryId
                    
                    
                    ";
        }

        private string OrderByName()
        {
            return " ORDER BY s.Name";
        }
        private City CityObject(SqlDataReader reader)
        {
            City city = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                RegionId = DbUtils.GetInt(reader, "RegionId"),
                StateId = DbUtils.GetInt(reader, "StateId"),
                CountryId = DbUtils.GetInt(reader, "CountryId"),
            };

            if (DbUtils.IsNotDbNull(reader, "RegionId"))
            {
                city.Region = new Region()
                {
                    Id = DbUtils.GetInt(reader, "RegionId"),
                    Name = DbUtils.GetString(reader, "RName"),
                    StateId = DbUtils.GetNullableInt(reader, "RStateId"),
                    CountryId = DbUtils.GetNullableInt(reader, "RCountryId")
                };

                if (DbUtils.IsNotDbNull(reader, "RStateId"))
                {
                    city.Region.State = new State()
                    {
                        Id = DbUtils.GetInt(reader, "RStateId"),
                        Name = DbUtils.GetString(reader, "RSName"),
                        CountryId = DbUtils.GetInt(reader, "RSCountryId"),
                        Country = new Country()
                        {
                            Id = DbUtils.GetInt(reader, "RSCountryId"),
                            Name = DbUtils.GetString(reader, "RSCName"),
                        }
                    };
                }

                if (DbUtils.IsNotDbNull(reader, "RCountryId"))
                {
                    city.Region.Country = new Country()
                    {
                        Id = DbUtils.GetInt(reader, "RCountryId"),
                        Name = DbUtils.GetString(reader, "RCName"),
                    };
                }
            }

            if (DbUtils.IsNotDbNull(reader, "StateId"))
            {
                city.State = new State()
                {
                    Id = DbUtils.GetInt(reader, "StateId"),
                    Name = DbUtils.GetString(reader, "SName"),
                    CountryId = DbUtils.GetInt(reader, "SCountryId"),
                    Country = new Country()
                    {
                        Id = DbUtils.GetInt(reader, "SCountryId"),
                        Name = DbUtils.GetString(reader, "SCName"),
                    }
                };
            }

            if (DbUtils.IsNotDbNull(reader, "CountryId"))
            {
                city.Country = new Country()
                {
                    Id = DbUtils.GetInt(reader, "CountryId"),
                    Name = DbUtils.GetString(reader, "CCName"),
                };
            }

            return city;
        }

        public List<City> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetCityWithRegionStateCountry();
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    var cities = new List<City>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        City city = CityObject(reader);

                        cities.Add(city);
                    }

                    reader.Close();
                    return cities;
                }
            }
        }

        public City GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetCityWithRegionStateCountry();
                    sql += " WHERE c.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    City city = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        city = CityObject(reader);
                    }

                    reader.Close();
                    return city;
                }
            }
        }

        public void Add(City city)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO City ([Name], [RegionId], [StateId], [CountryId])
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @RegionId, @StateId, @CountryId)";


                    DbUtils.AddParameter(cmd, "@Name", city.Name);
                    DbUtils.AddParameter(cmd, "@RegionId", DbUtils.ValueOrDBNull(city.RegionId));
                    DbUtils.AddParameter(cmd, "@StateId", DbUtils.ValueOrDBNull(city.StateId));
                    DbUtils.AddParameter(cmd, "@CountryId", DbUtils.ValueOrDBNull(city.CountryId));

                    city.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(City city)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE City
                        SET
                        [Name] = @Name,
                        RegionId = @RegionId,
                        StateId = @StateId,
                        CountryId = @CountryId
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", city.Id);
                    DbUtils.AddParameter(cmd, "@Name", city.Name);
                    DbUtils.AddParameter(cmd, "@RegionId", DbUtils.ValueOrDBNull(city.RegionId));
                    DbUtils.AddParameter(cmd, "@StateId", DbUtils.ValueOrDBNull(city.StateId));
                    DbUtils.AddParameter(cmd, "@CountryId", DbUtils.ValueOrDBNull(city.CountryId));


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
                        DELETE FROM City
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
