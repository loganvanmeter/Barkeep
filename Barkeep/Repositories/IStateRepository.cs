using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface IStateRepository
    {
        void Add(State state);
        void Delete(int id);
        List<State> GetAll();
        State GetById(int id);
        void Update(State state);
    }
}