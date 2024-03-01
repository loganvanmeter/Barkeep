using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;
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
                    u.Pin, u.CreateDateTime, u.EndDateTime, u.UserTypeId, u.IsActive,
                    u.Password,

                    ut.Id, ut.Name
                    
                    FROM [User] u
                    LEFT JOIN UserType ut ON ut.Id = u.UserTypeId";
        }

        private User UserObject(SqlDataReader reader)
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
                Password = DbUtils.GetString(reader, "Password"),
                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                UserType = new UserType()
                {
                    Id = DbUtils.GetInt(reader, "UserTypeId"),
                    Name = DbUtils.GetString(reader, "Name"),
                },
            };
            return user;
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
                        User user = UserObject(reader);

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
                        user = UserObject(reader);
                    }

                    reader.Close();
                    return user;
                }
            }
        }

        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO User (DisplayName, FirstName, LastName, Phone, Email, 
                        Pin, CreateDateTime, EndDateTime, UserTypeId, IsActive,
                        Password)
                        OUTPUT INSERTED.ID
                        VALUES (@DisplayName, @FirstName, @LastName, @Phone, @Email, 
                        @Pin, @CreateDateTime, @EndDateTime, @UserTypeId, @IsActive,
                        @Password)";


                    DbUtils.AddParameter(cmd, "@DisplayName", user.DisplayName);
                    DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@Phone", user.Phone);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@Pin", user.Pin);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", user.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@EndDateTime", DbUtils.ValueOrDBNull(user.EndDateTime));
                    DbUtils.AddParameter(cmd, "@UserTypeId", user.UserTypeId);
                    DbUtils.AddParameter(cmd, "@IsActive", user.IsActive);
                    DbUtils.AddParameter(cmd, "@Password", user.Password);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE User
                        SET
                        DisplayName = @DisplayName,
                        FirstName = @FirstName,
                        LastName = @LastName,
                        Phone = @Phone,
                        Email = @Email, 
                        Pin = @Pin,
                        CreateDateTime = @CreateDateTime,
                        EndDateTime = @EndDateTime,
                        UserTypeId = @UserTypeId,
                        IsActive = @IsActive,
                        Password = @Password
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", user.Id);
                    DbUtils.AddParameter(cmd, "@DisplayName", user.DisplayName);
                    DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@Phone", user.Phone);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@Pin", user.Pin);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", user.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@EndDateTime", DbUtils.ValueOrDBNull(user.EndDateTime));
                    DbUtils.AddParameter(cmd, "@UserTypeId", user.UserTypeId);
                    DbUtils.AddParameter(cmd, "@IsActive", user.IsActive);
                    DbUtils.AddParameter(cmd, "@Password", user.Password);


                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
