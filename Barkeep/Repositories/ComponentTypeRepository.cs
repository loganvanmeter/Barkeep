using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;

namespace Barkeep.Repositories
{
    public class ComponentTypeRepository : BaseRepository, IComponentTypeRepository
    {
        public ComponentTypeRepository(IConfiguration configuration) : base(configuration) { }

        private string GetComponentTypes()
        {
            return @"SELECT 
                    ct.Id, ct.Name
                    
                    FROM [ComponentType] ct";
        }

        private string OrderByName()
        {
            return " ORDER BY ct.Name";
        }

        private ComponentType ComponentTypeObject(SqlDataReader reader)
        {
            ComponentType componentType = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name")
            };
            return componentType;
        }
        public List<ComponentType> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetComponentTypes();
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    var componentTypes = new List<ComponentType>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        ComponentType componentType = ComponentTypeObject(reader);

                        componentTypes.Add(componentType);
                    }

                    reader.Close();
                    return componentTypes;
                }
            }
        }

        public ComponentType GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetComponentTypes();
                    sql += " WHERE ct.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    ComponentType componentType = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        componentType = ComponentTypeObject(reader);
                    }

                    reader.Close();
                    return componentType;
                }
            }
        }

        public void Add(ComponentType componentType)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO ComponentType ([Name])
                        OUTPUT INSERTED.ID
                        VALUES (@Name)";


                    DbUtils.AddParameter(cmd, "@Name", componentType.Name);

                    componentType.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(ComponentType componentType)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE ComponentType
                        SET
                        [Name] = @Name
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", componentType.Id);
                    DbUtils.AddParameter(cmd, "@Name", componentType.Name);


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
                        DELETE FROM ComponentType
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
