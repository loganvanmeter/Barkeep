using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;

namespace Barkeep.Repositories
{
    public class PayRateTypeRepository : BaseRepository, IPayRateTypeRepository
    {
        public PayRateTypeRepository(IConfiguration configuration) : base(configuration) { }

        private string GetPayRateTypes()
        {
            return @"SELECT 
                    prt.Id, prt.Name
                    
                    FROM [PayRateType] prt";
        }

        private string OrderByName()
        {
            return " ORDER BY prt.Name";
        }

        private PayRateType PayRateTypeObject(SqlDataReader reader)
        {
            PayRateType payRateType = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name")
            };
            return payRateType;
        }

        public List<PayRateType> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetPayRateTypes();
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    var payRateTypes = new List<PayRateType>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        PayRateType payRateType = PayRateTypeObject(reader);

                        payRateTypes.Add(payRateType);
                    }

                    reader.Close();
                    return payRateTypes;
                }
            }
        }

        public PayRateType GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetPayRateTypes();
                    sql += " WHERE prt.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    PayRateType payRateType = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        payRateType = PayRateTypeObject(reader);
                    }

                    reader.Close();
                    return payRateType;
                }
            }
        }

        public void Add(PayRateType payRateType)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO PayRateType ([Name])
                        OUTPUT INSERTED.ID
                        VALUES (@Name)";


                    DbUtils.AddParameter(cmd, "@Name", payRateType.Name);

                    payRateType.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(PayRateType payRateType)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE PayRateType
                        SET
                        [Name] = @Name
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", payRateType.Id);
                    DbUtils.AddParameter(cmd, "@Name", payRateType.Name);

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
                        DELETE FROM PayRateType
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
