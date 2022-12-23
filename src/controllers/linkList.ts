export let allLinkList = [];

export const dlPage = async (req, res) => {
    res.render('index');    
}

export const saveList = async (req, res) => {
    let cleanShitReg = RegExp("[^\\d\\w\\s()\\[\\],.;!']", "g");

    let oneLinkList = []

    req.body.allLinks.forEach(element => {
        oneLinkList.push({
            "URL": element.URL,
            "name": element.name.replace(cleanShitReg, ' ').replace(RegExp('\\s+', 'g'), ' ').trim(),
            "status": "Ожидает"
        })
    });

    allLinkList[req.body.id] = oneLinkList;

    res.status(200).json({ status: "Ok" });
}