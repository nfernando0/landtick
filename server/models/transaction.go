package models

type Transaction struct {
	ID       int                 `json:"id" gorm:"primary_key:auto_increment"`
	UserID   int                 `json:"user_id" form:"user_id"`
	User     UserProfileResponse `json:"user" gorm:"foreignKey:UserID"`
	TicketID int                 `json:"ticket_id" form:"ticket_id"`
	Ticket   TicketResponse      `json:"ticket" gorm:"foreignKey:TicketID"`
	Qty      int                 `json:"qty"`
	Price    int                 `json:"price"`
	Status   string              `json:"status" gorm:"default:'pending'"`
}
