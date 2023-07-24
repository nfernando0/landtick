package handlers

import (
	"fmt"
	dto "landtick/dto/result"
	transactiondto "landtick/dto/transaction"
	"landtick/models"
	"landtick/repositories"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
	"gopkg.in/gomail.v2"
)

var path_file = "http://localhost:5000/uploads/"

type transactionsHandlers struct {
	TransactionRepository repositories.TransactionRepository
	UserRepository        repositories.UserRepository
}

func HandlersTransactions(TransactionRepository repositories.TransactionRepository, UserRepository repositories.UserRepository) *transactionsHandlers {
	return &transactionsHandlers{
		TransactionRepository: TransactionRepository,
		UserRepository:        UserRepository,
	}
}

type dataTransaction struct {
	Transaction interface{} `json:"transaction"`
}

func (h *transactionsHandlers) CreateTransaction(c echo.Context) error {
	request := new(transactiondto.TransactionRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)
	TicketID, _ := strconv.Atoi(c.FormValue("ticket_id"))
	Qty, _ := strconv.Atoi(c.FormValue("qty"))
	Price, _ := strconv.Atoi(c.FormValue("price"))

	request.UserID = int(userId)

	request.UserID = int(userId)
	request.TicketID = TicketID
	request.Price = Price
	request.Qty = Qty

	validation := validator.New()

	validationErr := validation.Struct(request)
	if validationErr != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: validationErr.Error()})
	}

	var transactionIsMatch = false
	var transactionId int
	for !transactionIsMatch {
		transactionId = int(time.Now().Unix())
		transactionData, _ := h.TransactionRepository.GetTransaction(transactionId)
		if transactionData.ID == 0 {
			transactionIsMatch = true
		}
	}

	data := models.Transaction{
		ID:       transactionId,
		UserID:   request.UserID,
		TicketID: request.TicketID,
		Qty:      request.Qty,
		Price:    request.Price,
	}

	data, err := h.TransactionRepository.CreateTransaction(data)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	// 1. Initiate Snap client
	var s = snap.Client{}
	s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)

	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  strconv.Itoa(data.ID),
			GrossAmt: int64(data.Price),
		},
		CreditCard: &snap.CreditCardDetails{
			Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: data.User.Fullname,
			Email: data.User.Email,
		},
	}

	// 3. Execute request create Snap transaction to Midtrans Snap API
	snapResp, _ := s.CreateTransaction(req)

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Status: "Success",
		Data:   snapResp,
	})
}

func (h *transactionsHandlers) FindTransaction(c echo.Context) error {
	user, err := h.TransactionRepository.FindTransaction()

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: user})
}

func (h *transactionsHandlers) GetTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	transaction, err := h.TransactionRepository.GetTransaction(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: transaction})
}

func (h *transactionsHandlers) DeleteTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	data, err := h.TransactionRepository.DeleteTransaction(transaction, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: data})
}

func (h *transactionsHandlers) GetTransactionByUser(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := int(userLogin.(jwt.MapClaims)["id"].(float64))

	transactions, err := h.TransactionRepository.GetTransactionByUser(userId)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "success", Data: transactions})
}

func (h *transactionsHandlers) GetPayment(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	transaction, err := h.TransactionRepository.GetTransaction(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}

	// 1. Initiate Snap client
	var s = snap.Client{}
	s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)
	// Use to midtrans.Production if you want Production Environment (accept real transaction).

	// 2. Initiate Snap request param
	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  strconv.Itoa(transaction.ID),
			GrossAmt: int64(transaction.Price),
		},
		CreditCard: &snap.CreditCardDetails{
			Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: transaction.User.Fullname,
			Email: transaction.User.Email,
		},
	}

	// 3. Execute request create Snap transaction to Midtrans Snap API
	snapResp, _ := s.CreateTransaction(req)

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: snapResp})
}

// Notification

func (h *transactionsHandlers) Notification(c echo.Context) error {
	var notificationPayload map[string]interface{}

	if err := c.Bind(&notificationPayload); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: "Failed", Message: err.Error()})
	}
	transactionStatus := notificationPayload["transaction_status"].(string)
	fraudStatus := notificationPayload["fraud_status"].(string)
	orderId := notificationPayload["order_id"].(string)

	order_Id, _ := strconv.Atoi(orderId)

	transaction, _ := h.TransactionRepository.GetTransaction(order_Id)
	// user, _ := h.UserRepository.GetUser(order_Id)
	if transactionStatus == "capture" {
		if fraudStatus == "challenge" {
			h.TransactionRepository.UpdateTransaction("pending", order_Id)
		} else if fraudStatus == "accept" {

			SendMail("success", transaction)
			h.TransactionRepository.UpdateTransaction("success", order_Id)
		}
	} else if transactionStatus == "settlement" {

		SendMail("success", transaction)
		h.TransactionRepository.UpdateTransaction("success", order_Id)
	} else if transactionStatus == "deny" {
		h.TransactionRepository.UpdateTransaction("failed", order_Id)
	} else if transactionStatus == "cancel" || transactionStatus == "expire" {
		h.TransactionRepository.UpdateTransaction("failed", order_Id)
	} else if transactionStatus == "pending" {
		h.TransactionRepository.UpdateTransaction("pending", order_Id)
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "Success", Data: notificationPayload})

}

func SendMail(status string, transaction models.Transaction) {
	if status != transaction.Status && (status == "success") {

		var CONFIG_SMTP_HOST = "smtp.gmail.com"
		var CONFIG_SMTP_PORT = 587
		var CONFIG_SENDER_NAME = "LandTick <demo.landtick@gmail.com>"
		var CONFIG_AUTH_EMAIL = os.Getenv("EMAIL_SYSTEM")
		var CONFIG_AUTH_PASSWORD = os.Getenv("PASSWORD_SYSTEM")

		var ticket = strconv.Itoa(transaction.ID)
		var price = strconv.Itoa(transaction.Ticket.Price)

		mailer := gomail.NewMessage()
		mailer.SetHeader("From", CONFIG_SENDER_NAME)
		mailer.SetHeader("To", transaction.User.Email)
		mailer.SetHeader("Subject", "Transaction Status")
		mailer.SetBody("text/html", fmt.Sprintf(`<!DOCTYPE html>
    <html lang="en">
      <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        h1 {
        color: brown;
        }
      </style>
      </head>
      <body>
      <h2>Product payment :</h2>
      <ul style="list-style-type:none;">
        <li>Name : %s</li>
        <li>Total payment: Rp.%s</li>
        <li>Status : <b>%s</b></li>
      </ul>
      </body>
    </html>`, ticket, price, status))

		dialer := gomail.NewDialer(
			CONFIG_SMTP_HOST,
			CONFIG_SMTP_PORT,
			CONFIG_AUTH_EMAIL,
			CONFIG_AUTH_PASSWORD,
		)

		err := dialer.DialAndSend(mailer)
		if err != nil {
			log.Fatal(err.Error())
		}

		log.Println("Mail sent! to " + transaction.User.Email)
	}
}
