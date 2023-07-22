package routes

import (
	"landtick/handlers"
	// "landtick/pkg/middleware"
	"landtick/pkg/middleware"
	"landtick/pkg/mysql"
	"landtick/repositories"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	r := repositories.RepositoryTransaction(mysql.DB)
	s := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlersTransactions(r, s)

	e.POST("/transaction", middleware.Auth(h.CreateTransaction))
	e.GET("/transactions", h.FindTransaction)
	e.GET("/transactionUser", middleware.Auth(h.GetTransactionByUser))
	e.GET("/transaction/:id", h.GetTransaction)
	e.DELETE("/transaction-delete/:id", h.DeleteTransaction)
	e.POST("/notification", h.Notification)
	e.GET("/payment/:id", h.GetPayment)
}
