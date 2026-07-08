const express = require("express")
const cookieParser = require("cookie-parser")



const app = express()


app.use(express.json())
app.use(cookieParser())

/**
 * - Routes required
 */
const authRouter = require("./routes/auth.routes")
const accountRouter = require("./routes/account.routes")
const transactionRoutes = require("./routes/transaction.routes")

/**
 * - Use Routes
 */

app.get("/", (req, res) => {
    res.send("Ledger Service is up and running")
})

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/accounts", accountRouter)
app.use("/api/v1/transactions", transactionRoutes)

module.exports = app