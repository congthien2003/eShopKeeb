namespace eShopKeeb.Contract.Abstractions.Interfaces
{
    public interface IAuditEntity
    {
        public DateTime CreatedAt { get; set; }

        public Guid? CreatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public Guid? UpdatedBy { get; set; }
    }
}
