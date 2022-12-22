import { getListById } from "./linkList.js"

export const downloadById = async (req, res) => {
    if (getListById([req.params["id"]])) {
        res.status(200).json(getListById([req.params["id"]]))
    } else {
        res.status(400)
    }
}