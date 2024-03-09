using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;

namespace Barkeep.Repositories
{
    public class InventoryAdjustmentRepository : BaseRepository, IInventoryAdjustmentRepository
    {
        public InventoryAdjustmentRepository(IConfiguration configuration) : base(configuration) { }

        //Private helper methods to DRY out InventoryAdjustment SQL queries
        private string GetInventoryAdjustments()
        {
            return @"SELECT 
                    ia.Id, ia.InventoryId, ia.DistributorId, ia.InventoryAdjustmentTypeId, ia.Quantity, ia.ItemsPerUnit, ia.Cost,
                    ia.UnitId, ia.UnitTypeId, ia.IncludeInInventoryCostPerOunce, ia.CreateDateTime, ia.ExpirationDate, ia.BarUserId,

                    iat.Id, iat.Name as IATName, iat.DoesAdd,

                    u.Id, u.Size, u.Measurement, u.Name AS UName, u.ImperialConversion, u.MetricConversion,

                    ut.Id, ut.Name AS UTName, ut.IsCase, ut.IsEach, ut.IsByWeight

                    bu.Id, bu.UserId, bu.BarId, bu.UserTypeId, bu.PayRate, bu.PayRateTypeId, bu.CreateDateTime, 
                    bu.EndDateTime, bu.IsActive, bu.RoleId,

                    user.Id, user.DisplayName, user.FirstName, user.LastName, user.Phone, user.Email, 
                    user.Pin, user.CreateDateTime AS UserCreateDateTime, user.EndDateTime AS UserEndDateTime, user.UserTypeId AS UserUserTypeId, user.IsActive AS UserIsActive,
                    user.Password,
                    
                    FROM [InventoryAdjustment] ia
                    LEFT JOIN [InventoryAdjustmentType] iat ON iat.Id = ia.InventoryAdjustmentTypeId
                    LEFT JOIN [Unit] u ON u.Id = ia.UnitId
                    LEFT JOIN [UnitType] ut ON ut.Id = ia.UnitTypeId
                    LEFT JOIN [BarUser] bu ON bu.Id = ia.BarUserId
                    LEFT JOIN [User] user ON user.Id = bu.UserId
                    ";
        }

        private string OrderByInventory()
        {
            return " ORDER BY ia.InventoryId";
        }

        private InventoryAdjustment InventoryAdjustmentObject(SqlDataReader reader)
        {
            InventoryAdjustment inventoryAdjustment = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                InventoryId = DbUtils.GetInt(reader, "InventoryId"),
                DistributorId = DbUtils.GetNullableInt(reader, "DistributorId"),
                InventoryAdjustmentTypeId = DbUtils.GetInt(reader, "InventoryAdjustmentTypeId"),
                Quantity = DbUtils.GetDecimal(reader, "Quantity"),
                ItemsPerUnit = DbUtils.GetInt(reader, "ItemsPerUnit"),
                Cost = DbUtils.GetDecimal(reader, "Cost"),
                UnitId = DbUtils.GetInt(reader, "UnitId"),
                UnitTypeId = DbUtils.GetInt(reader, "UnitTypeId"),
                IncludeInInventoryCostPerOunce = DbUtils.GetBoolean(reader, "IncludeInInventoryCostPerOunce"),
                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                ExpirationDate = DbUtils.GetNullableDateTime(reader, "ExpirationDate")

            };
            if (DbUtils.IsNotDbNull(reader, "InventoryAdjustmentTypeId"))
            {
                inventoryAdjustment.InventoryAdjustmentType = new()
                {
                    Id = DbUtils.GetInt(reader, "InventoryAdjustmentTypeId"),
                    Name = DbUtils.GetString(reader, "Name"),
                    DoesAdd = DbUtils.GetBoolean(reader, "DoesAdd")

                };
            };
            if (DbUtils.IsNotDbNull(reader, "UnitId"))
            {
                inventoryAdjustment.Unit = new()
                {
                    Id = DbUtils.GetInt(reader, "UnitId"),
                    Name = DbUtils.GetString(reader, "UName"),
                    Size = DbUtils.GetDecimal(reader, "Size"),
                    Measurement = DbUtils.GetString(reader, "Measurement"),
                    ImperialConversion = DbUtils.GetDecimal(reader, "ImperialConversion"),
                    MetricConversion = DbUtils.GetDecimal(reader, "MetricConversion")

                };
            };
            if (DbUtils.IsNotDbNull(reader, "UnitTypeId"))
            {
                inventoryAdjustment.UnitType = new()
                {
                    Id = DbUtils.GetInt(reader, "UnitTypeId"),
                    Name = DbUtils.GetString(reader, "UTName"),
                    IsCase = DbUtils.GetBoolean(reader, "IsCase"),
                    IsEach = DbUtils.GetBoolean(reader, "IsEach"),
                    IsByWeight = DbUtils.GetBoolean(reader, "IsByWeight")
                };
            };

            if (DbUtils.IsNotDbNull(reader, "BarUserId"))
            {
                inventoryAdjustment.BarUser = new()
                {
                    Id = DbUtils.GetInt(reader, "BarUserId"),
                    UserId = DbUtils.GetInt(reader, "UserId"),
                    BarId = DbUtils.GetInt(reader, "BarId"),
                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                    PayRate = DbUtils.GetDecimal(reader, "PayRate"),
                    PayRateTypeId = DbUtils.GetInt(reader, "PayRateTypeId"),
                    CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                    EndDateTime = DbUtils.GetNullableDateTime(reader, "EndDateTime"),
                    IsActive = DbUtils.GetBoolean(reader, "IsActive"),
                    RoleId = DbUtils.GetInt(reader, "RoleId"),
                    User = new User()
                    {
                        Id = DbUtils.GetInt(reader, "UserId"),
                        DisplayName = DbUtils.GetString(reader, "DisplayName"),
                        FirstName = DbUtils.GetString(reader, "FirstName"),
                        LastName = DbUtils.GetString(reader, "LastName"),
                        Phone = DbUtils.GetString(reader, "Phone"),
                        Email = DbUtils.GetString(reader, "Email"),
                        Pin = DbUtils.GetString(reader, "Pin"),
                        CreateDateTime = DbUtils.GetDateTime(reader, "UserCreateDateTime"),
                        EndDateTime = DbUtils.GetNullableDateTime(reader, "UserEndDateTime"),
                        IsActive = reader.GetBoolean(reader.GetOrdinal("UserIsActive")),
                        Password = DbUtils.GetString(reader, "Password"),
                        UserTypeId = DbUtils.GetInt(reader, "UserUserTypeId"),
                    },
                };
            }
            return inventoryAdjustment;
        }




        public List<InventoryAdjustment> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetInventoryAdjustments();
                    sql += OrderByInventory();
                    cmd.CommandText = sql;

                    var inventoryAdjustments = new List<InventoryAdjustment>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        InventoryAdjustment inventoryAdjustment = InventoryAdjustmentObject(reader);

                        inventoryAdjustments.Add(inventoryAdjustment);
                    }

                    reader.Close();
                    return inventoryAdjustments;
                }
            }
        }

        public List<InventoryAdjustment> GetAllByInventory(int inventoryId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetInventoryAdjustments();
                    sql += " WHERE ia.InventoryId = @InventoryId";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "InventoryId", inventoryId);

                    var inventoryAdjustments = new List<InventoryAdjustment>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        InventoryAdjustment inventoryAdjustment = InventoryAdjustmentObject(reader);

                        inventoryAdjustments.Add(inventoryAdjustment);
                    }

                    reader.Close();
                    return inventoryAdjustments;
                }
            }
        }

        public InventoryAdjustment GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetInventoryAdjustments();
                    sql += " WHERE ia.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    InventoryAdjustment inventoryAdjustment = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        inventoryAdjustment = InventoryAdjustmentObject(reader);
                    }

                    reader.Close();
                    return inventoryAdjustment;
                }
            }
        }

        public void Add(InventoryAdjustment inventoryAdjustment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO InventoryAdjustment ([InventoryId], [DistributorId], [InventoryAdjustmentTypeId], [Quantity], 
                        [ItemsPerUnit], [Cost], [UnitId], [UnitTypeId], [IncludeInInventoryCostPerOunce], [CreateDateTime], [ExpirationDate])
                        OUTPUT INSERTED.ID
                        VALUES (@InventoryId, @DistributorId, @InventoryAdjustmentTypeId, @Quantity, @ItemsPerUnit, @Cost, @UnitId, @UnitTypeId,
                        @IncludeInInventoryCostPerOunce, @CreateDateTime, @ExpirationDate)";


                    DbUtils.AddParameter(cmd, "@InventoryId", inventoryAdjustment.InventoryId);
                    DbUtils.AddParameter(cmd, "@DistributorId", DbUtils.ValueOrDBNull(inventoryAdjustment.DistributorId));
                    DbUtils.AddParameter(cmd, "@InventoryAdjustmentTypeId", inventoryAdjustment.InventoryAdjustmentTypeId);
                    DbUtils.AddParameter(cmd, "@Quantity", inventoryAdjustment.Quantity);
                    DbUtils.AddParameter(cmd, "@ItemsPerUnit", inventoryAdjustment.ItemsPerUnit);
                    DbUtils.AddParameter(cmd, "@Cost", inventoryAdjustment.Cost);
                    DbUtils.AddParameter(cmd, "@UnitId", inventoryAdjustment.UnitId);
                    DbUtils.AddParameter(cmd, "@UnitTypeId", inventoryAdjustment.UnitTypeId);
                    DbUtils.AddParameter(cmd, "@IncludeInInventoryCostPerOunce", inventoryAdjustment.IncludeInInventoryCostPerOunce);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", inventoryAdjustment.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@ExpirationDate", DbUtils.ValueOrDBNull(inventoryAdjustment.ExpirationDate));

                    inventoryAdjustment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(InventoryAdjustment inventoryAdjustment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE InventoryAdjustment
                        SET
                        [InventoryId] = @InventoryId,
                        DistributorId = @DistributorId,
                        InventoryAdjustmentTypeId = @InventoryAdjustmentTypeId, 
                        Quantity = @Quantity, 
                        ItemsPerUnit = @ItemsPerUnit, 
                        Cost = @Cost, 
                        UnitId = @UnitId, 
                        UnitTypeId = @UnitTypeId,
                        IncludeInInventoryCostPerOunce = @IncludeInInventoryCostPerOunce, 
                        CreateDateTime = @CreateDateTime, 
                        ExpirationDate = @ExpirationDate
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", inventoryAdjustment.Id);
                    DbUtils.AddParameter(cmd, "@InventoryId", inventoryAdjustment.InventoryId);
                    DbUtils.AddParameter(cmd, "@DistributorId", DbUtils.ValueOrDBNull(inventoryAdjustment.DistributorId));
                    DbUtils.AddParameter(cmd, "@InventoryAdjustmentTypeId", inventoryAdjustment.InventoryAdjustmentTypeId);
                    DbUtils.AddParameter(cmd, "@Quantity", inventoryAdjustment.Quantity);
                    DbUtils.AddParameter(cmd, "@ItemsPerUnit", inventoryAdjustment.ItemsPerUnit);
                    DbUtils.AddParameter(cmd, "@Cost", inventoryAdjustment.Cost);
                    DbUtils.AddParameter(cmd, "@UnitId", inventoryAdjustment.UnitId);
                    DbUtils.AddParameter(cmd, "@UnitTypeId", inventoryAdjustment.UnitTypeId);
                    DbUtils.AddParameter(cmd, "@IncludeInInventoryCostPerOunce", inventoryAdjustment.IncludeInInventoryCostPerOunce);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", inventoryAdjustment.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@ExpirationDate", DbUtils.ValueOrDBNull(inventoryAdjustment.ExpirationDate));

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
                        DELETE FROM InventoryAdjustment
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteInventoryInventoryAdjustments(int inventoryId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM InventoryAdjustment
                        WHERE InventoryId = @InventoryId;
                    ";

                    DbUtils.AddParameter(cmd, "@InventoryId", inventoryId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
