using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Hosting;

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

        private string OrderByName()
        {
            return "ORDER BY c.Name";
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
                    sql += OrderByName();
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
                    sql += OrderByName();
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

        public void Add(Category category)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Category ([Id], [Name], [Description], [ProviderBarId], [IsAdminApproved])
                        OUTPUT INSERTED.ID
                        VALUES (@Id, @Name, @Description, @ProviderBarId, @IsAdminApproved)";


                    DbUtils.AddParameter(cmd, "@Name", category.Name);
                    DbUtils.AddParameter(cmd, "@Description", DbUtils.ValueOrDBNull(category.Description));
                    DbUtils.AddParameter(cmd, "@ProviderBarId", DbUtils.ValueOrDBNull(category.ProviderBarId));
                    DbUtils.AddParameter(cmd, "@IsAdminApproved", category.IsAdminApproved);

                    category.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Category category)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Category
                        SET
                        [Name] = @Name,
                        Description = @Description,
                        ProviderBarId = @ProviderBarId,
                        IsAdminApproved = @IsAdminApproved
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", category.Id);
                    DbUtils.AddParameter(cmd, "@Name", category.Name);
                    DbUtils.AddParameter(cmd, "@Description", DbUtils.ValueOrDBNull(category.Description));
                    DbUtils.AddParameter(cmd, "@ProviderBarId", DbUtils.ValueOrDBNull(category.ProviderBarId));
                    DbUtils.AddParameter(cmd, "@IsAdminApproved", category.IsAdminApproved);

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
                        DELETE FROM Category
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery ();
                }
            }
        }
    }
}
