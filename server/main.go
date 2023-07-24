package main

import (
	"landtick/database"
	"landtick/pkg/mysql"
	"landtick/routes"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {

	godotenv.Load()
	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.PATCH, echo.POST, echo.DELETE},
		AllowHeaders: []string{"x-requested-with", "Content-Type", "Authorization"},
	}))

	mysql.DatabaseInit()
	database.RunMigration()


	routes.RouteInit(e.Group("/api/v1"))
	e.Static("/uploads", "./uploads")
	e.Logger.Fatal(e.Start(":5000"))
}
