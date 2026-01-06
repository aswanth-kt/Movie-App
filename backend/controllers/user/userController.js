

export const test = async (req, res) => {
    try {
        console.log("test")
        res.status(200);
        res.send("Haiiiii")
    } catch (error) {
        console.log(error);
    }
}