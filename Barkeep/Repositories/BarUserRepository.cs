using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;

namespace Barkeep.Repositories
{
    public class BarUserRepository : BaseRepository, IBarUserRepository
    {
        public BarUserRepository(IConfiguration configuration) : base(configuration) { }

        private string GetBarUserWithUserUserTypePayRateType()
        {
            return @"SELECT 
                    bu.Id, bu.UserId, bu.BarId, bu.UserTypeId, bu.PayRate, bu.PayRateTypeId, bu.CreateDateTime, 
                    bu.EndDateTime, bu.IsActive, bu.RoleId,

                    u.Id, u.DisplayName, u.FirstName, u.LastName, u.Phone, u.Email, 
                    u.Pin, u.CreateDateTime, u.EndDateTime, u.UserTypeId AS UUserTypeId, u.IsActive,
                    u.Password,

                    ut.Id, ut.Name AS UTName,

                    prt.Id, prt.Name AS PRTName,

                    r.Id, r.Name AS RName, r.BarId AS RBarId

                    FROM [BarUser] bu
                    LEFT JOIN [User] u ON u.Id = bu.UserId
                    LEFT JOIN [UserType] ut ON ut.Id = bu.UserTypeId
                    LEFT JOIN [PayRateType] prt ON prt.Id = bu.PayRateTypeId
                    LEFT JOIN [Role] r ON r.Id = bu.RoleId
                    ";
        }

        private string OrderByBarId()
        {
            return " ORDER BY bu.BarId";
        }

        private string OrderByBarUserUserName()
        {
            return " ORDER BY u.LastName";
        }

        private BarUser BarUserObject(SqlDataReader reader)
        {
            BarUser barUser = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                UserId = DbUtils.GetInt(reader, "UserId"),
                BarId = DbUtils.GetInt(reader, "BarId"),
                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                PayRate = DbUtils.GetDouble(reader, "PayRate"),
                PayRateTypeId = DbUtils.GetInt(reader, "PayRateTypeId"),
                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                EndDateTime = DbUtils.GetNullableDateTime(reader, "EndDateTime"),
                IsActive = DbUtils.GetBoolean(reader, "IsActive"),
                RoleId = DbUtils.GetInt(reader, "RoleId"),
                User = new User()
                {
                    Id = DbUtils.GetInt(reader, "UserId"),
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
                    UserTypeId = DbUtils.GetInt(reader, "UUserTypeId"),
                },
                UserType = new UserType()
                {
                    Id = DbUtils.GetInt(reader, "UserTypeId"),
                    Name = DbUtils.GetString(reader, "UTName"),
                },
                PayRateType = new PayRateType()
                {
                    Id = DbUtils.GetInt(reader, "PayRateTypeId"),
                    Name = DbUtils.GetString(reader, "PRTName"),
                },
                Role = new Role()
                {
                    Id = DbUtils.GetInt(reader, "RoleId"),
                    Name = DbUtils.GetString(reader, "RName"),
                    BarId = DbUtils.GetInt(reader, "RBarId")
                }
            };
            return barUser;
        }

        public List<BarUser> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetBarUserWithUserUserTypePayRateType();
                    sql += OrderByBarId();
                    cmd.CommandText = sql;

                    var barUsers = new List<BarUser>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        BarUser barUser = BarUserObject(reader);

                        barUsers.Add(barUser);
                    }

                    reader.Close();
                    return barUsers;
                }
            }
        }

        public List<BarUser> GetAllByBarId(int barId, bool isActive)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetBarUserWithUserUserTypePayRateType();
                    sql += " WHERE bu.BarId = @BarId AND bu.IsActive = @IsActive";
                    sql += OrderByBarUserUserName();
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@BarId", barId);
                    DbUtils.AddParameter(cmd, "@IsActive", isActive);

                    var barUsers = new List<BarUser>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        BarUser barUser = BarUserObject(reader);

                        barUsers.Add(barUser);
                    }

                    reader.Close();
                    return barUsers;
                }
            }
        }

        public List<BarUser> GetAllByUserId(int userId, bool isActive)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetBarUserWithUserUserTypePayRateType();
                    sql += " WHERE bu.UserId = @UserId AND bu.IsActive = @IsActive";
                    sql += OrderByBarId();
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@UserId", userId);
                    DbUtils.AddParameter(cmd, "@IsActive", isActive);

                    var barUsers = new List<BarUser>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        BarUser barUser = BarUserObject(reader);

                        barUsers.Add(barUser);
                    }

                    reader.Close();
                    return barUsers;
                }
            }
        }

        public BarUser GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetBarUserWithUserUserTypePayRateType();
                    sql += " WHERE bu.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    BarUser barUser = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        barUser = BarUserObject(reader);
                    }

                    reader.Close();
                    return barUser;
                }
            }
        }

        public void Add(BarUser barUser)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO BarUser ([UserId], [BarId], [UserTypeId], [PayRate], [PayRateTypeId], 
                        [CreateDateTime], [EndDateTime], [IsActive], [RoleId])
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @BarId, @UserTypeId, @PayRate, @PayRateTypeId, @CreateDateTime, 
                        @EndDateTime, @IsActive, @RoleId)";


                    DbUtils.AddParameter(cmd, "@UserId", barUser.UserId);
                    DbUtils.AddParameter(cmd, "@BarId", barUser.BarId);
                    DbUtils.AddParameter(cmd, "@UserTypeId", barUser.UserTypeId);
                    DbUtils.AddParameter(cmd, "@PayRate", barUser.PayRate);
                    DbUtils.AddParameter(cmd, "@PayRateTypeId", barUser.PayRateTypeId);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", barUser.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@EndDateTime", DbUtils.ValueOrDBNull(barUser.EndDateTime));
                    DbUtils.AddParameter(cmd, "@RoleId", barUser.RoleId);

                    barUser.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(BarUser barUser)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE BarUser
                        SET
                        UserId = @UserId, 
                        BarId = @BarId, 
                        UserTypeId = @UserTypeId, 
                        PayRate = @PayRate, 
                        PayRateTypeId = @PayRateTypeId, 
                        CreateDateTime = @CreateDateTime, 
                        EndDateTimme = @EndDateTime, 
                        IsActive = @IsActive, 
                        RoleId = @RoleId
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", barUser.Id);
                    DbUtils.AddParameter(cmd, "@UserId", barUser.UserId);
                    DbUtils.AddParameter(cmd, "@BarId", barUser.BarId);
                    DbUtils.AddParameter(cmd, "@UserTypeId", barUser.UserTypeId);
                    DbUtils.AddParameter(cmd, "@PayRate", barUser.PayRate);
                    DbUtils.AddParameter(cmd, "@PayRateTypeId", barUser.PayRateTypeId);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", barUser.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@EndDateTime", DbUtils.ValueOrDBNull(barUser.EndDateTime));
                    DbUtils.AddParameter(cmd, "@RoleId", barUser.RoleId);


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
                        DELETE FROM BarUser
                        WHERE Id = @Id;
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
