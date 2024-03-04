using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;

namespace Barkeep.Repositories
{
    public class ProducerRepository : BaseRepository, IProducerRepository
    {
        public ProducerRepository(IConfiguration configuration) : base(configuration) { }

        private string GetProducers()
        {
            return @"SELECT 
                    p.Id, p.Name, p.Description, p.Wesbite
                    
                    FROM [Producer] p";
        }

        private string OrderByName()
        {
            return " ORDER BY p.Name";
        }

        private Producer ProducerObject(SqlDataReader reader)
        {
            Producer producer = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                Description = DbUtils.GetString(reader, "Description"),
                Website = DbUtils.GetString(reader, "Website")
            };
            return producer;
        }
        public List<Producer> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetProducers();
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    var producers = new List<Producer>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Producer producer = ProducerObject(reader);

                        producers.Add(producer);
                    }

                    reader.Close();
                    return producers;
                }
            }
        }

        public Producer GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetProducers();
                    sql += " WHERE p.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    Producer producer = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        producer = ProducerObject(reader);
                    }

                    reader.Close();
                    return producer;
                }
            }
        }

        public void Add(Producer producer)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Producer ([Name], [Description], [Wesbite])
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @Description, @Website)";


                    DbUtils.AddParameter(cmd, "@Name", producer.Name);
                    DbUtils.AddParameter(cmd, "@Description", DbUtils.ValueOrDBNull(producer.Description));
                    DbUtils.AddParameter(cmd, "@Website", DbUtils.ValueOrDBNull(producer.Website));

                    producer.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Producer producer)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Producer
                        SET
                        [Name] = @Name,
                        Description = @Description,
                        Website = @Website
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", producer.Id);
                    DbUtils.AddParameter(cmd, "@Name", producer.Name);
                    DbUtils.AddParameter(cmd, "@Description", DbUtils.ValueOrDBNull(producer.Description));
                    DbUtils.AddParameter(cmd, "@Website", DbUtils.ValueOrDBNull(producer.Website));


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
                        DELETE FROM Producer
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
