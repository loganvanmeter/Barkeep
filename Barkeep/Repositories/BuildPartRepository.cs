using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;

namespace Barkeep.Repositories
{
    public class BuildPartRepository : BaseRepository, IBuildPartRepository
    {
        public BuildPartRepository(IConfiguration configuration) : base(configuration) { }

        private string GetBuildParts()
        {
            return @"SELECT 
                    bp.Id, bp.BuildId, bp.Amount, bp.UnitId, bp.InventoryId, bp.Order
                    
                    FROM [BuildPart] bp
    
                    ";
        }

        private string OrderByBuildId()
        {
            return " ORDER BY bp.BuildId";
        }
        private BuildPart BuildPartObject(SqlDataReader reader)
        {
            BuildPart buildPart = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                BuildId = DbUtils.GetInt(reader, "BuildId"),
                Amount = DbUtils.GetDecimal(reader, "Amount"),
                UnitId = DbUtils.GetInt(reader, "UnitId"),
                InventoryId = DbUtils.GetInt(reader, "InventoryId"),
                Order = DbUtils.GetInt(reader, "Order"),
                Unit = new Unit(),
                Inventory = new Inventory()

            };
            return buildPart;
        }

        public List<BuildPart> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetBuildParts();
                    sql += OrderByBuildId();
                    cmd.CommandText = sql;

                    var buildParts = new List<BuildPart>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        BuildPart buildPart = BuildPartObject(reader);

                        buildParts.Add(buildPart);
                    }

                    reader.Close();
                    return buildParts;
                }
            }
        }

        public BuildPart GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetBuildParts();
                    sql += " WHERE bp.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    BuildPart buildPart = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        buildPart = BuildPartObject(reader);
                    }

                    reader.Close();
                    return buildPart;
                }
            }
        }

        public List<BuildPart> GetByBuildId(int buildId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetBuildParts();
                    sql += " WHERE bp.BuildId = @buildId";
                    sql += " ORDER BY bp.Order";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@buildId", buildId);

                    var buildParts = new List<BuildPart>();
                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        BuildPart buildPart = BuildPartObject(reader);
                        buildParts.Add(buildPart);
                    }

                    reader.Close();
                    return buildParts;
                }
            }
        }

        public void Add(BuildPart buildPart)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO BuildPart ([BuildId], [Amount], [UnitId], [InventoryId], [Order])
                        OUTPUT INSERTED.ID
                        VALUES (@BuildId. @Amount, @UnitId, @InventoryId, @Order)";


                    DbUtils.AddParameter(cmd, "@BuildId", buildPart.BuildId);
                    DbUtils.AddParameter(cmd, "@Amount", buildPart.Amount);
                    DbUtils.AddParameter(cmd, "@UnitId", buildPart.UnitId);
                    DbUtils.AddParameter(cmd, "@InventoryId", buildPart.InventoryId);
                    DbUtils.AddParameter(cmd, "@Order", buildPart.Order);

                    buildPart.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(BuildPart buildPart)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE BuildPart
                        SET
                        [BuildId] = @BuildId,
                        Amount = @Amount,
                        UnitId = @UnitId,
                        InventoryId = @InventoryId,
                        Order = @Order
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", buildPart.Id);
                    DbUtils.AddParameter(cmd, "@BuildId", buildPart.BuildId);
                    DbUtils.AddParameter(cmd, "@BuildId", buildPart.BuildId);
                    DbUtils.AddParameter(cmd, "@Amount", buildPart.Amount);
                    DbUtils.AddParameter(cmd, "@UnitId", buildPart.UnitId);
                    DbUtils.AddParameter(cmd, "@InventoryId", buildPart.InventoryId);
                    DbUtils.AddParameter(cmd, "@Order", buildPart.Order);

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
                        DELETE FROM BuildPart
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
