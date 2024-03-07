using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;

namespace Barkeep.Repositories
{
    public class BarRepository : BaseRepository, IBarRepository
    {
        public BarRepository(IConfiguration configuration) : base(configuration) { }

        private string GetBarWithUserAndLocation()
        {
            return @"SELECT 
                    b.Id, b.Name, b.Phone, b.Street, b.Email, b.Website, b.UserId, b.CityId, b.RegionId, 
                    b.StateId, b.CountryId,

                    u.Id, u.DisplayName, u.FirstName, u.LastName, u.Phone AS UPhone, u.Email AS UEmail, 
                    u.Pin, u.CreateDateTime, u.EndDateTime, u.UserTypeId, u.IsActive,
                    u.Password,

                    c.Id, c.Name AS CName, c.RegionId AS CRegionId, c.StateId AS CStateId, c.CountryId AS CCountryId,

                    r.Id, r.Name AS RName, r.StateId AS RStateId, r.CountryId AS RCountryId,

                    s.Id, s.Name AS SName, s.CountryId AS SCountryId,

                    bc.Id, bc.Name AS BCName
                    
                    FROM [Bar] b
                    LEFT JOIN [User] u ON u.Id = b.UserId
                    LEFT JOIN [City] c ON c.Id = b.CityId
                    LEFT JOIN [Region] r ON r.Id = b.RegionId
                    LEFT JOIN [State] s ON s.Id = b.StateId
                    LEFT JOIN [Country] bc ON bc.Id = b.CountryId
                    ";
        }

        private string OrderByName()
        {
            return " ORDER BY b.Name";
        }
        private Bar BarObject(SqlDataReader reader)
        {
            var bar = new Bar ()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                Phone = DbUtils.GetString(reader, "Phone"),
                Street = DbUtils.GetString(reader, "Street"),
                Email = DbUtils.GetString(reader, "Email"),
                Website = DbUtils.GetString(reader, "Website"),
                UserId = DbUtils.GetInt(reader, "UserId"),
                CityId = DbUtils.GetInt(reader, "CityId"),
                RegionId = DbUtils.GetNullableInt(reader, "RegionId"),
                StateId = DbUtils.GetNullableInt(reader, "StateId"),
                CountryId = DbUtils.GetNullableInt(reader, "CountryId"),
              
            };

                if (DbUtils.IsNotDbNull(reader, "UserId"))
                {
                bar.User = new User()
                {
                    Id = DbUtils.GetInt(reader, "UserId"),
                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                    Phone = DbUtils.GetString(reader, "UPhone"),
                    Email = DbUtils.GetString(reader, "UEmail"),
                    Pin = DbUtils.GetString(reader, "Pin"),
                    CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                    EndDateTime = DbUtils.GetNullableDateTime(reader, "EndDateTime"),
                    IsActive = reader.GetBoolean(reader.GetOrdinal("IsActive")),
                    Password = DbUtils.GetString(reader, "Password"),
                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                };
                }

                if (DbUtils.IsNotDbNull(reader, "CityId"))
            {
                bar.City = new City()
                {
                    Id = DbUtils.GetInt(reader, "CityId"),
                    Name = DbUtils.GetString(reader, "CName"),
                    RegionId = DbUtils.GetNullableInt(reader, "CRegionId"),
                    StateId = DbUtils.GetNullableInt(reader, "CStateId"),
                    CountryId = DbUtils.GetNullableInt(reader, "CCountryId"),
                };
            }

                if (DbUtils.IsNotDbNull(reader, "RegionId"))
            {
                bar.Region = new Region()
                {
                    Id = DbUtils.GetInt(reader, "RegionId"),
                    Name = DbUtils.GetString(reader, "RName"),
                    StateId = DbUtils.GetNullableInt(reader, "RStateId"),
                    CountryId = DbUtils.GetNullableInt(reader, "RCountryId")
                };

            }

            if (DbUtils.IsNotDbNull(reader, "StateId"))
            {
                bar.State = new State()
                {
                    Id = DbUtils.GetInt(reader, "StateId"),
                    Name = DbUtils.GetString(reader, "SName"),
                    CountryId = DbUtils.GetInt(reader, "SCountryId"),
                };
            }

            if (DbUtils.IsNotDbNull(reader, "CountryId"))
            {
                bar.Country = new Country()
                {
                    Id = DbUtils.GetInt(reader, "CountryId"),
                    Name = DbUtils.GetString(reader, "BCName"),
                };
            }

            return bar;
        }

        public List<Bar> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetBarWithUserAndLocation();
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    var bars = new List<Bar>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Bar bar = BarObject(reader);

                        bars.Add(bar);
                    }

                    reader.Close();
                    return bars;
                }
            }
        }

        public List<Bar> GetAllByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetBarWithUserAndLocation();
                    sql += " WHERE b.UserId = @userId";
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@userId", userId);

                    var bars = new List<Bar>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Bar bar = BarObject(reader);

                        bars.Add(bar);
                    }

                    reader.Close();
                    return bars;
                }
            }
        }

        public Bar GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetBarWithUserAndLocation();
                    sql += " WHERE b.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    Bar bar = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        bar = BarObject(reader);
                    }

                    reader.Close();
                    return bar;
                }
            }
        }


        public void Add(Bar bar)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Bar ([Name], [Phone], [Street], [Email], [Website], [UserId], [CityId], [RegionId], [StateId], [CountryId])
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @Phone, @Street, @Email, @Website, @UserId, @CityId, @RegionId, @StateId, @CountryId)";


                    DbUtils.AddParameter(cmd, "@Name", bar.Name);
                    DbUtils.AddParameter(cmd, "@Phone", bar.Phone);
                    DbUtils.AddParameter(cmd, "@Street", bar.Street);
                    DbUtils.AddParameter(cmd, "@Email", bar.Email);
                    DbUtils.AddParameter(cmd, "@Website", DbUtils.ValueOrDBNull(bar.Website));
                    DbUtils.AddParameter(cmd, "@UserId", bar.UserId);
                    DbUtils.AddParameter(cmd, "@CityId", bar.CityId);
                    DbUtils.AddParameter(cmd, "@RegionId", DbUtils.ValueOrDBNull(bar.RegionId));
                    DbUtils.AddParameter(cmd, "@StateId", DbUtils.ValueOrDBNull(bar.StateId));
                    DbUtils.AddParameter(cmd, "@CountryId", DbUtils.ValueOrDBNull(bar.CountryId));

                    bar.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Bar bar)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Bar
                        SET
                        [Name] = @Name,
                        Phone = @Phone,
                        Street = @Street,
                        Email = @Email,
                        Website = @Website,
                        UserId = @UserId,
                        CityId = @CityId,
                        RegionId = @RegionId,
                        StateId = @StateId,
                        CountryId = @CountryId
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", bar.Id);
                    DbUtils.AddParameter(cmd, "@Name", bar.Name);
                    DbUtils.AddParameter(cmd, "@Phone", bar.Phone);
                    DbUtils.AddParameter(cmd, "@Street", bar.Street);
                    DbUtils.AddParameter(cmd, "@Email", bar.Email);
                    DbUtils.AddParameter(cmd, "@Website", DbUtils.ValueOrDBNull(bar.Website));
                    DbUtils.AddParameter(cmd, "@UserId", bar.UserId);
                    DbUtils.AddParameter(cmd, "@CityId", bar.CityId);
                    DbUtils.AddParameter(cmd, "@RegionId", DbUtils.ValueOrDBNull(bar.RegionId));
                    DbUtils.AddParameter(cmd, "@StateId", DbUtils.ValueOrDBNull(bar.StateId));
                    DbUtils.AddParameter(cmd, "@CountryId", DbUtils.ValueOrDBNull(bar.CountryId));


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
                        DELETE FROM Bar
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
