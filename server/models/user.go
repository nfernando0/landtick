package models

type User struct {
	ID        int    `json:"id" gorm:"primary_key:auto_increment"`
	Fullname  string `json:"fullname" gorm:"type: varchar(255)"`
	Username  string `json:"username" gorm:"type: varchar(255)"`
	Email     string `json:"email" gorm:"type: varchar(255)"`
	Password  string `json:"password" gorm:"type: varchar(255)"`
	Gender    string `json:"gender" gorm:"type: varchar(255)"`
	Phone     string `json:"phone" gorm:"type: varchar(255)"`
	Address   string `json:"address" gorm:"type: varchar(255)"`
	Role      string `json:"role" gorm:"default: user"`
	CreatedAt string `json:"-"`
	UpdatedAt string `json:"-"`
}

type UserResponse struct {
	ID       int    `json:"id" gorm:"primary_key:auto_increment"`
	Fullname string `json:"fullname" gorm:"type: varchar(255)"`
	Username string `json:"username" gorm:"type: varchar(255)"`
	Email    string `json:"email" gorm:"type: varchar(255)"`
	Phone    string `json:"phone" gorm:"type: varchar(255)"`
	Role     string `json:"role" gorm:"default: user"`
}

type UserProfileResponse struct {
	ID       int    `json:"id" gorm:"primary_key:auto_increment"`
	Fullname string `json:"fullname" gorm:"type: varchar(255)"`
	Email    string `json:"email" gorm:"type: varchar(255)"`
	Phone    string `json:"phone" gorm:"type: varchar(255)"`
}

func (UserResponse) TableName() string {
	return "users"
}

func (UserProfileResponse) TableName() string {
	return "users"
}
