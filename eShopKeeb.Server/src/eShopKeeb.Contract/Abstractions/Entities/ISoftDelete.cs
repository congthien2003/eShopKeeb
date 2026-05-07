namespace eShopKeeb.Contract.Abstractions.Entities
{
    public interface ISoftDelete
    {
        public bool IsDeleted { get; set; }

        void Delete();
    }
}
