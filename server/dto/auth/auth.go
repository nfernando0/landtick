package authdto

type RegisterRequest struct {
	Username string `json:"username" gorm:"varchar(100)" validate:"required"`
	Email    string `json:"email" gorm:"type: varchar(255)" validate:"required"`
	Password string `json:"password" gorm:"type: :varchar(255)" validate:"required"`
	Fullname string `json:"fullname" gorm:"type: text" validate:"required"`
	Gender   string `json:"gender" gorm:"type:text"`
	Phone    string `json:"phone" gorm:"type:text"`
	Address  string `json:"address" gorm:"type:text"`
}

type LoginRequest struct {
	Username string `json:"username" gorm:"varchar(100)" validate:"required"`
	Password string `json:"password" gorm:"varchar(255)" validate:"required"`
}

type RegisterResponse struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Fullname string `json:"fullname"`
	Gender   string `json:"gender" gorm:"type:text"`
	Phone    string `json:"phone" gorm:"type:text"`
	Address  string `json:"address" gorm:"type:text"`
}

type LoginResponse struct {
	Fullname string `json:"fullname"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Role     string `json:"role" gorm:"default:User"`
	Password string `json:"-"`
	Token    string `json:"token"`
}
