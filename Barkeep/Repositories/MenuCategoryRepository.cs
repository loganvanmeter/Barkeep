using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;

namespace Barkeep.Repositories
{
    public class MenuCategoryRepository : BaseRepository, IMenuCategoryRepository
    {
        public MenuCategoryRepository(IConfiguration configuration) : base(configuration) { }

        //Private helper methods to DRY out MenuCategory SQL queries
        private string GetMenuCategories()
        {
            return @"SELECT 
                    mc.Id, mc.MenuId, mc.MenuCategoryId, mc.DisplayName, mc.Name, mc.DisplayColor, mc.CreateDateTime, mc.Enabled 
                    
                    FROM [MenuCategory] mc";
        }

        private string OrderByName()
        {
            return " ORDER BY mc.Name";
        }

        private MenuCategory MenuCategoryObject(SqlDataReader reader)
        {
            MenuCategory menu = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                MenuId = DbUtils.GetInt(reader, "MenuId"),
                MenuCategoryId = DbUtils.GetNullableInt(reader, "MenuCategoryId"),
                Name = DbUtils.GetString(reader, "Name"),
                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                Enabled = DbUtils.GetBoolean(reader, "Enabled"),
                DisplayColor = DbUtils.GetString(reader, "DisplayColor"),
                SubMenuCategories = new List<MenuCategory>(),
                MenuItems = new List<MenuItem>()


            };

            if (menu.MenuCategoryId != null)
            {
                menu.ParentCategory = new MenuCategory();
            }


            return menu;
        }

        public List<MenuCategory> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetMenuCategories();
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    var menus = new List<MenuCategory>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        MenuCategory menu = MenuCategoryObject(reader);

                        menus.Add(menu);
                    }

                    reader.Close();
                    return menus;
                }
            }
        }

        public List<MenuCategory> GetAllThisMenuCategories(int menuId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetMenuCategories();
                    sql += " WHERE mc.MenuId = @MenuId";
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@MenuId", menuId);

                    var menus = new List<MenuCategory>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        MenuCategory menu = MenuCategoryObject(reader);

                        menus.Add(menu);
                    }

                    reader.Close();
                    return menus;
                }
            }
        }

        public List<MenuCategory> GetAllThisCategorySubCategories(int menuCategoryId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetMenuCategories();
                    sql += " WHERE mc.MenuCategoryId IS NOT NULL AND mc.MenuCategoryId = @MenuCategoryId";
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@MenuCategoryId", menuCategoryId);

                    var menus = new List<MenuCategory>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        MenuCategory menu = MenuCategoryObject(reader);

                        menus.Add(menu);
                    }

                    reader.Close();
                    return menus;
                }
            }
        }
        public MenuCategory GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetMenuCategories();
                    sql += " WHERE mc.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    MenuCategory menu = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        menu = MenuCategoryObject(reader);
                    }

                    reader.Close();
                    return menu;
                }
            }
        }

        public void Add(MenuCategory menu)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO MenuCategory ([MenuId], [MenuCategoryId], [Name], [DisplayName], [DisplayColor], [CreateDateTime], [Enabled])
                        OUTPUT INSERTED.ID
                        VALUES (@MenuId, @MenuCategoryId, @Name, @DisplayName, @DisplayColor, @CreateDateTime, @Enabled)";


                    DbUtils.AddParameter(cmd, "@MenuId", menu.MenuId);
                    DbUtils.AddParameter(cmd, "@MenuCategoryId", DbUtils.ValueOrDBNull(menu.MenuCategoryId));
                    DbUtils.AddParameter(cmd, "@Name", DbUtils.ValueOrDBNull(menu.Name));
                    DbUtils.AddParameter(cmd, "@DisplayName", DbUtils.ValueOrDBNull(menu.DisplayName));
                    DbUtils.AddParameter(cmd, "@DisplayColor", DbUtils.ValueOrDBNull(menu.DisplayColor));
                    DbUtils.AddParameter(cmd, "@CreateDateTime", menu.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@Enabled", menu.Enabled);


                    menu.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(MenuCategory menu)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE MenuCategory
                        SET
                        MenuId = @MenuId,
                        MenuCategoryId = @MenuCategoryId,
                        [Name] = @Name,
                        DisplayName = @DisplayName,
                        DisplayColor = @DisplayColor,
                        CreateDateTime = @CreateDateTime,
                        Enabled = @Enabled
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", menu.Id);
                    DbUtils.AddParameter(cmd, "@MenuId", menu.MenuId);
                    DbUtils.AddParameter(cmd, "@MenuCategoryId", DbUtils.ValueOrDBNull(menu.MenuCategoryId));
                    DbUtils.AddParameter(cmd, "@Name", DbUtils.ValueOrDBNull(menu.Name));
                    DbUtils.AddParameter(cmd, "@DisplayName", DbUtils.ValueOrDBNull(menu.DisplayName));
                    DbUtils.AddParameter(cmd, "@DisplayColor", DbUtils.ValueOrDBNull(menu.DisplayColor));
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
                        DELETE FROM MenuCategory
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
