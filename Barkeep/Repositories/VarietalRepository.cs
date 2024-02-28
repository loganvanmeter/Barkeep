using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;

namespace Barkeep.Repositories
{
    public class VarietalRepository : BaseRepository, IVarietalRepository
    {
        public VarietalRepository(IConfiguration configuration) : base(configuration) { }

        private string GetVarietalWithVarietalType()
        {
            return @"SELECT 
                    v.Id, v.Name, v.Description, v.VarietalTypeId,

                    vt.Id, vt.Name AS VTName, vt.Description AS VTDescription
                    
                    FROM [Varietal] v
                    LEFT JOIN [VarietalType] vt ON vt.Id = v.VarietalTypeId
                    ";
        }

        private string OrderByName()
        {
            return " ORDER BY v.Name";
        }
        private Varietal VarietalObject(SqlDataReader reader)
        {
            Varietal varietal = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                Description = DbUtils.GetString(reader, "Description"),
                VarietalTypeId = DbUtils.GetInt(reader, "VarietalTypeId"),
                VarietalType = new VarietalType()
                {
                    Id = DbUtils.GetInt(reader, "VarietalTypeId"),
                    Name = DbUtils.GetString(reader, "VTName"),
                    Description = DbUtils.GetString(reader, "VTDescription")
                }
            };
            return varietal;
        }

        public List<Varietal> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetVarietalWithVarietalType();
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    var varietals = new List<Varietal>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Varietal varietal = VarietalObject(reader);

                        varietals.Add(varietal);
                    }

                    reader.Close();
                    return varietals;
                }
            }
        }

        public Varietal GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetVarietalWithVarietalType();
                    sql += " WHERE v.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    Varietal varietal = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        varietal = VarietalObject(reader);
                    }

                    reader.Close();
                    return varietal;
                }
            }
        }

        public void Add(Varietal varietal)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Varietal ([Name], [Description], [VarietalTypeId])
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @Description, @VarietalTypeId)";


                    DbUtils.AddParameter(cmd, "@Name", varietal.Name);
                    DbUtils.AddParameter(cmd, "@Description", DbUtils.ValueOrDBNull(varietal.Description));
                    DbUtils.AddParameter(cmd, "@VarietalTypeId", varietal.VarietalTypeId);

                    varietal.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Varietal varietal)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Varietal
                        SET
                        [Name] = @Name,
                        Description = @Description,
                        VarietalTypeId = @VarietalTypeId
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", varietal.Id);
                    DbUtils.AddParameter(cmd, "@Name", varietal.Name);
                    DbUtils.AddParameter(cmd, "@Description", DbUtils.ValueOrDBNull(varietal.Description));
                    DbUtils.AddParameter(cmd, "@VarietalTypeId", varietal.VarietalTypeId);


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
                        DELETE FROM Varietal
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
