using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;
using System.ComponentModel;

namespace Barkeep.Repositories
{
    public class InventoryRepository : BaseRepository, IInventoryRepository
    {
        public InventoryRepository(IConfiguration configuration) : base(configuration) { }

        //Private helper methods to DRY out Inventory SQL queries
        private string GetInventory()
        {
            return @"SELECT 
                    i.Id, i.BarId, i.ComponentId, i.Quantity, i.UnitId, i.UnitSize, i.UnitTypeId, i.CostPerOunce, i.Markup,

                    c.Id, c.ComponentTypeId, c.Name, c.Abv, c.Ibu, c.Description, c.Year,
                    c.CityId, c.RegionId, c.StateId, c.CountryId, c.ProducerId, c.ImporterId,
                    c.ProviderBarId, c.IsAdminApproved,

                    ct.Id, ct.Name AS CTName,

                    ci.Id, ci.Name AS CIName, ci.RegionId AS CIRegionId, ci.StateId AS CIStateId, 
                    ci.CountryId AS CICountryId,

                    r.Id, r.Name AS RName, r.StateId AS RStateId, r.CountryId AS RCountryId,

                    s.Id, s.Name AS SName, s.CountryId AS SCountryId,

                    co.Id, co.Name AS COName,

                    p.Id, p.Name AS PName, p.Description AS PDescription, p.Website AS PWebsite,

                    im.Id, im.Name AS IMName, im.Description AS IMDescription, im.Website AS IMWebsite,

                    u.Id, u.Size AS IUSize, u.Measurement AS IUMeasurement, u.Name AS IUName, 
                    u.ImperialConversion AS IUImpertialConversion, u.MetricConversion AS IUMetricConversion,

                    ut.Id, ut.Name AS UTName, ut.IsCase AS UTIsCase, ut.IsEach AS UTIsEach, ut.IsByWeight AS UTIsByWeight,

                    ia.Id AS IAId, ia.InventoryId, ia.DistributorId, ia.InventoryAdjustmentTypeId, ia.Quantity AS IAQuantity, 
                    ia.ItemsPerUnit, ia.Cost, ia.UnitId AS IAUnitId, ia.UnitTypeId AS IAUnitTypeId, ia.IncludeInInventoryCostPerOunce,
                    ia.CreateDateTime, ia.ExpirationDate,

                    iat.Id, iat.Name AS IATName, iat.DoesAdd,

                    iau.Id, iau.Size AS IAUSize, iau.Measurement AS IAUMeasurement, iau.Name AS IAUName, 
                    iau.ImperialConversion AS IAUImpertialConversion, iau.MetricConversion AS IAUMetricConversion,

                    iaut.Id, iaut.Name AS IAUTName, iaut.IsCase AS IAUTIsCase, iaut.IsEach AS IAUTIsEach, iaut.IsByWeight AS IAUTIsByWeight
                    
                    FROM [Inventory] i
                    LEFT JOIN [Component] c ON c.Id = i.ComponentId
                    LEFT JOIN [ComponentType] ct ON ct.Id = c.ComponentTypeId
                    LEFT JOIN [City] ci ON ci.Id = c.CityId
                    LEFT JOIN [Region] r ON r.Id = c.RegionId
                    LEFT JOIN [State] s ON s.Id = c.StateId
                    LEFT JOIN [Country] co ON co.Id = c.CountryId
                    LEFT JOIN [Producer] p ON p.Id = c.ProducerId
                    LEFT JOIN [Importer] im ON im.id = c.ImporterId
                    LEFT JOIN [Unit] u ON u.id = i.UnitId
                    LEFT JOIN [UnitType] ut ON ut.id = i.UnitTypeId
                    LEFT JOIN [InventoryAdjustment] ia ON ia.InventoryId = i.Id
                    LEFT JOIN [InventoryAdjustmentType] iat ON iat.Id = ia.InventoryAdjustmentTypeid
                    LEFT JOIN [Unit] iau on iau.Id = ia.UnitId
                    LEFT JOIN [UnitType] iaut on iaut.Id = ia.UnitTypeId
                    ";
        }

        private string OrderByName()
        {
            return " ORDER BY c.Name";
        }

        private Inventory InventoryObject(SqlDataReader reader)
        {
            Inventory inventory = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                BarId = DbUtils.GetInt(reader, "BarId"),
                ComponentId = DbUtils.GetInt(reader, "ComponentId"),
                Quantity = DbUtils.GetDecimal(reader, "Quantity"),
                UnitId = DbUtils.GetInt(reader, "UnitId"),
                UnitSize = DbUtils.GetInt(reader, "UnitId"),
                UnitTypeId = DbUtils.GetInt(reader, "UnitTypeId"),
                CostPerOunce = DbUtils.GetDecimal(reader, "CostPerOunce"),
                Markup = DbUtils.GetDecimal(reader, "Markup"),
                InventoryAdjustments = new List<InventoryAdjustment>(),
            };

            if (DbUtils.IsNotDbNull(reader, "ComponentId"))
            {
                inventory.Component = new()
                {
                    Id = DbUtils.GetInt(reader, "ComponentId"),
                    ComponentTypeId = DbUtils.GetInt(reader, "ComponentTypeId"),
                    Name = DbUtils.GetString(reader, "Name"),
                    Abv = DbUtils.GetNullableDecimal(reader, "Abv"),
                    Ibu = DbUtils.GetNullableDecimal(reader, "Ibu"),
                    Description = DbUtils.GetString(reader, "Description"),
                    Year = DbUtils.GetNullableInt(reader, "Year"),
                    CityId = DbUtils.GetNullableInt(reader, "CityId"),
                    StateId = DbUtils.GetNullableInt(reader, "StateId"),
                    RegionId = DbUtils.GetNullableInt(reader, "RegionId"),
                    CountryId = DbUtils.GetNullableInt(reader, "CountryId"),
                    ProviderBarId = DbUtils.GetNullableInt(reader, "ProviderBarId"),
                    ImporterId = DbUtils.GetNullableInt(reader, "ImporterId"),
                    ProducerId = DbUtils.GetNullableInt(reader, "ProducerId"),
                    IsAdminApproved = DbUtils.GetBoolean(reader, "IsAdminApproved"),
                    ComponentType = new ComponentType()
                    {
                        Id = DbUtils.GetInt(reader, "ComponentTypeId"),
                        Name = DbUtils.GetString(reader, "CTName")
                    },
                };
                if (DbUtils.IsNotDbNull(reader, "CityId"))
                {
                    inventory.Component.City = new()
                    {
                        Id = DbUtils.GetInt(reader, "CityId"),
                        Name = DbUtils.GetString(reader, "CIName"),
                        RegionId = DbUtils.GetNullableInt(reader, "CIRegionId"),
                        StateId = DbUtils.GetNullableInt(reader, "CIStateId"),
                        CountryId = DbUtils.GetNullableInt(reader, "CICountryId"),
                    };
                }

                if (DbUtils.IsNotDbNull(reader, "RegionId"))
                {
                    inventory.Component.Region = new()
                    {
                        Id = DbUtils.GetInt(reader, "RegionId"),
                        Name = DbUtils.GetString(reader, "RName"),
                        StateId = DbUtils.GetNullableInt(reader, "RStateId"),
                        CountryId = DbUtils.GetNullableInt(reader, "RCountryId"),
                    };
                }

                if (DbUtils.IsNotDbNull(reader, "StateId"))
                {
                    inventory.Component.State = new()
                    {
                        Id = DbUtils.GetInt(reader, "StateId"),
                        Name = DbUtils.GetString(reader, "SName"),
                        CountryId = DbUtils.GetInt(reader, "SCountryId"),
                    };
                }

                if (DbUtils.IsNotDbNull(reader, "CountryId"))
                {
                    inventory.Component.Country = new()
                    {
                        Id = DbUtils.GetInt(reader, "CountryId"),
                        Name = DbUtils.GetString(reader, "COName")
                    };
                }

                if (DbUtils.IsNotDbNull(reader, "ProducerId"))
                {
                    inventory.Component.Producer = new()
                    {
                        Id = DbUtils.GetInt(reader, "ProducerId"),
                        Name = DbUtils.GetString(reader, "PName"),
                        Description = DbUtils.GetString(reader, "PDescription"),
                        Website = DbUtils.GetString(reader, "PWebsite")
                    };
                }

                if (DbUtils.IsNotDbNull(reader, "ImporterId"))
                {
                    inventory.Component.Importer = new()
                    {
                        Id = DbUtils.GetInt(reader, "ImporterId"),
                        Name = DbUtils.GetString(reader, "IMName"),
                        Description = DbUtils.GetString(reader, "IMDescription"),
                        Website = DbUtils.GetString(reader, "IMWebsite")
                    };
                }
            }
            if (DbUtils.IsNotDbNull(reader, "UnitId"))
            {
                inventory.Unit = new()
                {
                    Id = DbUtils.GetInt(reader, "UnitId"),
                    Name = DbUtils.GetString(reader, "IUName"),
                    Size = DbUtils.GetDecimal(reader, "IUSize"),
                    Measurement = DbUtils.GetString(reader, "IUMeasurement"),
                    ImperialConversion = DbUtils.GetDecimal(reader, "IUImperialConversion"),
                    MetricConversion = DbUtils.GetDecimal(reader, "IUMetricConversion")

                };
            }
            if (DbUtils.IsNotDbNull(reader, "UnitTypeId"))
            {
                inventory.UnitType = new()
                {
                    Id = DbUtils.GetInt(reader, "UnitTypeId"),
                    Name = DbUtils.GetString(reader, "UTName"),
                    IsCase = DbUtils.GetBoolean(reader, "UTIsCase"),
                    IsEach = DbUtils.GetBoolean(reader, "UTIsEach"),
                    IsByWeight = DbUtils.GetBoolean(reader, "UTIsByWeight")
                };
            }
            if (DbUtils.IsNotDbNull(reader, "InventoryId"))
            {
                var inventoryAdjustment = new InventoryAdjustment()
                {
                    Id = DbUtils.GetInt(reader, "IAId"),
                    InventoryId = DbUtils.GetInt(reader, "InventoryId"),
                    DistributorId = DbUtils.GetNullableInt(reader, "DistributorId"),
                    InventoryAdjustmentTypeId = DbUtils.GetInt(reader, "InventoryAdjustmentTypeId"),
                    Quantity = DbUtils.GetDecimal(reader, "Quantity"),
                    ItemsPerUnit = DbUtils.GetInt(reader, "ItemsPerUnit"),
                    Cost = DbUtils.GetDecimal(reader, "Cost"),
                    UnitId = DbUtils.GetInt(reader, "IAUnitId"),
                    UnitTypeId = DbUtils.GetInt(reader, "IAUnitTypeId"),
                    IncludeInInventoryCostPerOunce = DbUtils.GetBoolean(reader, "IncludeInInventoryCostPerOunce"),
                    CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                    ExpirationDate = DbUtils.GetNullableDateTime(reader, "ExpirationDate")

                };
                if (DbUtils.IsNotDbNull(reader, "InventoryAdjustmentTypeId"))
                {
                    inventoryAdjustment.InventoryAdjustmentType = new()
                    {
                        Id = DbUtils.GetInt(reader, "InventoryAdjustmentTypeId"),
                        Name = DbUtils.GetString(reader, "IATName"),
                        DoesAdd = DbUtils.GetBoolean(reader, "DoesAdd")

                    };
                };
                if (DbUtils.IsNotDbNull(reader, "IAUnitId"))
                {
                    inventoryAdjustment.Unit = new()
                    {
                        Id = DbUtils.GetInt(reader, "IAUnitId"),
                        Name = DbUtils.GetString(reader, "IAUName"),
                        Size = DbUtils.GetDecimal(reader, "IAUSize"),
                        Measurement = DbUtils.GetString(reader, "IAUMeasurement"),
                        ImperialConversion = DbUtils.GetDecimal(reader, "IAUImperialConversion"),
                        MetricConversion = DbUtils.GetDecimal(reader, "IAUMetricConversion")

                    };
                };
                if (DbUtils.IsNotDbNull(reader, "IAUnitTypeId"))
                {
                    inventoryAdjustment.UnitType = new()
                    {
                        Id = DbUtils.GetInt(reader, "IAUnitTypeId"),
                        Name = DbUtils.GetString(reader, "IAUTName"),
                        IsCase = DbUtils.GetBoolean(reader, "IAUTIsCase"),
                        IsEach = DbUtils.GetBoolean(reader, "IAUTIsEach"),
                        IsByWeight = DbUtils.GetBoolean(reader, "IAUTIsByWeight")
                    };
                }
                inventory.InventoryAdjustments.Add(inventoryAdjustment);
            }
            return inventory;
        }


        public List<Inventory> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetInventory();
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    var inventories = new List<Inventory>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Inventory inventory = InventoryObject(reader);

                        inventories.Add(inventory);
                    }

                    reader.Close();
                    return inventories;
                }
            }
        }

        public List<Inventory> GetBarInventory(int barId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetInventory();
                    sql += " WHERE i.BarId = @BarId";
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "BarId", barId);

                    var inventories = new List<Inventory>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Inventory inventory = InventoryObject(reader);

                        inventories.Add(inventory);
                    }

                    reader.Close();
                    return inventories;
                }
            }
        }

        public Inventory GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetInventory();
                    sql += " WHERE i.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    Inventory inventory = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        inventory = InventoryObject(reader);
                    }

                    reader.Close();
                    return inventory;
                }
            }
        }

        public void Add(Inventory inventory)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Inventory ([BarId], [ComponentId], [Quantity], [UnitId], [UnitTypeId], 
                        [CostPerOunce], [Markup])
                        OUTPUT INSERTED.ID
                        VALUES (@ComponentId, @BarId, @Quantity, @UnitId, @UnitTypeId, @CostPerOunce, @Markup)";


                    DbUtils.AddParameter(cmd, "@ComponentId", inventory.ComponentId);
                    DbUtils.AddParameter(cmd, "@BarId", inventory.BarId);
                    DbUtils.AddParameter(cmd, "@Quantity", inventory.Quantity);
                    DbUtils.AddParameter(cmd, "@Unit", inventory.UnitId);
                    DbUtils.AddParameter(cmd, "@UnitTypeId", inventory.UnitTypeId);
                    DbUtils.AddParameter(cmd, "@CostPerOunce", inventory.CostPerOunce);
                    DbUtils.AddParameter(cmd, "@Markup", inventory.Markup);

                    inventory.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Inventory inventory)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Inventory
                        SET
                        ComponentId = @ComponentId, 
                        BarId = @BarId, 
                        Quantity = @Quantity, 
                        UnitId = @UnitId, 
                        UnitTypeId = @UnitTypeId, 
                        CostPerOunce = @CostPerOunce, 
                        Markup = @Markup
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", inventory.Id);
                    DbUtils.AddParameter(cmd, "@ComponentId", inventory.ComponentId);
                    DbUtils.AddParameter(cmd, "@BarId", inventory.BarId);
                    DbUtils.AddParameter(cmd, "@Quantity", inventory.Quantity);
                    DbUtils.AddParameter(cmd, "@Unit", inventory.UnitId);
                    DbUtils.AddParameter(cmd, "@UnitTypeId", inventory.UnitTypeId);
                    DbUtils.AddParameter(cmd, "@CostPerOunce", inventory.CostPerOunce);
                    DbUtils.AddParameter(cmd, "@Markup", inventory.Markup);

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
                        DELETE FROM Inventory
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteAllBarInventory(int barId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Inventory
                        WHERE BarId = @barId;
                    ";

                    DbUtils.AddParameter(cmd, "@barId", barId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
