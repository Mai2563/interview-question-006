using Example.Product.Api.Data;
using Example.Product.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace Example.Product.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductCodesController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductCodesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var data = await _context.ProductCodes
            .OrderByDescending(x => x.Id)
            .ToListAsync();

        return Ok(data);
    }

    [HttpPost]
    public async Task<IActionResult> Create(ProductCode request)
    {
        var regex = @"^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$";

        if (!Regex.IsMatch(request.Code, regex))
        {
            return BadRequest("Invalid product code format.");
        }

        var exists = await _context.ProductCodes
            .AnyAsync(x => x.Code == request.Code);

        if (exists)
        {
            return BadRequest("Product code already exists.");
        }

        _context.ProductCodes.Add(request);

        await _context.SaveChangesAsync();

        return Ok(request);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _context.ProductCodes.FindAsync(id);

        if (item == null)
        {
            return NotFound();
        }

        _context.ProductCodes.Remove(item);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}