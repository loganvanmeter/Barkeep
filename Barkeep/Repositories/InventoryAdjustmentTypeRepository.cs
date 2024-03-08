using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;

namespace Barkeep.Repositories
{
    public class InventoryAdjustmentTypeRepository : BaseRepository, IInventoryAdjustmentTypeRepository
    {
        public InventoryAdjustmentTypeRepository(IConfiguration configuration) : base(configuration) { }

        //Private helper methods to DRY out InventoryAdjustmentType SQL queries
        private string GetInventoryAdjustmentTypes()
        {
            return @"SELECT 
                    iat.Id, iat.Name, iat.DoesAdd
                    
                    FROM [InventoryAdjustmentType] iat";
        }

        private string OrderByName()
        {
            return " ORDER BY iat.Name";
        }

        private InventoryAdjustmentType InventoryAdjustmentTypeObject(SqlDataReader reader)
        {
            InventoryAdjustmentType inventoryAdjustmentType = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                DoesAdd = DbUtils.GetBoolean(reader, "DoesAdd")

            };
            return inventoryAdjustmentType;
        }




        public List<InventoryAdjustmentType> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetInventoryAdjustmentTypes();
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    var inventoryAdjustmentTypes = new List<InventoryAdjustmentType>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        InventoryAdjustmentType inventoryAdjustmentType = InventoryAdjustmentTypeObject(reader);

                        inventoryAdjustmentTypes.Add(inventoryAdjustmentType);
                    }

                    reader.Close();
                    return inventoryAdjustmentTypes;
                }
            }
        }

        public InventoryAdjustmentType GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetInventoryAdjustmentTypes();
                    sql += " WHERE iat.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    InventoryAdjustmentType inventoryAdjustmentType = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        inventoryAdjustmentType = InventoryAdjustmentTypeObject(reader);
                    }

                    reader.Close();
                    return inventoryAdjustmentType;
                }
            }
        }

        public void Add(InventoryAdjustmentType inventoryAdjustmentType)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO InventoryAdjustmentType ([Name], [DoesAdd])
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @DoesAdd, @ProviderBarId, @IsAdminApproved)";


                    DbUtils.AddParameter(cmd, "@Name", inventoryAdjustmentType.Name);
                    DbUtils.AddParameter(cmd, "@DoesAdd", inventoryAdjustmentType.DoesAdd);


                    inventoryAdjustmentType.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(InventoryAdjustmentType inventoryAdjustmentType)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE InventoryAdjustmentType
                        SET
                        [Name] = @Name,
                        DoesAdd = @DoesAdd
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", inventoryAdjustmentType.Id);
                    DbUtils.AddParameter(cmd, "@Name", inventoryAdjustmentType.Name);
                    DbUtils.AddParameter(cmd, "@DoesAdd", inventoryAdjustmentType.DoesAdd);


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
                        DELETE FROM InventoryAdjustmentType
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

