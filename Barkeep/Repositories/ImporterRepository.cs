using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;

namespace Barkeep.Repositories
{
    public class ImporterRepository : BaseRepository, IImporterRepository
    {
        public ImporterRepository(IConfiguration configuration) : base(configuration) { }

        private string GetImporters()
        {
            return @"SELECT 
                    i.Id, i.Name, i.Description, i.Wesbite
                    
                    FROM [Importer] i";
        }

        private string OrderByName()
        {
            return " ORDER BY i.Name";
        }

        private Importer ImporterObject(SqlDataReader reader)
        {
            Importer importer = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                Description = DbUtils.GetString(reader, "Description"),
                Website = DbUtils.GetString(reader, "Website")
            };
            return importer;
        }
        public List<Importer> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetImporters();
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    var importers = new List<Importer>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Importer importer = ImporterObject(reader);

                        importers.Add(importer);
                    }

                    reader.Close();
                    return importers;
                }
            }
        }

        public Importer GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetImporters();
                    sql += " WHERE i.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    Importer importer = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        importer = ImporterObject(reader);
                    }

                    reader.Close();
                    return importer;
                }
            }
        }

        public void Add(Importer importer)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Importer ([Name], [Description], [Wesbite])
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @Description, @Website)";


                    DbUtils.AddParameter(cmd, "@Name", importer.Name);
                    DbUtils.AddParameter(cmd, "@Description", DbUtils.ValueOrDBNull(importer.Description));
                    DbUtils.AddParameter(cmd, "@Website", DbUtils.ValueOrDBNull(importer.Website));

                    importer.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Importer importer)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Importer
                        SET
                        [Name] = @Name,
                        Description = @Description,
                        Website = @Website
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", importer.Id);
                    DbUtils.AddParameter(cmd, "@Name", importer.Name);
                    DbUtils.AddParameter(cmd, "@Description", DbUtils.ValueOrDBNull(importer.Description));
                    DbUtils.AddParameter(cmd, "@Website", DbUtils.ValueOrDBNull(importer.Website));


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
                        DELETE FROM Importer
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
