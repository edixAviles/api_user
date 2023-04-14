import router from "./src/core/api/router"

const port = process.env.PORT || 3000

router.listen(port, () => {
    console.log(`Server listening on ${port}`)
})
