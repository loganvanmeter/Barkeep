using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;

namespace Barkeep.Repositories
{
    public class RoleRepository : BaseRepository, IRoleRepository
    {
        public RoleRepository(IConfiguration configuration) : base(configuration) { }

        private string GetRoles()
        {
            return @"SELECT 
                    r.Id, r.Name, r.BarId
                    
                    FROM [Role] r";
        }

        private string OrderByName()
        {
            return " ORDER BY r.Name";
        }

        private Role RoleObject(SqlDataReader reader)
        {
            Role role = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                BarId = DbUtils.GetInt(reader, "BarId")
            };
            return role;
        }
        public List<Role> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetRoles();
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    var roles = new List<Role>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Role role = RoleObject(reader);

                        roles.Add(role);
                    }

                    reader.Close();
                    return roles;
                }
            }
        }

        public List<Role> GetAllByBarId(int barId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetRoles();
                    sql += " WHERE r.BarId = @barId";
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@barId", barId);

                    var roles = new List<Role>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Role role = RoleObject(reader);

                        roles.Add(role);
                    }

                    reader.Close();
                    return roles;
                }
            }
        }

        public Role GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetRoles();
                    sql += " WHERE r.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    Role role = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        role = RoleObject(reader);
                    }

                    reader.Close();
                    return role;
                }
            }
        }

        public void Add(Role role)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Role ([Name], [BarId])
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @BarId)";


                    DbUtils.AddParameter(cmd, "@Name", role.Name);
                    DbUtils.AddParameter(cmd, "@BarId", role.BarId);

                    role.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Role role)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Role
                        SET
                        [Name] = @Name,
                        BarId = @BarId
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", role.Id);
                    DbUtils.AddParameter(cmd, "@Name", role.Name);
                    DbUtils.AddParameter(cmd, "@BarId", role.BarId);


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
                        DELETE FROM Role
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
