using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;

namespace Barkeep.Repositories
{
    public class StateRepository : BaseRepository, IStateRepository
    {
        public StateRepository(IConfiguration configuration) : base(configuration) { }

        private string GetStateWithCountry()
        {
            return @"SELECT 
                    s.Id, s.Name, s.CountryId,

                    c.Id, c.Name AS CName
                    
                    FROM [State] s
                    LEFT JOIN [Country] c ON c.Id = s.CountryId
                    ";
        }

        private string OrderByName()
        {
            return " ORDER BY s.Name";
        }

        
        private State StateObject(SqlDataReader reader)
        {
            State state = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                CountryId = DbUtils.GetInt(reader, "CountryId"),
                Country = new Country()
                {
                    Id = DbUtils.GetInt(reader, "CountryId"),
                    Name = DbUtils.GetString(reader, "CName"),
                }
            };
            return state;
        }

        public List<State> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetStateWithCountry();
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    var states = new List<State>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        State state = StateObject(reader);

                        states.Add(state);
                    }

                    reader.Close();
                    return states;
                }
            }
        }

        public State GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetStateWithCountry();
                    sql += " WHERE s.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    State state = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        state = StateObject(reader);
                    }

                    reader.Close();
                    return state;
                }
            }
        }

        public void Add(State state)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO State ([Name], [CountryId])
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @CountryId)";


                    DbUtils.AddParameter(cmd, "@Name", state.Name);
                    DbUtils.AddParameter(cmd, "@CountryId", state.CountryId);

                    state.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(State state)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE State
                        SET
                        [Name] = @Name,
                        CountryId = @CountryId
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", state.Id);
                    DbUtils.AddParameter(cmd, "@Name", state.Name);
                    DbUtils.AddParameter(cmd, "@CountryId", state.CountryId);


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
                        DELETE FROM State
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
