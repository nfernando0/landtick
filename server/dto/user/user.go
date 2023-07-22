package userdto

type UserRequest struct {
	Fullname string `json:"fullname" valid:"required"`
	Username string `json:"username" valid:"required"`
	Email    string `json:"email" valid:"required"`
	Password string `json:"password" valid:"required"`
	Gender   string `json:"gender" valid:"required"`
	Phone    string `json:"phone" valid:"required"`
	Address  string `json:"address" valid:"required"`
}

type UserResponse struct {
	ID       int    `json:"id"`
	Fullname string `json:"fullname"`
	Username string `json:"username"`
	Email    string `json:"email"`
}