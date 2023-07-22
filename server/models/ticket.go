package models

type Ticket struct {
	ID             int             `json:"id" gorm:"primary_key:auto_increment"`
	TrainName      string          `json:"train_name" gorm:"type: varchar(255)" form:"train_name"`
	StartDate      string          `json:"start_date" form:"start_date"`
	TrainType      string          `json:"train_type" gorm:"type: varchar(255)" form:"train_type"`
	StartStationID int             `json:"start_station_id" form:"start_station_id"`
	StartStation   StationResponse `json:"start_station" gorm:"foreignKey:StartStationID"`
	StartTime      string          `json:"start_time"`
	ArrivalTime    string          `json:"arrival_time"`
	DestinationID  int             `json:"destination_id" form:"destination_id"`
	Destination    StationResponse `json:"destination" gorm:"foreignKey:DestinationID"`
	Price          int             `json:"price"`
	Qty            int             `json:"qty"`
}

type TicketResponse struct {
	ID             int             `json:"id"`
	TrainName      string          `json:"train_name"`
	TrainType      string          `json:"train_type"`
	StartDate      string          `json:"start_date"`
	StartStationID int             `json:"start_station_id"`
	StartStation   StationResponse `json:"start_station"`
	StartTime      string          `json:"start_time"`
	DestinationID  int             `json:"destination_id"`
	Destination    StationResponse `json:"destination"`
	ArrivalTime    string          `json:"arrival_time"`
	Price          int             `json:"price"`
	Qty            int             `json:"qty"`
}

func (TicketResponse) TableName() string {
	return "tickets"
}
