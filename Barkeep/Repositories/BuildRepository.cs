using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;

namespace Barkeep.Repositories
{
    public class BuildRepository : BaseRepository, IBuildRepository
    {
        public BuildRepository(IConfiguration configuration) : base(configuration) { }

        private string GetBuild()
        {
            return @"SELECT 
                    b.Id, b.MenuItemId
                    
                    FROM [Build] b
    
                    ";
        }

        private string OrderById()
        {
            return " ORDER BY b.Id";
        }
        private Build BuildObject(SqlDataReader reader)
        {
            Build build = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                MenuItemId = DbUtils.GetInt(reader, "MenuItemId"),
                Parts = new List<BuildPart>()

            };
            return build;
        }

        public List<Build> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetBuild();
                    sql += OrderById();
                    cmd.CommandText = sql;

                    var builds = new List<Build>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Build build = BuildObject(reader);

                        builds.Add(build);
                    }

                    reader.Close();
                    return builds;
                }
            }
        }

        public Build GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetBuild();
                    sql += " WHERE b.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    Build build = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        build = BuildObject(reader);
                    }

                    reader.Close();
                    return build;
                }
            }
        }

        public Build GetByMenuItemId(int menuItemId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetBuild();
                    sql += " WHERE b.MenuItemId = @menuItemId";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@menuItemId", menuItemId);

                    Build build = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        build = BuildObject(reader);
                    }

                    reader.Close();
                    return build;
                }
            }
        }

        public void Add(Build build)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Build ([MenuItemId])
                        OUTPUT INSERTED.ID
                        VALUES (@MenuItemId)";


                    DbUtils.AddParameter(cmd, "@Name", build.MenuItemId);

                    build.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Build build)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Build
                        SET
                        [MenuItemId] = @MenuItemId
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", build.Id);
                    DbUtils.AddParameter(cmd, "@MenuItemId", build.MenuItemId);

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
                        DELETE FROM Build
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
