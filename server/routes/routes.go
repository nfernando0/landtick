package routes

import "github.com/labstack/echo/v4"

func RouteInit(e *echo.Group) {
	UserRoutes(e)
	AuthRoutes(e)
	TicketRoutes(e)
	StationRoute(e)
	TransactionRoutes(e)
}
