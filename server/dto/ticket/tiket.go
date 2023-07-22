package ticketdto

type TicketRequest struct {
	ID             int    `json:"id" gorm:"primary_key:auto_increment"`
	TrainName      string `json:"train_name" gorm:"type: varchar(255)" form:"train_name"`
	TrainType      string `json:"train_type" gorm:"type: varchar(255)" form:"train_type"`
	StartStationID string `json:"start_station_id" form:"start_station_id"`
	DestinationID  string `json:"destination_id" form:"destination_id"`
	StartDate      string `json:"start_date" form:"start_date"`
	StartTime      string `json:"start_time" form:"start_time"`
	ArrivalTime    string `json:"arrival_time" form:"arrival_time"`
	Price          int    `json:"price" form:"price"`
	Qty            int    `json:"qty" form:"qty"`
}

type TicketResponse struct {
	TrainName      string `json:"train_name" `
	TrainType      string `json:"train_type" `
	StartStationID string `json:"start_station_id" `
	DestinationID  string `json:"destination_id" `
	StartDate      string `json:"start_date" `
	StartTime      string `json:"start_time" `
	ArrivalTime    string `json:"arrival_time" `
	Price          int    `json:"price"`
	Qty            int    `json:"qty" `
}
