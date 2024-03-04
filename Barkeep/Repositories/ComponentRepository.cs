﻿using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;

namespace Barkeep.Repositories
{
    public class ComponentRepository : BaseRepository, IComponentRepository
    {
        public ComponentRepository(IConfiguration configuration) : base(configuration) { }

        private string GetComponents()
        {
            return @"SELECT 
                    c.Id, c.ComponentTypeId, c.Name, c.Abv, c.Ibu, c.Description, c.Year,
                    c.CityId, c.RegionId, c.StateId, c.CountryId, c.ProducerId, c.ImporterId,
                    c.ProviderBarId, c.IsAdminApproved

                    ct.Id, ct.Name AS CTName,

                    ci.Id, ci.Name AS CIName, ci.RegionId AS CIRegionId, ci.StateId AS CIStateId, 
                    ci.CountryId AS CICountryId,

                    r.Id, r.Name AS RName, r.StateId AS RStateId, r.CountryId AS RCountryId,

                    s.Id, s.Name AS SName, s.CountryId AS SCountryId,

                    co.Id, co.Name AS COName,

                    p.Id, p.Name AS PName, p.Description AS PDescription, p.Website AS PWebsite,

                    i.Id, i.Name AS IName, i.Description AS IDescription, i.Website AS IWebsite
                    
                    FROM [Component] c
                    LEFT JOIN [ComponentType] ct ON ct.Id = c.ComponentTypeId
                    LEFT JOIN [City] ci ON ci.Id = c.CityId
                    LEFT JOIN [Region] r ON r.Id = c.RegionId
                    LEFT JOIN [State] s ON s.Id = c.StateId
                    LEFT JOIN [Country] co ON co.Id = c.CountryId
                    LEFT JOIN [Producer] p ON p.Id = c.ProducerId
                    LEFT JOIN [Importer] i ON i.id = c.ImporterId
                    ";
        }

        private string OrderByName()
        {
            return " ORDER BY c.Name";
        }

        private Component ComponentObject(SqlDataReader reader)
        {
            Component component = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                ComponentTypeId = DbUtils.GetInt(reader, "ComponentTypeId"),
                Name = DbUtils.GetString(reader, "Name"),
                Abv = DbUtils.GetNullableDouble(reader, "Abv"),
                Ibu = DbUtils.GetNullableDouble(reader, "Ibu"),
                Description = DbUtils.GetString(reader, "Description"),
                Year = DbUtils.GetNullableDateTime(reader, "Year"),
                CityId = DbUtils.GetNullableInt(reader, "CityId"),
                StateId = DbUtils.GetNullableInt(reader, "StateId"),
                RegionId = DbUtils.GetNullableInt(reader, "RegionId"),
                CountryId = DbUtils.GetInt(reader, "CountryId"),
                ProviderBarId = DbUtils.GetNullableInt(reader, "ProviderBarId"),
                ImporterId = DbUtils.GetNullableInt(reader, "ImporterId"),
                ProducerId = DbUtils.GetNullableInt(reader, "ProducerId"),
                IsAdminApproved = DbUtils.GetBoolean(reader, "IsAdminApproved"),
                ComponentType = new ComponentType()
                {
                    Id = DbUtils.GetInt(reader, "ComponentTypeId"),
                    Name = DbUtils.GetString(reader, "CTName")
                },
                Country = new Country()
                {
                    Id = DbUtils.GetInt(reader, "CountryId"),
                    Name = DbUtils.GetString(reader, "COName")
                }
            };

            if (DbUtils.IsNotDbNull(reader, "CityId"))
            {
                component.City = new()
                {
                    Id = DbUtils.GetInt(reader, "CityId"),
                    Name = DbUtils.GetString(reader, "CIName"),
                    RegionId = DbUtils.GetInt(reader, "CIRegionId"),
                    StateId = DbUtils.GetInt(reader, "CIStateId"),
                    CountryId = DbUtils.GetInt(reader, "CICountryId"),
                };
            }

            if (DbUtils.IsNotDbNull(reader, "RegionId"))
            {
                component.Region = new()
                {
                    Id = DbUtils.GetInt(reader, "RegionId"),
                    Name = DbUtils.GetString(reader, "RName"),
                    StateId = DbUtils.GetInt(reader, "RStateId"),
                    CountryId = DbUtils.GetInt(reader, "RCountryId"),
                };
            }

            if (DbUtils.IsNotDbNull(reader, "StateId"))
            {
                component.State = new()
                {
                    Id = DbUtils.GetInt(reader, "StateId"),
                    Name = DbUtils.GetString(reader, "SName"),
                    CountryId = DbUtils.GetInt(reader, "SCountryId"),
                };
            }

            if (DbUtils.IsNotDbNull(reader, "ProducerId"))
            {
                component.Producer = new()
                {
                    Id = DbUtils.GetInt(reader, "ProducerId"),
                    Name = DbUtils.GetString(reader, "PName"),
                    Description = DbUtils.GetString(reader, "PDescription"),
                    Website = DbUtils.GetString(reader, "PWebsite")
                };
            }

            if (DbUtils.IsNotDbNull(reader, "ImporterId"))
            {
                component.Importer = new()
                {
                    Id = DbUtils.GetInt(reader, "ImporterId"),
                    Name = DbUtils.GetString(reader, "IName"),
                    Description = DbUtils.GetString(reader, "IDescription"),
                    Website = DbUtils.GetString(reader, "IWebsite")
                };
            }
            return component;
        }
        public List<Component> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetComponents();
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    var components = new List<Component>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Component component = ComponentObject(reader);

                        components.Add(component);
                    }

                    reader.Close();
                    return components;
                }
            }
        }

        public List<Component> GetAllByBarId(int barId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetComponents();
                    sql += " WHERE c.IsAdminApproved = 1 OR c.ProviderBarId = @barId";
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@barId", barId);

                    var components = new List<Component>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Component component = ComponentObject(reader);

                        components.Add(component);
                    }

                    reader.Close();
                    return components;
                }
            }
        }

        public Component GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetComponents();
                    sql += " WHERE c.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    Component component = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        component = ComponentObject(reader);
                    }

                    reader.Close();
                    return component;
                }
            }
        }

        public void Add(Component component)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Component ([Name], [ComponentTypeId], [Abv], [Ibu], [Description], [Year], 
                        [CityId], [RegionId], [StateId], [CountryId], [ProducerId], [ImporterId], [ProviderBarId],
                        [IsAdminApproved])
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @ComponentTypeId, @Abv, @Ibu, @Description, @Year, 
                        @CityId, @RegionId, @StateId, @CountryId, @ProducerId, @ImporterId, @ProviderBarId,
                        @IsAdminApproved)";


                    DbUtils.AddParameter(cmd, "@Name", component.Name);
                    DbUtils.AddParameter(cmd, "@ComponentTypeId", component.ComponentTypeId);
                    DbUtils.AddParameter(cmd, "@Abv", DbUtils.ValueOrDBNull(component.Abv));
                    DbUtils.AddParameter(cmd, "@Ibu", DbUtils.ValueOrDBNull(component.Ibu));
                    DbUtils.AddParameter(cmd, "@Description", DbUtils.ValueOrDBNull(component.Description));
                    DbUtils.AddParameter(cmd, "@Year", DbUtils.ValueOrDBNull(component.Year));
                    DbUtils.AddParameter(cmd, "@CityId", DbUtils.ValueOrDBNull(component.CityId));
                    DbUtils.AddParameter(cmd, "@RegionId", DbUtils.ValueOrDBNull(component.RegionId));
                    DbUtils.AddParameter(cmd, "@StateId", DbUtils.ValueOrDBNull(component.StateId));
                    DbUtils.AddParameter(cmd, "@CountryId", component.CountryId);
                    DbUtils.AddParameter(cmd, "@ProducerId", DbUtils.ValueOrDBNull(component.ProducerId));
                    DbUtils.AddParameter(cmd, "@ImporterId", DbUtils.ValueOrDBNull(component.ImporterId));
                    DbUtils.AddParameter(cmd, "@ProviderBarId", DbUtils.ValueOrDBNull(component.ProviderBarId));
                    DbUtils.AddParameter(cmd, "@IsAdminApproved", component.IsAdminApproved);

                    component.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Component component)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Component
                        SET
                        [Name] = @Name, 
                        ComponentTypeId = @ComponentTypeId, 
                        Abv = @Abv, 
        q               Ibu = @Ibu,
                        Description = @Description, 
                        Year = @Year, 
                        CityId = @CityId, 
                        RegionId = @RegionId, 
                        StateId = @StateId, 
                        CountryId = @CountryId, 
                        ProducerId = @ProducerId, 
                        ImporterId = @ImporterId, 
                        ProviderBarId = @ProviderBarId,
                        IsAdminApproved = @IsAdminApproved
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", component.Id);
                    DbUtils.AddParameter(cmd, "@Name", component.Name);
                    DbUtils.AddParameter(cmd, "@ComponentTypeId", component.ComponentTypeId);
                    DbUtils.AddParameter(cmd, "@Abv", DbUtils.ValueOrDBNull(component.Abv));
                    DbUtils.AddParameter(cmd, "@Ibu", DbUtils.ValueOrDBNull(component.Ibu));
                    DbUtils.AddParameter(cmd, "@Description", DbUtils.ValueOrDBNull(component.Description));
                    DbUtils.AddParameter(cmd, "@Year", DbUtils.ValueOrDBNull(component.Year));
                    DbUtils.AddParameter(cmd, "@CityId", DbUtils.ValueOrDBNull(component.CityId));
                    DbUtils.AddParameter(cmd, "@RegionId", DbUtils.ValueOrDBNull(component.RegionId));
                    DbUtils.AddParameter(cmd, "@StateId", DbUtils.ValueOrDBNull(component.StateId));
                    DbUtils.AddParameter(cmd, "@CountryId", component.CountryId);
                    DbUtils.AddParameter(cmd, "@ProducerId", DbUtils.ValueOrDBNull(component.ProducerId));
                    DbUtils.AddParameter(cmd, "@ImporterId", DbUtils.ValueOrDBNull(component.ImporterId));
                    DbUtils.AddParameter(cmd, "@ProviderBarId", DbUtils.ValueOrDBNull(component.ProviderBarId));
                    DbUtils.AddParameter(cmd, "@IsAdminApproved", component.IsAdminApproved);


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
                        DELETE FROM Component
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
