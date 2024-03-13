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
                    il.Id, il.InInventoryId, il.InAmount, il.OutInventoryId, il.OutAmount, il.OnlyAdjustsOnStock

                    FROM [InventoryLink] il
                    ";
        }

        private string OrderByInventoryIn()
        {
            return " ORDER BY il.InventoryId";
        }

        private string OrderByInventoryOut()
        {
            return " ORDER BY il.InInventoryOut";
        }

        private InventoryLink InventoryLinkObject(SqlDataReader reader)
        {
            InventoryLink inventoryLink = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                InInventoryId = DbUtils.GetInt(reader, "InInventoryId"),
                InAmount = DbUtils.GetDecimal(reader, "InAmount"),
                OutInventoryId = DbUtils.GetInt(reader, "OutInventoryId"),
                OutAmount = DbUtils.GetDecimal(reader, "OutAmount"),
                OnlyAdjustsOnStock = DbUtils.GetBoolean(reader, "OnlyAdjustsOnStock"),
                InInventory = new Inventory(),
                OutInventory = new Inventory(),
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
                    sql += " WHERE il.InventoryId = @InventoryId";
                    sql += OrderByInventoryOut();
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
                    sql += OrderByInventoryOut();
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
                        INSERT INTO InventoryLink ([InInventoryId], [InAmount], [OutInventoryId], [OutAmount], [OnlyAdjustsOnStock])
                        OUTPUT INSERTED.ID
                        VALUES (@InInventoryId, @InAmount, @OutInventoryId, @OutAmount, @OnlyAdjustsOnStock)";


                    DbUtils.AddParameter(cmd, "@InInventoryId", inventoryLink.InInventoryId);
                    DbUtils.AddParameter(cmd, "@InAmount", inventoryLink.InAmount);
                    DbUtils.AddParameter(cmd, "@OutInventoryId", inventoryLink.OutInventoryId);
                    DbUtils.AddParameter(cmd, "@OutAmount", inventoryLink.OutAmount);
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
                        [OutInventoryId] = @OutInventoryId,
                        [OutAmount] = @OutAmount,
                        [OnlyAdjustsOnStock] = @OnlyAdjustsOnStock
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", inventoryLink.Id);
                    DbUtils.AddParameter(cmd, "@InAmount", inventoryLink.InAmount);
                    DbUtils.AddParameter(cmd, "@OutInventoryId", inventoryLink.OutInventoryId);
                    DbUtils.AddParameter(cmd, "@OutAmount", inventoryLink.OutAmount);
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
