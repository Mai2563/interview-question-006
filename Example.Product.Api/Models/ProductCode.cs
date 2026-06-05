namespace Example.Product.Api.Models;

public class ProductCode
{
    public int Id { get; set; }

    public string Code { get; set; } = string.Empty;

    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
}