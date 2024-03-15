using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;

namespace Barkeep.Repositories
{
    public class MenuItemRepository : BaseRepository, IMenuItemRepository
    {
        public MenuItemRepository(IConfiguration configuration) : base(configuration) { }
        //Private helper methods to DRY out MenuItem SQL queries
        private string GetMenuItems()
        {
            return @"SELECT 
                    mi.Id, mi.MenuId, mi.Name, mi.DisplayName, mi.MenuCategoryId, mi.Price, mi.Enabled , mi.Notes
                    
                    FROM [MenuItem] mi";
        }

        private string OrderByName()
        {
            return " ORDER BY mi.Name";
        }

        private MenuItem MenuItemObject(SqlDataReader reader)
        {
            MenuItem menuItem = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                MenuId = DbUtils.GetInt(reader, "MenuId"),
                MenuCategoryId = DbUtils.GetNullableInt(reader, "MenuCategoryId"),
                Name = DbUtils.GetString(reader, "Name"),
                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                Price = DbUtils.GetDecimal(reader, "Price"),
                Enabled = DbUtils.GetBoolean(reader, "Enabled"),
                Notes = DbUtils.GetString(reader, "Notes"),
                Build = new Build()

            };
            return menuItem;
        }

        public List<MenuItem> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetMenuItems();
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    var menuItems = new List<MenuItem>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        MenuItem menuItem = MenuItemObject(reader);

                        menuItems.Add(menuItem);
                    }

                    reader.Close();
                    return menuItems;
                }
            }
        }

        public List<MenuItem> GetAllThisMenuItems(int menuId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetMenuItems();
                    sql += " WHERE mi.MenuId = @MenuId AND mi.MenuCategoryId IS NULL";
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@MenuId", menuId);

                    var menuItems = new List<MenuItem>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        MenuItem menuItem = MenuItemObject(reader);

                        menuItems.Add(menuItem);
                    }

                    reader.Close();
                    return menuItems;
                }
            }
        }
        public List<MenuItem> GetAllThisMenuCategoryItems(int menuCategoryId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetMenuItems();
                    sql += " WHERE mi.MenuCategoryId IS NOT NULL AND mi.MenuCategoryId = @MenuCategoryId";
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@MenuCategoryId", menuCategoryId);

                    var menuItems = new List<MenuItem>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        MenuItem menuItem = MenuItemObject(reader);

                        menuItems.Add(menuItem);
                    }

                    reader.Close();
                    return menuItems;
                }
            }
        }
        public MenuItem GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetMenuItems();
                    sql += " WHERE mi.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    MenuItem menuItem = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        menuItem = MenuItemObject(reader);
                    }

                    reader.Close();
                    return menuItem;
                }
            }
        }

        public void Add(MenuItem menuItem)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO MenuItem ([MenuId], [MenuCategoryId], [Name], [DisplayName], [Price], [Enabled], [Notes])
                        OUTPUT INSERTED.ID
                        VALUES (@MenuId, @MenuCategoryId @Name, @DisplayName @Price, @Enabled, @Notes)";


                    DbUtils.AddParameter(cmd, "@MenuId", menuItem.MenuId);
                    DbUtils.AddParameter(cmd, "@MenuCategoryId", DbUtils.ValueOrDBNull(menuItem.MenuCategoryId));
                    DbUtils.AddParameter(cmd, "@Name", menuItem.Name);
                    DbUtils.AddParameter(cmd, "@DisplayName", menuItem.DisplayName);
                    DbUtils.AddParameter(cmd, "@Price", menuItem.Price);
                    DbUtils.AddParameter(cmd, "@Enabled", menuItem.Enabled);
                    DbUtils.AddParameter(cmd, "@Notes", DbUtils.ValueOrDBNull(menuItem.Notes));


                    menuItem.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(MenuItem menuItem)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE MenuItem
                        SET
                        MenuId = @MenuId,
                        MenuCategoryId = @MenuCategoryId,
                        [Name] = @Name,
                        DisplayName = @DisplayName
                        Price = @Price,
                        Enabled = @Enabled,
                        Notes = @Notes
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", menuItem.Id);
                    DbUtils.AddParameter(cmd, "@MenuId", menuItem.MenuId);
                    DbUtils.AddParameter(cmd, "@MenuCategoryId", DbUtils.ValueOrDBNull(menuItem.MenuCategoryId));
                    DbUtils.AddParameter(cmd, "@Name", menuItem.Name);
                    DbUtils.AddParameter(cmd, "@DisplayName", menuItem.DisplayName);
                    DbUtils.AddParameter(cmd, "@Price", menuItem.Price);
                    DbUtils.AddParameter(cmd, "@Enabled", menuItem.Enabled);
                    DbUtils.AddParameter(cmd, "@Notes", DbUtils.ValueOrDBNull(menuItem.Notes));

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
                        DELETE FROM MenuItem
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
