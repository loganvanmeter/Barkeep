using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;

namespace Barkeep.Repositories
{
    public class UnitTypeRepository : BaseRepository, IUnitTypeRepository
    {
        public UnitTypeRepository(IConfiguration configuration) : base(configuration) { }

        //Private helper methods to DRY out UnitType SQL queries
        private string GetUnitTypes()
        {
            return @"SELECT 
                    ut.Id, ut.Name, ut.IsCase, ut.IsEach, ut.IsByWeight
                    
                    FROM [UnitType] ut";
        }

        private string OrderByName()
        {
            return " ORDER BY ut.Name";
        }

        private UnitType UnitTypeObject(SqlDataReader reader)
        {
            UnitType unitType = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                IsCase = DbUtils.GetBoolean(reader, "IsCase"),
                IsEach = DbUtils.GetBoolean(reader, "IsEach"),
                IsByWeight = DbUtils.GetBoolean(reader, "IsByWeight")
            };
            return unitType;
        }

        public List<UnitType> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetUnitTypes();
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    var unitTypes = new List<UnitType>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        UnitType unitType = UnitTypeObject(reader);

                        unitTypes.Add(unitType);
                    }

                    reader.Close();
                    return unitTypes;
                }
            }
        }

        public UnitType GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetUnitTypes();
                    sql += " WHERE ut.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    UnitType unitType = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        unitType = UnitTypeObject(reader);
                    }

                    reader.Close();
                    return unitType;
                }
            }
        }

        public void Add(UnitType unitType)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO UnitType ([Name], [IsCase], [IsEach], [IsByWeight])
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @IsCase, @IsEach, @IsByWeight)";


                    DbUtils.AddParameter(cmd, "@Name", unitType.Name);
                    DbUtils.AddParameter(cmd, "@IsCase", unitType.IsCase);
                    DbUtils.AddParameter(cmd, "@IsEach", unitType.IsEach);
                    DbUtils.AddParameter(cmd, "@IsByWeight", unitType.IsByWeight);

                    unitType.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(UnitType unitType)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE UnitType
                        SET
                        [Name] = @Name,
                        IsCase = @IsCase,
                        IsEach = @IsEach,
                        IsByWeight = @IsByWeight
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", unitType.Id);
                    DbUtils.AddParameter(cmd, "@Name", unitType.Name);
                    DbUtils.AddParameter(cmd, "@IsCase", unitType.IsCase);
                    DbUtils.AddParameter(cmd, "@IsEach", unitType.IsEach);
                    DbUtils.AddParameter(cmd, "@IsByWeight", unitType.IsByWeight);

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
                        DELETE FROM UnitType
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

