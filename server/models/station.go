package models

type Station struct {
	ID   int    `json:"id" gorm:"primary_key:auto_increment"`
	Name string `json:"name" gorm:"type: varchar(255)"`
	Kota string `json:"kota" gorm:"type: varchar(255)"`
}

type StationResponse struct {
	ID   int    `json:"id" gorm:"primary_key:auto_increment"`
	Name string `json:"name" gorm:"type: varchar(255)"`
	Kota string `json:"kota" gorm:"type: varchar(255)"`
}

func (StationResponse) TableName() string {
	return "stations"
}

func (Station) TableName() string {
	return "stations"
}
