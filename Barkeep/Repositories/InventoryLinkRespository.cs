using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;

namespace Barkeep.Repositories
{
    public class InventoryLinkRepository : BaseRepository, IInventoryLinkRepository
    {
        public InventoryLinkRepository(IConfiguration configuration) : base(configuration) { }

        private string GetInventoryLinks()
        {
            return @"SELECT 
                    il.Id, il.InInventoryId, il.InAmount, il.InUnitId, il.OutInventoryId, il.OutAmount, il.OutUnitId, il.OnlyAdjustsOnStock,

                    ii.Id, ii.BarId AS IIBarId, ii.ComponentId AS IIComponentId, ii.Quantity AS IIQuantity, ii.UnitId AS IIUnitId, ii.UnitSize AS IIUnitSize, 
                    ii.UnitTypeId AS IIUnitTypeId, ii.CostPerOunce AS IICostPerOunce, ii.Markup AS IIMarkup, ii.CostPerUnit AS IICostPerUnit, 

                    iic.Id, iic.ComponentTypeId AS IICComponentTypeId, iic.Name AS IICName, iic.Abv AS IICAbv, iic.Ibu AS IICIbu, iic.Description AS IICDescription, 
                    iic.Year AS IICYear, iic.CityId AS IICCityId, iic.RegionId AS IICRegionId, iic.StateId AS IICStateId, iic.CountryId AS IICCountryId, 
                    iic.ProducerId AS IICProducerId, iic.ImporterId AS IICImporterId, iic.ProviderBarId AS IICProviderBarId, iic.IsAdminApproved AS IICIsAdminApproved,

                    iiu.Id, iiu.Size AS IIUSize, iiu.Measurement AS IIUMeasurement, iiu.Name AS IIUName, 
                    iiu.ImperialConversion AS IIUImperialConversion, iiu.MetricConversion AS IIUMetricConversion,
                                    
                    io.Id, io.BarId AS IOBarId, io.ComponentId AS IOComponentId, io.Quantity AS IOQuantity, io.UnitId AS IOUnitId, io.UnitSize AS IOUnitSize, 
                    io.UnitTypeId AS IOUnitTypeId, io.CostPerOunce AS IOCostPerOunce, io.Markup AS IOMarkup, io.CostPerUnit AS IOCostPerUnit,

                    ioc.Id, ioc.ComponentTypeId AS IOCComponentTypeId, ioc.Name AS IOCName, ioc.Abv AS IOCAbv, ioc.Ibu AS IOCIbu, ioc.Description AS IOCDescription, 
                    ioc.Year AS IOCYear, ioc.CityId AS IOCCityId, ioc.RegionId AS IOCRegionId, ioc.StateId AS IOCStateId, ioc.CountryId AS IOCCountryId, 
                    ioc.ProducerId AS IOCProducerId, ioc.ImporterId AS IOCImporterId, ioc.ProviderBarId AS IOCProviderBarId, ioc.IsAdminApproved AS IOCIsAdminApproved,

                    iou.Id, iou.Size AS IOUSize, iou.Measurement AS IOUMeasurement, iou.Name AS IOUName, 
                    iou.ImperialConversion AS IOUImperialConversion, iou.MetricConversion AS IOUMetricConversion,

                    ilou.Id, ilou.Size AS ILOUSize, ilou.Measurement AS ILOUMeasurement, ilou.Name AS ILOUName, 
                    ilou.ImperialConversion AS ILOUImperialConversion, ilou.MetricConversion AS ILOUMetricConversion,

                    iliu.Id, iliu.Size AS ILIUSize, iliu.Measurement AS ILIUMeasurement, iliu.Name AS ILIUName, 
                    iliu.ImperialConversion AS ILIUImperialConversion, iliu.MetricConversion AS ILIUMetricConversion

                    FROM [InventoryLink] il
                    LEFT JOIN [Inventory] ii ON ii.id = il.InInventoryId
                    LEFT JOIN [Component] iic ON iic.id = ii.ComponentId
                    LEFT JOIN [Unit] iiu ON iiu.id = ii.UnitId
                    LEFT JOIN [Inventory] io ON io.id = il.OutInventoryId
                    LEFT JOIN [Component] ioc ON ioc.id = io.ComponentId
                    LEFT JOIN [Unit] iou ON iou.id = io.UnitId
                    LEFT JOIN [Unit] ilou ON ilou.id = il.OutUnitId
                    LEFT JOIN [Unit] iliu ON iliu.id = il.InUnitId
                    ";
        }

        private string OrderByInventoryInComponentName()
        {
            return " ORDER BY iic.Name";
        }

        private string OrderByInventoryOutComponentName()
        {
            return " ORDER BY ioc.Name";
        }

        private InventoryLink InventoryLinkObject(SqlDataReader reader)
        {
            InventoryLink inventoryLink = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                InInventoryId = DbUtils.GetInt(reader, "InInventoryId"),
                InAmount = DbUtils.GetDecimal(reader, "InAmount"),
                InUnitId = DbUtils.GetInt(reader, "InUnitId"),
                OutInventoryId = DbUtils.GetInt(reader, "OutInventoryId"),
                OutAmount = DbUtils.GetDecimal(reader, "OutAmount"),
                OutUnitId = DbUtils.GetInt(reader, "OutUnitId"),
                OnlyAdjustsOnStock = DbUtils.GetBoolean(reader, "OnlyAdjustsOnStock"),
                InInventory = new Inventory()
                {
                    Id = DbUtils.GetInt(reader, "InInventoryId"),
                    BarId = DbUtils.GetInt(reader, "IIBarId"),
                    ComponentId = DbUtils.GetNullableInt(reader, "IIComponentId"),
                    Quantity = DbUtils.GetDecimal(reader, "IIQuantity"),
                    UnitId = DbUtils.GetInt(reader, "IIUnitId"),
                    UnitSize = DbUtils.GetDecimal(reader, "IIUnitSize"),
                    UnitTypeId = DbUtils.GetInt(reader, "IIUnitTypeId"),
                    CostPerOunce = DbUtils.GetNullableDecimal(reader, "IICostPerOunce"),
                    CostPerUnit = DbUtils.GetNullableDecimal(reader, "IICostPerUnit"),
                    Markup = DbUtils.GetDecimal(reader, "IIMarkup"),
                    Component = new Component()
                    {
                        Id = DbUtils.GetInt(reader, "IIComponentId"),
                        ComponentTypeId = DbUtils.GetInt(reader, "IICComponentTypeId"),
                        Name = DbUtils.GetString(reader, "IICName"),
                        Abv = DbUtils.GetNullableDecimal(reader, "IICAbv"),
                        Ibu = DbUtils.GetNullableDecimal(reader, "IICIbu"),
                        Description = DbUtils.GetString(reader, "IICDescription"),
                        Year = DbUtils.GetNullableInt(reader, "IICYear"),
                        CityId = DbUtils.GetNullableInt(reader, "IICCityId"),
                        StateId = DbUtils.GetNullableInt(reader, "IICStateId"),
                        RegionId = DbUtils.GetNullableInt(reader, "IICRegionId"),
                        CountryId = DbUtils.GetNullableInt(reader, "IICCountryId"),
                        ProviderBarId = DbUtils.GetNullableInt(reader, "IICProviderBarId"),
                        ImporterId = DbUtils.GetNullableInt(reader, "IICImporterId"),
                        ProducerId = DbUtils.GetNullableInt(reader, "IICProducerId"),
                        IsAdminApproved = DbUtils.GetBoolean(reader, "IICIsAdminApproved"),
                    },
                    Unit = new Unit()
                    {
                        Id = DbUtils.GetInt(reader, "IIUnitId"),
                        Name = DbUtils.GetString(reader, "IIUName"),
                        Size = DbUtils.GetDecimal(reader, "IIUSize"),
                        Measurement = DbUtils.GetString(reader, "IIUMeasurement"),
                        ImperialConversion = DbUtils.GetDecimal(reader, "IIUImperialConversion"),
                        MetricConversion = DbUtils.GetDecimal(reader, "IIUMetricConversion")
                    }
                },
                InUnit = new Unit() 
                {
                    Id = DbUtils.GetInt(reader, "InUnitId"),
                    Name = DbUtils.GetString(reader, "ILIUName"),
                    Size = DbUtils.GetDecimal(reader, "ILIUSize"),
                    Measurement = DbUtils.GetString(reader, "ILIUMeasurement"),
                    ImperialConversion = DbUtils.GetDecimal(reader, "ILIUImperialConversion"),
                    MetricConversion = DbUtils.GetDecimal(reader, "ILIUMetricConversion")
                },
                OutInventory = new Inventory()
                {
                    Id = DbUtils.GetInt(reader, "OutInventoryId"),
                    BarId = DbUtils.GetInt(reader, "IOBarId"),
                    ComponentId = DbUtils.GetNullableInt(reader, "IOComponentId"),
                    Quantity = DbUtils.GetDecimal(reader, "IOQuantity"),
                    UnitId = DbUtils.GetInt(reader, "IOUnitId"),
                    UnitSize = DbUtils.GetDecimal(reader, "IOUnitSize"),
                    UnitTypeId = DbUtils.GetInt(reader, "IOUnitTypeId"),
                    CostPerOunce = DbUtils.GetNullableDecimal(reader, "IOCostPerOunce"),
                    CostPerUnit = DbUtils.GetNullableDecimal(reader, "IOCostPerUnit"),
                    Markup = DbUtils.GetDecimal(reader, "IOMarkup"),
                    Component = new Component()
                    { 
                        Id = DbUtils.GetInt(reader, "IOComponentId"),
                        ComponentTypeId = DbUtils.GetInt(reader, "IOCComponentTypeId"),
                        Name = DbUtils.GetString(reader, "IOCName"),
                        Abv = DbUtils.GetNullableDecimal(reader, "IOCAbv"),
                        Ibu = DbUtils.GetNullableDecimal(reader, "IOCIbu"),
                        Description = DbUtils.GetString(reader, "IOCDescription"),
                        Year = DbUtils.GetNullableInt(reader, "IOCYear"),
                        CityId = DbUtils.GetNullableInt(reader, "IOCCityId"),
                        StateId = DbUtils.GetNullableInt(reader, "IOCStateId"),
                        RegionId = DbUtils.GetNullableInt(reader, "IOCRegionId"),
                        CountryId = DbUtils.GetNullableInt(reader, "IOCCountryId"),
                        ProviderBarId = DbUtils.GetNullableInt(reader, "IOCProviderBarId"),
                        ImporterId = DbUtils.GetNullableInt(reader, "IOCImporterId"),
                        ProducerId = DbUtils.GetNullableInt(reader, "IOCProducerId"),
                        IsAdminApproved = DbUtils.GetBoolean(reader, "IOCIsAdminApproved"),
                    },
                    Unit = new Unit()
                    {
                        Id = DbUtils.GetInt(reader, "IOUnitId"),
                        Name = DbUtils.GetString(reader, "IOUName"),
                        Size = DbUtils.GetDecimal(reader, "IOUSize"),
                        Measurement = DbUtils.GetString(reader, "IOUMeasurement"),
                        ImperialConversion = DbUtils.GetDecimal(reader, "IOUImperialConversion"),
                        MetricConversion = DbUtils.GetDecimal(reader, "IOUMetricConversion")
                    }
                },
                OutUnit = new Unit()
                {
                    Id = DbUtils.GetInt(reader, "OutUnitId"),
                    Name = DbUtils.GetString(reader, "ILOUName"),
                    Size = DbUtils.GetDecimal(reader, "ILOUSize"),
                    Measurement = DbUtils.GetString(reader, "ILOUMeasurement"),
                    ImperialConversion = DbUtils.GetDecimal(reader, "ILOUImperialConversion"),
                    MetricConversion = DbUtils.GetDecimal(reader, "ILOUMetricConversion")
                }
            };
            return inventoryLink;
        }
        public List<InventoryLink> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetInventoryLinks();
                    cmd.CommandText = sql;

                    var inventoryLinks = new List<InventoryLink>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        InventoryLink inventoryLink = InventoryLinkObject(reader);

                        inventoryLinks.Add(inventoryLink);
                    }

                    reader.Close();
                    return inventoryLinks;
                }
            }
        }

        public List<InventoryLink> GetAllByInventoryIn(int inventoryId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetInventoryLinks();
                    sql += " WHERE il.InInventoryId = @InventoryId";
                    sql += OrderByInventoryOutComponentName();
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@InventoryId", inventoryId);

                    var inventoryLinks = new List<InventoryLink>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        InventoryLink inventoryLink = InventoryLinkObject(reader);

                        inventoryLinks.Add(inventoryLink);
                    }

                    reader.Close();
                    return inventoryLinks;
                }
            }
        }

        public List<InventoryLink> GetAllByInventoryOut(int inventoryId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetInventoryLinks();
                    sql += " WHERE il.OutInventoryId = @InventoryId";
                    sql += OrderByInventoryInComponentName();
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@InventoryId", inventoryId);

                    var inventoryLinks = new List<InventoryLink>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        InventoryLink inventoryLink = InventoryLinkObject(reader);

                        inventoryLinks.Add(inventoryLink);
                    }

                    reader.Close();
                    return inventoryLinks;
                }
            }
        }



        public InventoryLink GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetInventoryLinks();
                    sql += " WHERE il.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    InventoryLink inventoryLink = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        inventoryLink = InventoryLinkObject(reader);
                    }

                    reader.Close();
                    return inventoryLink;
                }
            }
        }


        public void Add(InventoryLink inventoryLink)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO InventoryLink ([InInventoryId], [InAmount], [InUnitId], [OutInventoryId], [OutAmount], [OutUnitId], [OnlyAdjustsOnStock])
                        OUTPUT INSERTED.ID
                        VALUES (@InInventoryId, @InAmount, @InUnitId, @OutInventoryId, @OutAmount, @OutUnitId, @OnlyAdjustsOnStock)";


                    DbUtils.AddParameter(cmd, "@InInventoryId", inventoryLink.InInventoryId);
                    DbUtils.AddParameter(cmd, "@InAmount", inventoryLink.InAmount);
                    DbUtils.AddParameter(cmd, "@InUnitId", inventoryLink.InUnitId);
                    DbUtils.AddParameter(cmd, "@OutInventoryId", inventoryLink.OutInventoryId);
                    DbUtils.AddParameter(cmd, "@OutAmount", inventoryLink.OutAmount);
                    DbUtils.AddParameter(cmd, "@OutUnitId", inventoryLink.OutUnitId);
                    DbUtils.AddParameter(cmd, "@OnlyAdjustsOnStock", inventoryLink.OnlyAdjustsOnStock);

                    inventoryLink.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(InventoryLink inventoryLink)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE InventoryLink
                        SET
                        [InInventoryId] = @InInventoryId,
                        [InAmount] = @InAmount,
                        [InUnitId] = @InUnitId,
                        [OutInventoryId] = @OutInventoryId,
                        [OutAmount] = @OutAmount,
                        [OutUnitId] = @OutUnitId,
                        [OnlyAdjustsOnStock] = @OnlyAdjustsOnStock
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", inventoryLink.Id);
                    DbUtils.AddParameter(cmd, "@InInventoryId", inventoryLink.InInventoryId);
                    DbUtils.AddParameter(cmd, "@InAmount", inventoryLink.InAmount);
                    DbUtils.AddParameter(cmd, "@InUnitId", inventoryLink.InUnitId);
                    DbUtils.AddParameter(cmd, "@OutInventoryId", inventoryLink.OutInventoryId);
                    DbUtils.AddParameter(cmd, "@OutAmount", inventoryLink.OutAmount);
                    DbUtils.AddParameter(cmd, "@OutUnitId", inventoryLink.OutUnitId);
                    DbUtils.AddParameter(cmd, "@OnlyAdjustsOnStock", inventoryLink.OnlyAdjustsOnStock);

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
                        DELETE FROM InventoryLink
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteOutInventoryLinks(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM InventoryLink
                        WHERE OutInventoryId = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
