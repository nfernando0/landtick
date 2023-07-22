package repositories

import (
	"landtick/models"

	"gorm.io/gorm"
)

type TicketRepository interface {
	FindTicket() ([]models.Ticket, error)
	GetTicket(id int) (models.Ticket, error)
	CreateTicket(ticket models.Ticket) (models.Ticket, error)
	FilterTicket(StartDate string, StartStationID, DestinationStationID int) ([]models.Ticket, error)
}

func RepositoryTicket(db *gorm.DB) *repository {
	return &repository{db}
}

func (r repository) FindTicket() ([]models.Ticket, error) {
	var tickets []models.Ticket
	err := r.db.Preload("StartStation").Preload("Destination").Find(&tickets).Error

	return tickets, err
}

func (r repository) GetTicket(ID int) (models.Ticket, error) {
	var ticket models.Ticket
	err := r.db.Preload("StartStation").Preload("Destination").First(&ticket, ID).Error

	return ticket, err
}

func (r repository) CreateTicket(ticket models.Ticket) (models.Ticket, error) {
	err := r.db.Create(&ticket).Error

	return ticket, err
}

func (r *repository) FilterTicket(StartDate string, StartStationID, DestinationStationID int) ([]models.Ticket, error) {
	var tickets []models.Ticket
	err := r.db.Where("start_date = ? AND start_station_id = ? AND destination_id = ?", StartDate, StartStationID, DestinationStationID).Preload("StartStation").Preload("Destination").Find(&tickets).Error

	return tickets, err
}
