package transactiondto

import (
	"landtick/models"
	"time"
)

type TransactionRequest struct {
	UserID   int `json:"user_id"`
	TicketID int `json:"ticket_id"`
	Qty      int `json:"qty"`
	Price    int `json:"price"`
}
type TransactionResponse struct {
	ID        int                        `json:"id" gorm:"primary_key:auto_increment"`
	UserID    int                        `json:"user_id"`
	User      models.UserProfileResponse `json:"user"`
	TicketID  int                        `json:"ticket_id"`
	Ticket    models.TicketResponse      `json:"ticket"`
	Image     string                     `json:"image" form:"image"`
	Status    string                     `json:"status"`
	Qty       int                        `json:"qty"`
	CreatedAt time.Time                  `json:"-"`
	UpdatedAt time.Time                  `json:"-"`
}
