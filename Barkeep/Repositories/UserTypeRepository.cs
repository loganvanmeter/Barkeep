using Barkeep.Models;
using Barkeep.Utils;

namespace Barkeep.Repositories
{
    public class UserTypeRepository : BaseRepository, IUserTypeRepository
    {
        public UserTypeRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserType> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name FROM UserType;";

                    var userTypes = new List<UserType>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        UserType userType = new UserType()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        };

                        userTypes.Add(userType);
                    }

                    reader.Close();
                    return userTypes;
                }
            }
        }
    }
}
