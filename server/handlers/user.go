package handlers

import (
	resultdto "landtick/dto/result"
	"landtick/repositories"
	"net/http"

	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
)

type handler struct {
	UserRepository repositories.UserRepository
}

func HandlerUser(UserRepository repositories.UserRepository) *handler {
	return &handler{UserRepository}
}

func (h *handler) FindUser(c echo.Context) error {
	users, err := h.UserRepository.FindUser()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Status: "Success", Data: users})
}

func (h *handler) GetUser(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)
	user := int(userId)
	User, err := h.UserRepository.GetUser(user)

	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Status: "Success", Data: User})
}

// func convertResponse(u models.User) userdto.UserResponse {
// 	return userdto.UserResponse{
// 		ID:       u.ID,
// 		Fullname: u.Fullname,
// 		Username: u.Username,
// 		Email:    u.Email,
// 	}
// }
