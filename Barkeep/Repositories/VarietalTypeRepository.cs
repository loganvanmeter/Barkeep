using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;

namespace Barkeep.Repositories
{
    public class VarietalTypeRepository : BaseRepository, IVarietalTypeRepository
    {
        public VarietalTypeRepository(IConfiguration configuration) : base(configuration) { }

        private string GetVarietalTypes()
        {
            return @"SELECT 
                    vt.Id, vt.Name, vt.Description
                    
                    FROM [VarietalType] vt";
        }

        private string OrderByName()
        {
            return " ORDER BY vt.Name";
        }

        private VarietalType VarietalTypeObject(SqlDataReader reader)
        {
            VarietalType varietalType = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                Description = DbUtils.GetString(reader, "Description")
            };
            return varietalType;
        }
        public List<VarietalType> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetVarietalTypes();
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    var varietalTypes = new List<VarietalType>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        VarietalType varietalType = VarietalTypeObject(reader);

                        varietalTypes.Add(varietalType);
                    }

                    reader.Close();
                    return varietalTypes;
                }
            }
        }

        public VarietalType GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetVarietalTypes();
                    sql += " WHERE vt.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    VarietalType varietalType = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        varietalType = VarietalTypeObject(reader);
                    }

                    reader.Close();
                    return varietalType;
                }
            }
        }

        public void Add(VarietalType varietalType)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Category ([Name], [Description])
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @Description)";


                    DbUtils.AddParameter(cmd, "@Name", varietalType.Name);
                    DbUtils.AddParameter(cmd, "@Description", DbUtils.ValueOrDBNull(varietalType.Description));

                    varietalType.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(VarietalType varietalType)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE VarietalType
                        SET
                        [Name] = @Name,
                        Description = @Description
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", varietalType.Id);
                    DbUtils.AddParameter(cmd, "@Name", varietalType.Name);
                    DbUtils.AddParameter(cmd, "@Description", DbUtils.ValueOrDBNull(varietalType.Description));


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
                        DELETE FROM VarietalType
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
