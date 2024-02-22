using Barkeep.Models;
using Barkeep.Utils;
using System.Reflection.PortableExecutable;

namespace Barkeep.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        //Private helper methods to DRY out User SQL queries
        private string GetUsersWithUserType()
        {
            return @"SELECT 
                    u.Id, u.DisplayName, u.FirstName, u.LastName, u.Phone, u.Email, 
                    Pin, u.CreateDateTime, u.EndDateTime, u.UserTypeId, u.IsActive,

                    ut.Id, ut.Name
                    
                    FROM [User] u
                    LEFT JOIN UserType ut ON ut.Id = u.UserTypeId";
        }

        public List<User> GetAllActive()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetUsersWithUserType();
                    sql += " WHERE u.IsActive = 1";
                    cmd.CommandText = sql;

                    var users = new List<User>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        User user = new()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Phone = DbUtils.GetString(reader, "Phone"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Pin = DbUtils.GetString(reader, "Pin"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            EndDateTime = DbUtils.GetNullableDateTime(reader, "EndDateTime"),
                            IsActive = reader.GetBoolean(reader.GetOrdinal("IsActive")),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "Name"),
                            },
                        };

                        users.Add(user);
                    }

                    reader.Close();
                    return users;
                }
            }
        }

        public User GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetUsersWithUserType();
                    sql += " WHERE u.Email = @email";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@email", email);

                    User user = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        user = new()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Phone = DbUtils.GetString(reader, "Phone"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Pin = DbUtils.GetString(reader, "Pin"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            EndDateTime = DbUtils.GetNullableDateTime(reader, "EndDateTime"),
                            IsActive = reader.GetBoolean(reader.GetOrdinal("IsActive")),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "Name"),
                            }
                        };
                    }

                    reader.Close();
                    return user;
                }
            }
        }


    }
}
