package handlers

import (
	dto "landtick/dto/result"
	"landtick/repositories"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

type StationHandlers struct {
	StationRepository repositories.StationRepository
}

func HandlersStation(StationRepository repositories.StationRepository) *StationHandlers {
	return &StationHandlers{StationRepository}
}

func (h *StationHandlers) FindStation(c echo.Context) error {
	train, err := h.StationRepository.FindStation()

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: train})
}

func (h *StationHandlers) GetStation(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	Train, err := h.StationRepository.GetStation(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: Train})
}
