package stationdto

type StationRequest struct {
	Name string `json:"name" form:"name" gorm:"type: varchar(255)"`
}
type UpdateStationRequest struct {
	Name string `json:"name" form:"name" gorm:"type: varchar(255)"`
}

type StationResponse struct {
	ID       int    `json:"id"`
	Name    string `json:"name" gorm:"type: varchar(255)"`
}