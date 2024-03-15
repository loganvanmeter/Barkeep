using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface IBuildPartRepository
    {
        void Add(BuildPart buildPart);
        void Delete(int id);
        List<BuildPart> GetAll();
        List<BuildPart> GetByBuildId(int buildId);
        BuildPart GetById(int id);
        void Update(BuildPart buildPart);
    }
}