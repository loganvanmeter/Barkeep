using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;

namespace Barkeep.Repositories
{
    public class ComponentCategoryRepository : BaseRepository, IComponentCategoryRepository
    {
        public ComponentCategoryRepository(IConfiguration configuration) : base(configuration) { }

        private string GetComponentCategories()
        {
            return @"SELECT 
                    cc.Id, cc.ComponentId, cc.CategoryId, cat.Id, cat.[Name]
                    
                    FROM [ComponentCategory] cc
                    LEFT JOIN [Category] cat

                    ";
        }

        private string OrderByComponentId()
        {
            return " ORDER BY cc.ComponentId";
        }

        private string OrderByCategory()
        {
            return " ORDER BY cat.[Name]";
        }

        private ComponentCategory ComponentCategoryObject(SqlDataReader reader)
        {
            ComponentCategory componentCategory = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                ComponentId = DbUtils.GetInt(reader, "ComponentId"),
                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                Category = new Category()
                {
                    Id = DbUtils.GetInt(reader, "CategoryId"),
                    Name = DbUtils.GetString(reader, "Name")
                },
            };
            return componentCategory;
        }
        public List<ComponentCategory> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetComponentCategories();
                    sql += OrderByComponentId();
                    cmd.CommandText = sql;

                    var componentCategories = new List<ComponentCategory>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        ComponentCategory componentCategory = ComponentCategoryObject(reader);

                        componentCategories.Add(componentCategory);
                    }

                    reader.Close();
                    return componentCategories;
                }
            }
        }

        public List<ComponentCategory> GetAllByComponentId(int componentId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetComponentCategories();
                    sql += " WHERE cc.ComponentId = @ComponentId";
                    sql += OrderByCategory();
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@ComponentId", componentId);

                    var componentCategories = new List<ComponentCategory>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        ComponentCategory componentCategory = ComponentCategoryObject(reader);

                        componentCategories.Add(componentCategory);
                    }

                    reader.Close();
                    return componentCategories;
                }
            }
        }

        public List<ComponentCategory> GetAllByCategoryId(int categoryId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetComponentCategories();
                    sql += " WHERE cc.CategoryId = @CategoryId";
                    sql += OrderByComponentId();
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@CategoryId", categoryId);

                    var componentCategories = new List<ComponentCategory>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        ComponentCategory componentCategory = ComponentCategoryObject(reader);

                        componentCategories.Add(componentCategory);
                    }

                    reader.Close();
                    return componentCategories;
                }
            }
        }

        public ComponentCategory GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetComponentCategories();
                    sql += " WHERE cc.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    ComponentCategory componentCategory = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        componentCategory = ComponentCategoryObject(reader);
                    }

                    reader.Close();
                    return componentCategory;
                }
            }
        }


        public void Add(ComponentCategory componentCategory)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO ComponentCategory ([ComponentId], [CategoryId])
                        OUTPUT INSERTED.ID
                        VALUES (@ComponentId, @CategoryId)";


                    DbUtils.AddParameter(cmd, "@ComponentId", componentCategory.ComponentId);
                    DbUtils.AddParameter(cmd, "@CategoryId", componentCategory.CategoryId);

                    componentCategory.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(ComponentCategory componentCategory)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE ComponentCategory
                        SET
                        [ComponentId] = @ComponentId,
                        [CategoryId] = @CategoryId
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", componentCategory.Id);
                    DbUtils.AddParameter(cmd, "@ComponentId", componentCategory.ComponentId);
                    DbUtils.AddParameter(cmd, "@CategoryId", componentCategory.CategoryId);

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
                        DELETE FROM ComponentCategory
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
