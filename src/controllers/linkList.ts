let allLinkList = [];

export const dlPage = async (req, res) => {
    res.render('index', { linkList: allLinkList[req.query.id], msg2:"1561dsfsd" });
    console.log(allLinkList[req.query.id]);
}

export const saveList = async (req, res) => {
    let cleanShitReg = RegExp("[^\\d\\w\\s()\\[\\],.;!']", "g");
    // let URL = req.query.URL.toString();
    // let name = req.query.name.toString();
    // let playlist = req.query.playlistName;

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