let allLinkList = [];

export const dlPage = async (req, res) => {
    res.render('index');
    console.log(allLinkList[req.query.id]);
}

export const saveList = async (req, res) => {
    let cleanShitReg = RegExp("[^\\d\\w\\s()\\[\\],.;!']", "g");

    let oneLinkList = []

    req.body.allLinks.forEach(element => {
        oneLinkList.push({
            "URL": element.URL,
            "name": element.name.replace(cleanShitReg, ' ').replace(RegExp('\\s+', 'g'), ' ').trim()
        })
    });

    allLinkList[req.body.id] = oneLinkList;

    res.status(200).json({ status: "Ok" });
}

export function getListById(id) {
    return allLinkList[id];
}

export function getWholeList() {
    return allLinkList;
}