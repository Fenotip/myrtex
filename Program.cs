using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using MyrtexProject;
using MyrtexProject.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// �������� ������ ����������� �� ����� ������������
string connection = builder.Configuration.GetConnectionString("DefaultConnection");

// ��������� �������� ApplicationContext � �������� ������� � ����������
builder.Services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(connection));

builder.Services.AddScoped<EmployeeService>();

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();



app.UseEndpoints(endpoints =>
{
    // ������������ API-���������

    endpoints.MapControllerRoute(
        name: "api",
        pattern: "api/{controller}/{action=Index}/{id?}");

    endpoints.MapFallbackToFile("index.html");
});



app.Run();
