package routes

import (
	"landtick/handlers"
	"landtick/pkg/mysql"
	"landtick/repositories"

	"github.com/labstack/echo/v4"
)

func TicketRoutes(e *echo.Group) {
	r := repositories.RepositoryTicket(mysql.DB)
	h := handlers.HandlerTickets(r)

	e.GET("/tickets", h.FindTicket)
	e.GET("/ticket/:id", h.GetTicket)
	e.POST("/ticket", h.CreateTicket)
	e.GET("/ticket/", h.FilterTicket)
}
