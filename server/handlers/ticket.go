package handlers

import (
	resultdto "landtick/dto/result"
	"landtick/models"
	"landtick/repositories"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type TicketHandlers struct {
	TicketRepository repositories.TicketRepository
}

func HandlerTickets(TicketRepository repositories.TicketRepository) *TicketHandlers {
	return &TicketHandlers{TicketRepository}
}

func (h *TicketHandlers) FindTicket(c echo.Context) error {
	ticket, err := h.TicketRepository.FindTicket()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Status: "Success", Data: ticket})
}

func (h *TicketHandlers) CreateTicket(c echo.Context) error {
	StartStationID, _ := strconv.Atoi(c.FormValue("start_station_id"))
	DestinationStationID, _ := strconv.Atoi(c.FormValue("destination_id"))
	Price, _ := strconv.Atoi(c.FormValue("price"))
	Qty, _ := strconv.Atoi(c.FormValue("qty"))

	request := models.Ticket{
		TrainName:      c.FormValue("train_name"),
		TrainType:      c.FormValue("train_type"),
		StartDate:      c.FormValue("start_date"),
		StartTime:      c.FormValue("start_time"),
		ArrivalTime:    c.FormValue("arrival_time"),
		StartStationID: StartStationID,
		DestinationID:  DestinationStationID,
		Price:          Price,
		Qty:            Qty,
	}
	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Failed", Message: "Validator error"})
	}

	data, err := h.TicketRepository.CreateTicket(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: "Goblok"})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Status: "Success",
		Data:   data,
	})
}

func (h *TicketHandlers) GetTicket(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	ticket, err := h.TicketRepository.GetTicket(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Status: "Success",
		Data:   ticket,
	})

}

func (h *TicketHandlers) FilterTicket(c echo.Context) error {
	startStationIDParam := c.QueryParam("start_station_id")
	destinationStationIDParam := c.QueryParam("destination_id")

	var startStationID int
	if startStationIDParam != "" {
		var err error
		startStationID, err = strconv.Atoi(startStationIDParam)
		if err != nil {
			return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Error", Message: "Invalid start_station_id"})
		}
	}

	var destinationStationID int
	if destinationStationIDParam != "" {
		var err error
		destinationStationID, err = strconv.Atoi(destinationStationIDParam)
		if err != nil {
			return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Error", Message: "Invalid destination_Error_id"})
		}
	}

	ticket, err := h.TicketRepository.FilterTicket(startStationID, destinationStationID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Status: "Error", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Status: "Success", Data: ticket})
}
