using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;

namespace Barkeep.Repositories
{
    public class MenuRepository : BaseRepository, IMenuRepository
    {
        public MenuRepository(IConfiguration configuration) : base(configuration) { }

        //Private helper methods to DRY out Menu SQL queries
        private string GetMenus()
        {
            return @"SELECT 
                    m.Id, m.BarId, m.Name, m.CreateDateTime, m.Enabled 
                    
                    FROM [Menu] m";
        }

        private string OrderByName()
        {
            return " ORDER BY m.Name";
        }

        private Menu MenuObject(SqlDataReader reader)
        {
            Menu menu = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                BarId = DbUtils.GetInt(reader, "BarId"),
                Name = DbUtils.GetString(reader, "Name"),
                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                Enabled = DbUtils.GetBoolean(reader, "Enabled"),
                MenuCategories = new List<MenuCategory>(),
                MenuItems = new List<MenuItem>()

            };
            return menu;
        }

        public List<Menu> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetMenus();
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    var menus = new List<Menu>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Menu menu = MenuObject(reader);

                        menus.Add(menu);
                    }

                    reader.Close();
                    return menus;
                }
            }
        }

        public List<Menu> GetAllMyMenus(int barId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetMenus();
                    sql += " WHERE m.BarId = @BarId";
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@BarId", barId);

                    var menus = new List<Menu>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Menu menu = MenuObject(reader);

                        menus.Add(menu);
                    }

                    reader.Close();
                    return menus;
                }
            }
        }
        public Menu GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetMenus();
                    sql += " WHERE m.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    Menu menu = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        menu = MenuObject(reader);
                    }

                    reader.Close();
                    return menu;
                }
            }
        }

        public void Add(Menu menu)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Menu ([BarId], [Name], [CreateDateTime], [Enabled])
                        OUTPUT INSERTED.ID
                        VALUES (@BarId, @Name, @CreateDateTime, @Enabled)";


                    DbUtils.AddParameter(cmd, "@BarId", menu.BarId);
                    DbUtils.AddParameter(cmd, "@Name", menu.Name);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", menu.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@Enabled", menu.Enabled);


                    menu.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Menu menu)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Menu
                        SET
                        BarId = @BarId,
                        [Name] = @Name,
                        CreateDateTime = @CreateDateTime,
                        Enabled = @Enabled
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", menu.Id);
                    DbUtils.AddParameter(cmd, "@BarId", menu.BarId);
                    DbUtils.AddParameter(cmd, "@Name", menu.Name);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", menu.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@Enabled", menu.Enabled);

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
                        DELETE FROM Menu
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
