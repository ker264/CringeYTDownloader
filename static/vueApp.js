let app = new Vue({
    el: '#app',
    data: {
        msg: 'Список ссылок',
        loadMsg: "",
        linkList: [
            { name: "12" },
            { name: "14" },
            { name: "15" }
        ]
    },
    async mounted() {
        let id = (new URL(document.location)).searchParams.get("id")
        this.loadMsg = id
        this.linkList = await (await fetch(`/api/getListById/${id}`)).json()        
        this.msg = 'Список посылок'
    },
    methods: {

    },
})