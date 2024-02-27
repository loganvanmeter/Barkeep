using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;

namespace Barkeep.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configuration) : base(configuration) { }

        //Private helper methods to DRY out Category SQL queries
        private string GetCategories()
        {
            return @"SELECT 
                    c.Id, c.Name, c.Description, c.ProviderBarId, c.IsAdminApproved 
                    
                    FROM [Category] c";
        }

        private Category CategoryObject(SqlDataReader reader)
        {
            Category category = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                Description = DbUtils.GetString(reader, "Description"),
                ProviderBarId = DbUtils.GetNullableInt(reader, "ProviderBarId"),
                IsAdminApproved = reader.GetBoolean(reader.GetOrdinal("IsAdminApproved")),
            };
            return category;
        }

        public List<Category> GetAllApproved()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetCategories();
                    sql += " WHERE c.IsAdminApproved = 1";
                    cmd.CommandText = sql;

                    var categories = new List<Category>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Category category = CategoryObject(reader);

                        categories.Add(category);
                    }

                    reader.Close();
                    return categories;
                }
            }
        }

        public List<Category> GetAllNotApproved()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetCategories();
                    sql += " WHERE c.IsAdminApproved = 0";
                    cmd.CommandText = sql;

                    var categories = new List<Category>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Category category = CategoryObject(reader);

                        categories.Add(category);
                    }

                    reader.Close();
                    return categories;
                }
            }
        }

        public Category GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetCategories();
                    sql += " WHERE c.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    Category category = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        category = CategoryObject(reader);
                    }

                    reader.Close();
                    return category;
                }
            }
        }
    }
}
