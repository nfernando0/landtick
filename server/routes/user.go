package routes

import (
	"landtick/handlers"
	"landtick/pkg/middleware"
	"landtick/pkg/mysql"
	"landtick/repositories"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Group) {
	r := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerUser(r)

	e.GET("/users", h.FindUser)
	e.GET("/user", middleware.Auth(h.GetUser))
}
