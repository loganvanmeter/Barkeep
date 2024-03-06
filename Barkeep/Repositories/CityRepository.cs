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
                    c.Id , c.Name AS CityName, c.RegionId AS CityRegionId, c.StateId AS CityStateId, c.CountryId AS CityCountryId,

                    cr.Id , cr.Name AS CityRegionName, cr.StateId AS CityRegionStateId, cr.CountryId AS CityRegionCountryId,

                    crs.Id , crs.Name AS CityRegionStateName, crs.CountryId AS CityRegionStateCountryId,

                    crsc.Id , crsc.Name AS CityRegionStateCountryName,

                    crc.Id , crc.Name AS CityRegionCountryName,

                    cs.Id , cs.Name AS CityStateName, cs.CountryId AS CityStateCountryId,

                    csc.Id, csc.Name AS CityStateCountryName,

                    cc.Id, cc.Name AS CityCountryName
                    
                    FROM [City] c
                    LEFT JOIN [Region] cr ON cr.Id = c.RegionId
                    LEFT JOIN [State] crs ON crs.Id = cr.StateId
                    LEFT JOIN [Country] crsc ON crsc.Id = crs.CountryId
                    LEFT JOIN [Country] crc ON crc.Id = cr.CountryId
                    LEFT JOIN [State] cs ON cs.Id = c.StateId
                    LEFT JOIN [Country] csc ON csc.Id = cs.CountryId
                    LEFT JOIN [Country] cc ON cc.Id = c.CountryId
                    
                    
                    ";
        }

        private string OrderByName()
        {
            return " ORDER BY c.Name";
        }
        private City CityObject(SqlDataReader reader)
        {
            City city = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "CityName"),
                RegionId = DbUtils.GetNullableInt(reader, "CityRegionId"),
                StateId = DbUtils.GetNullableInt(reader, "CityStateId"),
                CountryId = DbUtils.GetNullableInt(reader, "CityCountryId"),
            };

            if (DbUtils.IsNotDbNull(reader, "CityRegionId"))
            {
                city.Region = new Region()
                {
                    Id = DbUtils.GetInt(reader, "CityRegionId"),
                    Name = DbUtils.GetString(reader, "CityRegionName"),
                    StateId = DbUtils.GetNullableInt(reader, "CityRegionStateId"),
                    CountryId = DbUtils.GetNullableInt(reader, "CityRegionCountryId")
                };
            };

            if (DbUtils.IsNotDbNull(reader, "CityRegionStateId"))
            {
                city.Region.State = new State()
                {
                    Id = DbUtils.GetInt(reader, "CityRegionStateId"),
                    Name = DbUtils.GetString(reader, "CityRegionStateName"),
                    CountryId = DbUtils.GetInt(reader, "CityRegionStateCountryId"),
                    Country = new Country()
                    {
                        Id = DbUtils.GetInt(reader, "CityRegionStateCountryId"),
                        Name = DbUtils.GetString(reader, "CityRegionStateCountryName"),
                    }
                };
            };

            if (DbUtils.IsNotDbNull(reader, "CityRegionCountryId"))
            {
                city.Region.Country = new Country()
                {
                    Id = DbUtils.GetInt(reader, "CityRegionCountryId"),
                    Name = DbUtils.GetString(reader, "CityRegionCountryName"),
                };
            };


            if (DbUtils.IsNotDbNull(reader, "CityStateId"))
            {
                city.State = new State()
                {
                    Id = DbUtils.GetInt(reader, "CityStateId"),
                    Name = DbUtils.GetString(reader, "CityStateName"),
                    CountryId = DbUtils.GetInt(reader, "CityStateCountryId"),
                    Country = new Country()
                    {
                        Id = DbUtils.GetInt(reader, "CityStateCountryId"),
                        Name = DbUtils.GetString(reader, "CityStateCountryName"),
                    }
                };
            };

            if (DbUtils.IsNotDbNull(reader, "CityCountryId"))
            {
                city.Country = new Country()
                {
                    Id = DbUtils.GetInt(reader, "CityCountryId"),
                    Name = DbUtils.GetString(reader, "CityCountryName"),
                };
            };

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
