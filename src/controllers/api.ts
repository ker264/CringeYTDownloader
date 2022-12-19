import { allLinkList } from "./linkList.js"

export const getListById = async (req, res) => {
    if (allLinkList[req.params["id"]]) {
        res.status(200).json(allLinkList[req.params["id"]])
    } else {
        res.status(400)
    }
}